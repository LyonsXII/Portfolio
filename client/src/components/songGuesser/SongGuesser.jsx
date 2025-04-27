import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import SongGuesserIntro from "./SongGuesserIntro";
import SongGuesserGame from "./SongGuesserGame";
import GameOver from "./GameOver";

import { StyledSongGuesserContainer } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";

function SongGuesser({ transition, setTransition }) {
  const { theme } = useContext(ThemeContext);

  const [intro, setIntro] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverExit, setGameOverExit] = useState(false);

  const [category, setCategory] = useState("Anime");
  const [difficulty, setDifficulty] = useState("Easy");
  const [mode, setMode] = useState("Regular");

  const [lose, setLose] = useState(false);
  const [score, setScore] = useState(0);

  function startGame() {
    setIntro(false);
  }

  function endGame() {
    setTransition(true);
    setTimeout(() => {
      setIntro(true);
      setTransition(false);
    }, 500)
  }

  function handleGameOver() {
    setGameOverExit(true);
    setIntro(true);
    setTimeout(() => {
      setGameOver(false);
      setGameOverExit(false);
    }, 3000)
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

  return (
    <StyledSongGuesserContainer $transition={transition}>
      {gameOver && <GameOver gameOverExit={gameOverExit} handleGameOver={handleGameOver} lose={lose} score={score}/>}
      {intro ? 
        <SongGuesserIntro startGame={startGame} updateCategory={updateCategory} updateDifficulty={updateDifficulty} updateMode={updateMode} category={category} difficulty={difficulty} mode={mode}/> : 
        <SongGuesserGame category={category} difficulty={difficulty} mode={mode} score={score} setScore={setScore} lose={lose} setLose={setLose} endGame={endGame} gameOver={gameOver} setGameOver={setGameOver} gameOverExit={gameOverExit} handleGameOver={handleGameOver} transition={transition} setTransition={setTransition}/>
      }
    </StyledSongGuesserContainer>
  )
}

export default SongGuesser