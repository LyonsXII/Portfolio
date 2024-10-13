import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const StyledElement = styled.div`
  height: 100%;
  width: 100%;
  white-space: nowrap;
  padding: 0px 2vw 0px 2vw;
  border-radius: ${({ $position }) => $position === "First" ? "20px 0px 0px 0px" :
    $position === "Last" ? "0px 20px 0px 0px" : "0px"};
  border-right: ${({ $position }) => $position === "Last" ? "none" : "4px solid black"};
  background-color: ${({ $value, $active, theme }) => $value === $active ? theme.secondaryColor : theme.primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function SettingsMenuHeaderElement({ value, position, active, updateActive }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  function handleUpdateActive() {
    clickSound();
    updateActive(value);
  }

  return (
    <StyledElement theme={theme} $value={value} $position={position} $active={active} onClick={handleUpdateActive}>
      <h3>{value}</h3>
    </StyledElement>
  )
}

export default SettingsMenuHeaderElement