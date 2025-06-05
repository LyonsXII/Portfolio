import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledSettingsMenuHeaderElement, StyledSettingsMenuHeadingText } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

function SettingsMenuHeaderElement({ value, position, active, updateActive }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  function handleUpdateActive() {
    clickSound();
    updateActive(value);
  }

  return (
    <StyledSettingsMenuHeaderElement theme={theme} $value={value} $position={position} $active={active} onClick={handleUpdateActive}>
      <StyledSettingsMenuHeadingText>{value}</StyledSettingsMenuHeadingText>
    </StyledSettingsMenuHeaderElement>
  )
}

export default SettingsMenuHeaderElement