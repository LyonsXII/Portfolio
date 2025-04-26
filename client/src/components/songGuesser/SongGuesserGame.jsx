import React, { useState, useEffect, useContext, useRef } from "react";
import styled from 'styled-components';
import axios from "axios";

import SongGuesserEndGameButton from "./SongGuesserEndGameButton";
import SongGuesserScore from "./SongGuesserScore";
import SongGuesserChoice from "./SongGuesserChoice";
import SongGuesserVideo from "./SongGuesserVideo";

import { StyledGameFlexboxContainer, StyledGameContainer, StyledMainTitle, StyledHeaderTitle, StyledChoiceGrid, StyledTextContainer, StyledIcon, StyledReplayShadowIcon } from "./SongGuesser.styles";

import { AudioContext } from "../../context/AudioContext";
import { SettingsContext } from "../../context/SettingsContext";
import { ThemeContext } from "../../context/ThemeContext";

function SongGuesserGame({ category, difficulty, mode, endGame, gameOver, setGameOver, handleGameOver }) {
  const { theme } = useContext(ThemeContext);

  const { volume, clickSound, victorySound, defeatSound } = useContext(AudioContext);
  const { autoplay, autoNextQuestion, autoNextQuestionDelay } = useContext(SettingsContext);

  const [roundData, setRoundData] = useState({
    numQuestions: 0,
    choices: [{}],
    songInfo: {},
    excluded: [],
    score: 0
  });

  const [showAnswer, setShowAnswer] = useState(false);
  const nextQuestionTimeoutRef = useRef(null);

  const [songFilePath, setSongFilePath] = useState("");
  const [song, setSong] = useState(null);
  const audioRef = useRef(null);
  const [videoURL, setVideoURL] = useState("");

  // Fetch number of possible questions for category from database
  async function getNumQuestions() {
    try {
      const postData = {"category": category, "difficulty": difficulty};
      const response = await axios.post('http://localhost:5000/numQuestions', postData);
      setRoundData((prev) => ({
        ...prev,
        numQuestions: response.data[0]["count"]
      })
      );
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  }

  // Fetch choices from database
  async function fetchData() {
    function shuffle(array) {
      // Fisher-Yates shuffle algorithm
      let m = array.length, t, i;

      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    }

    try {
      // Post request to backend
      const choicesPostData = {
        "category": category, 
        "difficulty": difficulty, 
        "excluded": roundData.excluded.length === 0 ? [] : roundData.excluded
      };
      const response = await axios.post('http://localhost:5000/choices', choicesPostData);

      // Setting retrieved data
      const data = response.data[0];
      const shuffledChoices = shuffle(response.data);
      if (songFilePath !== data.location) {
        setVideoURL(data.video_link);
        setSongFilePath(data.location);
        setRoundData((prev) => ({
          ...prev,
          choices: shuffledChoices,
          songInfo: {id: data.id, property: data.property, song_name: data.song_name, difficulty: data.difficulty},
          excluded: !prev.excluded.includes(data.id) ? [...prev.excluded, data.id] : prev.excluded
        }))
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch mp3 file from backend
  async function getAudio() {
    const songPostData = {"location": songFilePath};
    const songData = await axios.post('http://localhost:5000/mp3', songPostData, {responseType: "blob"});
    return songData.data
  }

  // Set current song to correct choice
  async function updateSong() {
    if (songFilePath) {
      try{
        const audio = await getAudio();
        const url = URL.createObjectURL(audio);
        setSong(url);
      } catch(error) {
        console.error('Error fetching the audio file:', error);
      }
    }
  }

  function playSong() {
    if (audioRef.current.paused) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

  }

  // Game functionality
  function startGame() {
    setRoundData((prev) => ({
      ...prev,
      excluded: []
    }));
    nextQuestion();
  }

  function nextQuestion() {
    clickSound();
    fetchData();
    setShowAnswer(false);
  }

  function nextQuestionButton() {
    clearTimeout(nextQuestionTimeoutRef.current);
    nextQuestion();
  }

  function handleAnswer(correct) {
    clickSound();
    if (!showAnswer) {
      if (correct) {
        victorySound();
        setRoundData((prev) => ({
          ...prev,
          score: prev.score + 1
        }));
      } else {
        defeatSound();
        if (mode === "Sudden Death") {setGameOver(true)}
      }
      setShowAnswer(true);
      audioRef.current.pause();
    }
  }

  // Fetch first set of questions on component load
  useEffect(() => {fetchData()}, []);
  // Set current song whenever a new set of choices is fetched
  useEffect(() => {updateSong()}, [songFilePath]);
  // Automatically play next song if autoplay toggled on in settings
  useEffect(() => {
    if (autoplay) {setTimeout(() => {playSong()}, 500)}
  }, [song]);
  // Automaticlly move onto next question after a short delay if auto next question toggled on in settings
  useEffect(() => {
    if (showAnswer && autoNextQuestion && !gameOver) {
      nextQuestionTimeoutRef.current = setTimeout(() => {
        nextQuestion()
      }, autoNextQuestionDelay * 1000);

      return () => clearTimeout(nextQuestionTimeoutRef.current);
    }
  }, [showAnswer]);
  // Update volume of audio playback when volume updated
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  return (
  <StyledGameFlexboxContainer>
    <audio ref={audioRef} src={song} />

    {mode === "Regular" && <SongGuesserScore score={roundData.score} />}
    <SongGuesserEndGameButton endGame={endGame} mode={mode} />

    <StyledGameContainer>
      {showAnswer === false || !videoURL ? (
        <StyledTextContainer>
          <StyledHeaderTitle theme={theme}>Guess the song...</StyledHeaderTitle>
          <StyledReplayShadowIcon onClick={() => playSong()} />
        </StyledTextContainer>
      ) : (
        <SongGuesserVideo
          url={videoURL}
          nextQuestionButton={nextQuestionButton}
          playSong={playSong}
          name={roundData.songInfo.song_name}
          property={roundData.songInfo.property}
        />
      )}

      <StyledChoiceGrid>
        {roundData.choices && roundData.choices.map((choice, index) => (
          <SongGuesserChoice
            key={index}
            index={index}
            id={choice.id}
            name={choice.property}
            correct={choice.correct}
            showAnswer={showAnswer}
            onClick={handleAnswer}
          />
        ))}
      </StyledChoiceGrid>
    </StyledGameContainer>
  </StyledGameFlexboxContainer>
);

}

export default SongGuesserGame