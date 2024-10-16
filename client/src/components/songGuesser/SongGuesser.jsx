import React, { useState, useContext } from "react";
import styled from 'styled-components';

import SongGuesserIntro from "./SongGuesserIntro";
import SongGuesserGame from "./SongGuesserGame";

import { ThemeContext } from "../../context/ThemeContext";

function SongGuesser(props) {
  const { theme } = useContext(ThemeContext);

  const [intro, setIntro] = useState(true);

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
    setIntro(true);
    setGameOver(false);
  }

  return (
    intro === true ? 
      <SongGuesserIntro startGame={startGame} updateCategory={updateCategory} updateDifficulty={updateDifficulty} updateMode={updateMode} handleGameOver={handleGameOver} category={category} difficulty={difficulty} mode={mode}/> : 
      <SongGuesserGame category={category} difficulty={difficulty} mode={mode}/>
  )
}

export default SongGuesser