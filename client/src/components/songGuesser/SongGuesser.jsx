import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import axios from "axios";

import SongGuesserIntro from "./SongGuesserIntro";
import SongGuesserGame from "./SongGuesserGame";
import GameOver from "./GameOver";

import { StyledSongGuesserContainer } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";

function SongGuesser({ transition, setTransition }) {
  const { theme } = useContext(ThemeContext);

  const [intro, setIntro] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverAnimation, setGameOverAnimation] = useState("Enter");

  const [category, setCategory] = useState("Anime");
  const [difficulty, setDifficulty] = useState("Easy");
  const [mode, setMode] = useState("Regular");

  const [firstRound, setFirstRound] = useState({
    currentQuestion: 1,
    choices: [{}],
    songInfo: {},
    excluded: [],
    songFilePath: "",
    videoURL: ""
  });

  const [lose, setLose] = useState(false);
  const [score, setScore] = useState(0);

  function startGame() {
    setScore(0);
    setTransition(true);
    setTimeout(() => {
      setIntro(false);
      setTransition(false);
    }, 500)
  }

  function endGame() {
    setTransition(true);
    setTimeout(() => {
      setIntro(true);
      setTransition(false);
    }, 500)
  }

  function handleGameOver() {
    setGameOverAnimation("Exit");
    setIntro(true);
    setTimeout(() => {
      setGameOver(false);
      setGameOverAnimation("Enter");
    }, 1200)
  }

  function updateCategory(category) {
    setCategory(category);
  }

  function updateDifficulty(difficulty) {
    setDifficulty(difficulty);
  }

  function updateMode(mode) {
    setMode(mode);
  }

  async function fetchFirstRound() {
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
        "excluded": []
      };
      const response = await axios.post('http://localhost:5000/choices', choicesPostData);

      // Setting retrieved data
      const data = response.data[0];
      const shuffledChoices = shuffle(response.data);
      setFirstRound({
        currentQuestion: 1,
        choices: response.data,
        songInfo: {id: data.id, property: data.property, song_name: data.song_name, difficulty: data.difficulty},
        excluded: [data.id],
        songFilePath: data.location,
        videoURL: data.video_link
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch new first round whenever return to intro or user chooses new option
  // Pre-fetching round to prevent temporarily empty options on game load
  useEffect(() => {
    if (intro) {
      fetchFirstRound();
    }
  }, [category, difficulty, intro]);

  return (
    <StyledSongGuesserContainer $transition={transition}>
      {gameOver && <GameOver gameOverAnimation={gameOverAnimation} handleGameOver={handleGameOver} lose={lose} score={score}/>}
      {intro ? 
        <SongGuesserIntro startGame={startGame} updateCategory={updateCategory} updateDifficulty={updateDifficulty} updateMode={updateMode} category={category} difficulty={difficulty} mode={mode}/> : 
        <SongGuesserGame category={category} difficulty={difficulty} mode={mode} firstRound={firstRound} score={score} setScore={setScore} lose={lose} setLose={setLose} endGame={endGame} gameOver={gameOver} setGameOver={setGameOver} gameOverAnimation={gameOverAnimation} handleGameOver={handleGameOver} transition={transition} setTransition={setTransition}/>
      }
    </StyledSongGuesserContainer>
  )
}

export default SongGuesser