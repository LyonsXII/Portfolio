import React, { useState, useContext } from "react";
import styled from 'styled-components';

import SongGuesserIntro from "./SongGuesserIntro";
import SongGuesserGame from "./SongGuesserGame";

import { ThemeContext } from "../../../context/ThemeContext";

function SongGuesser(props) {
  const { theme } = useContext(ThemeContext);

  const [intro, setIntro] = useState(true);

  const [category, setCategory] = useState("Anime");
  const [difficulty, setDifficulty] = useState("Easy");
  const [mode, setMode] = useState("Regular");

  function startGame() {
    setIntro(false);
  }

  return (
    intro === true ? <SongGuesserIntro startGame={startGame}/> : <SongGuesserGame category={category} difficulty={difficulty} mode={mode}/>
  )
}

export default SongGuesser