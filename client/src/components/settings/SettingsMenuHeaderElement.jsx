import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledSettingsMenuHeadingText } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const StyledElement = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;
  white-space: nowrap;
  padding: 0px 20px 0px 20px;
  border-radius: ${({ $position }) => $position === "First" ? "16px 0px 0px 0px" :
    $position === "Last" ? "0px 16px 0px 0px" : "0px"};
  border-right: ${({ $position }) => $position === "Last" ? "none" : "4px solid black"};
  box-sizing: border-box;
  background-color: ${({ $value, $active, theme }) => $value === $active ? theme.secondaryColor : theme.primaryColor};
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
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
      <StyledSettingsMenuHeadingText>{value}</StyledSettingsMenuHeadingText>
    </StyledElement>
  )
}

export default SettingsMenuHeaderElement