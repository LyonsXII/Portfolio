import React, { useState, useContext } from "react";
import styled from 'styled-components';

import SongGuesserIntro from "./SongGuesserIntro";
import SongGuesserGame from "./SongGuesserGame";

import { ThemeContext } from "../../context/ThemeContext";
import GameOver from "./GameOver";

const StyledFlexboxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SongGuesser(props) {
  const { theme } = useContext(ThemeContext);

  const [intro, setIntro] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverExit, setGameOverExit] = useState(false);

  const [category, setCategory] = useState("Anime");
  const [difficulty, setDifficulty] = useState("Easy");
  const [mode, setMode] = useState("Regular");

  function startGame() {
    setIntro(false);
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

  function handleGameOver() {
    setGameOverExit(true);
    setIntro(true);
    setTimeout(() => {
      setGameOver(false);
      setGameOverExit(false);
    }, 1200)
  }

  return (
    <StyledFlexboxContainer>
      {gameOver && <GameOver gameOverExit={gameOverExit} handleGameOver={handleGameOver}/>}
      {intro === true ? 
        <SongGuesserIntro startGame={startGame} updateCategory={updateCategory} updateDifficulty={updateDifficulty} updateMode={updateMode} category={category} difficulty={difficulty} mode={mode}/> : 
        <SongGuesserGame category={category} difficulty={difficulty} mode={mode} gameOver={gameOver} setGameOver={setGameOver} gameOverExit={gameOverExit} handleGameOver={handleGameOver}/>
      }
    </StyledFlexboxContainer>
  )
}

export default SongGuesser