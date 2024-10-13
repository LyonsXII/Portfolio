import React, { useContext, useEffect } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const StyledButton = styled.button`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 10px;
  border: 4px solid black;
  grid-column-start: ${({ $start }) => $start ? $start : "auto"};
  grid-column-end: ${({ $end }) => $end ? $end : "auto"};
  grid-column: ${({ $columns }) => $columns};
  grid-row: ${({ $rows }) => $rows};
  color: ${({ theme }) => theme.textColor};
  box-shadow: ${({ $name, $section }) => $name === $section ? "0px 0px 8px antiquewhite" : "0px 0px 10px black"};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
  }
`;

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