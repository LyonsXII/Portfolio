import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledChoiceButton } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

function SongGuesserChoice({ name, correct, showAnswer, onClick }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  function handleOnClick() {
    onClick(correct);
    clickSound();
  }

  return (
    <StyledChoiceButton theme={theme} $correct={correct} $showAnswer={showAnswer} onClick={() => {handleOnClick()}}>
      <h3>{name}</h3>
    </StyledChoiceButton>
  )
}

export default SongGuesserChoice