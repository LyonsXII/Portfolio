import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledEndGameButton, StyledEndGameIcon } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

function SongGuesserEndGameButton({ mode, endGame }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  return (
    <StyledEndGameButton theme={theme} $mode={mode} onClick={endGame}>
      <StyledEndGameIcon src="./icons/return.svg"/>
    </StyledEndGameButton>
  )
}

export default SongGuesserEndGameButton