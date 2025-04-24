import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledSettingsMenuSectionFlexbox, StyledSettingsMenuSectionRow, SettingsMenuCheckbox, StyledSettingsMenuBodyText } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";
import { SettingsContext } from "../../context/SettingsContext";

function SettingsMenuSongGuesser({ active }) {
  const { theme } = useContext(ThemeContext);
  const { volume, changeVolume } = useContext(AudioContext);
  const { autoplay, autoNextQuestion, toggleAutoplay, toggleAutoNextQuestion } = useContext(SettingsContext);

  return (
    <StyledSettingsMenuSectionFlexbox>
      <StyledSettingsMenuSectionRow>
        <StyledSettingsMenuBodyText>Autoplay</StyledSettingsMenuBodyText>
        <SettingsMenuCheckbox theme={theme} type="checkbox" checked={autoplay} onChange={toggleAutoplay}/>
      </StyledSettingsMenuSectionRow>
      <StyledSettingsMenuSectionRow>
        <StyledSettingsMenuBodyText>Auto Next Question</StyledSettingsMenuBodyText>
        <SettingsMenuCheckbox theme={theme} type="checkbox" checked={autoNextQuestion} onChange={toggleAutoNextQuestion}/>
      </StyledSettingsMenuSectionRow>
    </StyledSettingsMenuSectionFlexbox>
  )
}

export default SettingsMenuSongGuesser