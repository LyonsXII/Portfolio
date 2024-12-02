import React, { useContext, useEffect } from "react";
import styled from 'styled-components';

import { StyledButton } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

function SongGuesserButton({ name, section, columns, rows, start, end, onClick }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  function buttonClick() {
    onClick(name);
    clickSound();
  } 

  return (
    <StyledButton theme={theme} $columns={columns} $rows={rows} $start={start} $end={end} onClick={buttonClick} $name={name} $section={section}>
      <h3>{name}</h3>
    </StyledButton>
  )
}

export default SongGuesserButton