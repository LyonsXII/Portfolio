import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledEndGameButton, StyledEndGameIcon } from "./General.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

function ReturnButton({ left, returnFunction }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  function handleClick() {
    clickSound();
    returnFunction();
  }

  return (
    <StyledEndGameButton theme={theme} $left={left} onClick={handleClick}>
      <StyledEndGameIcon src="./icons/return.svg"/>
    </StyledEndGameButton>
  )
}

export default ReturnButton