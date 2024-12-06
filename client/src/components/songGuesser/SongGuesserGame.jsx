import React, { useState, useEffect, useContext, useRef } from "react";
import styled from 'styled-components';
import axios from "axios";

import SongGuesserScore from "./SongGuesserScore";
import SongGuesserChoice from "./SongGuesserChoice";
import SongGuesserVideo from "./SongGuesserVideo";

import { StyledGameFlexboxContainer, StyledGameContainer, StyledMainTitle, StyledChoiceGrid, StyledTextBox } from "./SongGuesser.styles";

import { AudioContext } from "../../context/AudioContext";
import { SettingsContext } from "../../context/SettingsContext";

function SongGuesserGame({ category, difficulty, mode, setGameOver, handleGameOver }) {
  const { volume, clickSound, victorySound, defeatSound } = useContext(AudioContext);
  const { autoplay, autoNextQuestion } = useContext(SettingsContext);

  const [choices, setChoices] = useState([{}]);
  const [numQuestions, setNumQuestions] = useState(0);
  const [songInfo, setSongInfo] = useState([{}]);
  const [excluded, setExcluded] = useState([]); 
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [songFilePath, setSongFilePath] = useState("");
  const [song, setSong] = useState(null);
  const audioRef = useRef(null);
  const [videoURL, setVideoURL] = useState("");

  const [userClickedNext, setUserClickedNext] = useState(false);
  const nextQuestionTimeoutRef = useRef(null);

  // Fetch number of possible questions for category from database
  async function getNumQuestions() {
    try {
      const postData = {"category": category, "difficulty": difficulty};
      const response = await axios.post('http://localhost:5000/numQuestions', postData);
      setNumQuestions(response.data[0]["count"]);
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  }

  // Fetch choices from database
  async function fetchData() {
    function shuffle(array) {
      // Fisher-Yates shuffle algorithm
      var m = array.length, t, i;

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
      if (excluded.length === 0) {
        const choicesPostData = {"category": category, "difficulty": difficulty, "excluded": []};
      }
      const choicesPostData = {"category": category, "difficulty": difficulty, "excluded": excluded};
      const response = await axios.post('http://localhost:5000/choices', choicesPostData);

      // Setting retrieved data
      const data = response.data[0];
      if (songFilePath !== data.location) {
        setVideoURL(data.video_link);
        setSongFilePath(data.location);
        setExcluded((prev) => {
          if (!prev.includes(data.id)) {
            return [...prev, data.id]
          }
          return prev
        });
        setSongInfo({id: data.id, property: data.property, song_name: data.song_name, difficulty: data.difficulty});
        const shuffledChoices = shuffle(response.data);
        setChoices(shuffledChoices);
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
    setExcluded([]);
    nextQuestion();
  }

  function nextQuestion() {
    // Clear any existing autoNextQuestion timeout before automatically moving to the next question
    if (nextQuestionTimeoutRef.current) {
      clearTimeout(nextQuestionTimeoutRef.current);
      nextQuestionTimeoutRef.current = null;
    }
    clickSound();
    fetchData();
    setShowAnswer(false);
    setUserClickedNext(false);
  }

  function nextQuestionButton() {
    // Clear autoNextQuestion timeout if user clicked next button themselves
    if (nextQuestionTimeoutRef.current) {
      clearTimeout(nextQuestionTimeoutRef.current);
      nextQuestionTimeoutRef.current = null;
    }
    setUserClickedNext(true);
    nextQuestion();
  }

  function handleAnswer(correct) {
    clickSound();
    if (correct) {
      victorySound();
      setScore(prevScore => prevScore + 1);
    } else {
      defeatSound();
      if (mode === "Sudden Death") {setGameOver(true)}
    }
    setShowAnswer(true);
    audioRef.current.pause();

    if (correct && autoNextQuestion || mode != "Sudden Death") {
      if (!userClickedNext) {
        nextQuestionTimeoutRef.current = setTimeout(() => {
          nextQuestion();
          setUserClickedNext(false);
        }, 3000);
      }
    }
  }

  // Fetch first set of questions on component load
  useEffect(() => {fetchData()}, []);
  // Set current song whenever new set of choices is fetched
  useEffect(() => {updateSong()}, [songFilePath]);
  // Automatically play next song if autoplay toggled on in settings
  useEffect(() => {
    if (autoplay) {setTimeout(() => {playSong()}, 500)}
  }, [song]);
  // Update volume of audio playback when volume updated
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  return (
    <StyledGameFlexboxContainer>
      <audio ref={audioRef} src={song}/>
      {mode === "Regular" && <SongGuesserScore score={score}/>}
      <StyledGameContainer>
        {showAnswer === false ? 
          <StyledTextBox>
            <StyledMainTitle onClick={() => playSong()}>Guess the song...</StyledMainTitle>
          </StyledTextBox> 
          : <SongGuesserVideo url={videoURL} nextQuestionButton={nextQuestionButton} playSong={playSong} name={songInfo.song_name} property={songInfo.property}/>
        }

        <StyledChoiceGrid>
          {choices.map((choice, index) => {
            return <SongGuesserChoice key={index} index={index} id={choice.id} name={choice.property} correct={choice.correct} showAnswer={showAnswer} onClick={handleAnswer}/>
          })}
        </StyledChoiceGrid>
      </StyledGameContainer>
    </StyledGameFlexboxContainer>
  )
}

export default SongGuesserGame