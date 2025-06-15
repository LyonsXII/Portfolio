import React, { useState, useEffect, useContext, useRef } from "react";
import styled from 'styled-components';
import axios from "axios";

import ReturnButton from "..//general/ReturnButton";
import SongGuesserScore from "./SongGuesserScore";
import SongGuesserChoice from "./SongGuesserChoice";
import SongGuesserVideo from "./SongGuesserVideo";

import { StyledGameFlexboxContainer, StyledGameContainer, StyledMainTitle, StyledHeaderTitle, StyledChoiceGrid, StyledTextContainer, StyledIcon, StyledIconContainer, StyledReplayShadowIcon } from "./SongGuesser.styles";

import { AudioContext } from "../../context/AudioContext";
import { SettingsContext } from "../../context/SettingsContext";
import { ThemeContext } from "../../context/ThemeContext";

function SongGuesserGame({ category, difficulty, mode, firstRound, score, setScore, lose, setLose, endGame, gameOver, setGameOver, handleGameOver }) {
  const { theme } = useContext(ThemeContext);

  const { volume, clickSound, victorySound, defeatSound } = useContext(AudioContext);
  const { autoplay, autoNextQuestion, autoNextQuestionDelay, skipVideo } = useContext(SettingsContext);

  const [roundData, setRoundData] = useState({
    currentQuestion: 1,
    choices: [{}],
    songInfo: {},
    excluded: [],
    songFilePath: "",
    videoURL: ""
  });
  const [nextRoundData, setNextRoundData] = useState({
    currentQuestion: 1,
    choices: [{}],
    songInfo: {},
    excluded: [],
    songFilePath: "",
    videoURL: ""
  });

  const [scoreTransition, setScoreTransition] = useState(false);
  const [showAnswerExit, setShowAnswerExit] = useState(false);

  const [showAnswer, setShowAnswer] = useState(false);
  const [skipVideoText, setSkipVideoText] = useState(false);
  const nextQuestionTimeoutRef = useRef(null);

  const [numQuestions, setNumQuestions] = useState(Infinity);
  const [song, setSong] = useState(null);
  const audioRef = useRef(null);

  // Fetch number of possible questions for category from database
  async function getNumQuestions() {
    try {
      const postData = {"category": category, "difficulty": difficulty};
      const response = await axios.post('http://localhost:5000/numQuestions', postData);
      setNumQuestions(response.data);
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
        "excluded": nextRoundData.currentQuestion === 1 
          ? firstRound.excluded 
          : nextRoundData.excluded
      };
      const response = await axios.post('http://localhost:5000/choices', choicesPostData);

      // Setting retrieved data
      const data = response.data[0];
      const shuffledChoices = shuffle(response.data);
      if (nextRoundData.songFilePath !== data.location) {
        setNextRoundData((prev) => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          choices: response.data,
          songInfo: {id: data.id, property: data.property, song_name: data.song_name, difficulty: data.difficulty},
          excluded: nextRoundData.currentQuestion === 1 ? [...firstRound.excluded, data.id] : [...prev.excluded, data.id],
          songFilePath: data.location,
          videoURL: data.video_link
        }))
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch mp3 file from backend
async function getAudio() {
  const encodedPath = encodeURIComponent(roundData.songFilePath);
  console.time('fetch');
  const response = await fetch(`http://localhost:5000/mp3?location=${encodedPath}`);
  console.timeLog('fetch', 'after fetch');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = await response.blob();
  console.timeEnd('fetch');
  return blob;
}



  // Set current song to correct choice
  async function updateSong() {
    if (roundData.songFilePath) {
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
    setRoundData(firstRound);
    setScore(0);
    getNumQuestions();
    fetchData();
  }

  function nextQuestion() {
    clickSound();
    if (roundData.currentQuestion >= numQuestions - 4) {
      setGameOver(true);
    } else {
      setRoundData((prev) => ({
        ...prev,
        ...nextRoundData
      }));
      fetchData();
      setShowAnswer(false);
    }
  }

  function nextQuestionButton() {
    clearTimeout(nextQuestionTimeoutRef.current);
    setShowAnswerExit(true);
    setTimeout(() => {
      nextQuestion();
      setShowAnswerExit(false);
    }, 500);
  }

  function handleAnswer(correct) {
    clickSound();

    if (showAnswer) return;

    const correctMessages = ["Good job!", "Nice!", "Exactly right!", "Nice work!", "Bullseye!", "Nailed it!", "Sharp thinking!", "Spectacular!", "Boom! Correct!", "Tremendous effort!"];
    const incorrectMessages = ["Close!", "Not quite...", "Bzzzzztt!", "Almost!", "Worth a try!", "Oops!", "Swing and a miss...", "Almost not wrong!"];
    
    function getRandomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    if (correct) {
      victorySound();
      const message = getRandomItem(correctMessages);
      setSkipVideoText(message);
      setScoreTransition(true);
    } else {
      defeatSound();
      const message = getRandomItem(incorrectMessages);
      setSkipVideoText(message);
      if (mode === "Sudden Death") {
        setGameOver(true);
        setLose(true);
      }
    }

    // Play exit animation then show the answer
    setShowAnswerExit(true);
    setTimeout(() => {
      setShowAnswer(true);
      setShowAnswerExit(false);
    }, 500);
    audioRef.current.pause();
  }

  // Set initial config on game load
  useEffect(() => {
    startGame();
  }, []);
  // Set current song whenever a new set of choices is displayed
  useEffect(() => {
    if (roundData.songFilePath) {
      console.log(roundData.songFilePath);
      updateSong();
    }
  }, [roundData.songFilePath]);
  // Automatically play next song if autoplay toggled on in settings
  useEffect(() => {
    if (autoplay && song) {setTimeout(() => {playSong()}, 500)}
  }, [song]);
  // Automatically move onto next question after a short delay if auto next question toggled on in settings
  useEffect(() => {
    if (showAnswer && autoNextQuestion && !gameOver) {
      // Trigger showAnswer exit animation
      setTimeout(() => {
        setShowAnswerExit(true);
      }, (autoNextQuestionDelay * 1000) - 500); // 0.5 seconds

      setTimeout(() => {
        setShowAnswerExit(false);
      }, autoNextQuestionDelay * 1000); // 0.5 seconds

      // Move onto next question
      nextQuestionTimeoutRef.current = setTimeout(() => {
        nextQuestion()
      }, autoNextQuestionDelay * 1000);

      return () => clearTimeout(nextQuestionTimeoutRef.current);
    }
  }, [showAnswer]);
  // Update score after transition completed
  useEffect(() => {
    if (scoreTransition) {
      setTimeout(() => {
        setScore(prev => prev + 1);
        setScoreTransition(false);
      }, 1000)
      }
  }, [scoreTransition]);
  // Update volume of audio playback when volume updated
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  return (
  <StyledGameFlexboxContainer>
    <audio ref={audioRef} src={song} />

    {mode === "Regular" && <SongGuesserScore score={score} transition={scoreTransition} numQuestions={numQuestions}/>}
    <ReturnButton returnFunction={endGame} left={mode === "Regular" ? "max(calc(3vw + 44px), 90px)" : "40px"} />

    <StyledGameContainer>
      {showAnswer === false || !roundData.videoURL ? (
        <StyledTextContainer key="Guess" $showAnswerExit={showAnswerExit}>
          <StyledHeaderTitle theme={theme}>
            Guess the song...
            <StyledReplayShadowIcon $heightDesktop="8rem" $heightMobile="4.5rem" $marginLeftDesktop="20px" onClick={() => playSong()}/>
          </StyledHeaderTitle>
        </StyledTextContainer>
      ) : skipVideo ? (
        <StyledTextContainer key="Skip" $showAnswerExit={showAnswerExit}>
          <StyledHeaderTitle theme={theme}>{skipVideoText}</StyledHeaderTitle>
        </StyledTextContainer>
      ) : (        
      <SongGuesserVideo
        url={roundData.videoURL}
        nextQuestionButton={nextQuestionButton}
        playSong={playSong}
        name={roundData.songInfo.song_name}
        property={roundData.songInfo.property}
        showAnswerExit={showAnswerExit}
      />
      )}

      <StyledChoiceGrid $showAnswer={showAnswer}>
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