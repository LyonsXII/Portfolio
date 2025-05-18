import React, { useContext, useEffect } from "react";
import styled from 'styled-components';

import { StyledButton, StyledLargeText } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

function SongGuesserButton({ name, section, columnsDesktop, rowsDesktop, columnsMobile, rowsMobile, start, end, onClick }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  function buttonClick() {
    onClick(name);
    clickSound();
  } 

  return (
    <StyledButton theme={theme} $columnsDesktop={columnsDesktop} $rowsDesktop={rowsDesktop} $columnsMobile={columnsMobile} $rowsMobile={rowsMobile} $start={start} $end={end} onClick={buttonClick} $name={name} $section={section}>
      <StyledLargeText>{name}</StyledLargeText>
    </StyledButton>
  )
}

export default SongGuesserButton