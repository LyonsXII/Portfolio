import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { StyledSettingsMenuSectionFlexbox, StyledSettingsMenuSectionRow, StyledSettingsMenuCheckbox, StyledSettingsMenuSliderWrapper, StyledSliderValue, StyledSettingsMenuSlider, StyledSettingsMenuBodyText } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";
import { SettingsContext } from "../../context/SettingsContext";

function SettingsMenuSongGuesser({ active }) {
  const { theme } = useContext(ThemeContext);
  const { volume, changeVolume } = useContext(AudioContext);
  const { autoplay, autoNextQuestion, toggleAutoplay, toggleAutoNextQuestion, autoNextQuestionDelay, adjustAutoNextQuestionDelay, skipVideo, toggleSkipVideo } = useContext(SettingsContext);

  const [autoNextQuestionDelayHover, setAutoNextQuestionDelayHover] = useState(false);

  function toggleAutoNextQuestionDelayHover() {
    setAutoNextQuestionDelayHover(prev => !prev);
  }

  useEffect(() => {
    if (skipVideo && !autoplay) {
      toggleAutoplay()
    }
  }, [skipVideo])

  return (
    <StyledSettingsMenuSectionFlexbox>
      <StyledSettingsMenuSectionRow>
        <StyledSettingsMenuBodyText>Autoplay</StyledSettingsMenuBodyText>
        <StyledSettingsMenuCheckbox theme={theme} type="checkbox" checked={autoplay} onChange={toggleAutoplay}/>
      </StyledSettingsMenuSectionRow>

      <StyledSettingsMenuSectionRow>
        <StyledSettingsMenuBodyText>Auto Next Question</StyledSettingsMenuBodyText>
        <StyledSettingsMenuCheckbox theme={theme} type="checkbox" checked={autoNextQuestion} onChange={toggleAutoNextQuestion}/>
      </StyledSettingsMenuSectionRow>

      <StyledSettingsMenuSectionRow $width="40%">
        <StyledSettingsMenuBodyText>Auto Next Question Delay</StyledSettingsMenuBodyText>
        <StyledSettingsMenuSliderWrapper>
          <StyledSliderValue theme={theme} $visible={autoNextQuestionDelayHover}>{autoNextQuestionDelay}s</StyledSliderValue>
          <StyledSettingsMenuSlider theme={theme} type="range" min="2" max="10" value={autoNextQuestionDelay} id="Auto Next Question Delay Slider" onChange={adjustAutoNextQuestionDelay} onMouseEnter={toggleAutoNextQuestionDelayHover} onMouseLeave={toggleAutoNextQuestionDelayHover}/>
        </StyledSettingsMenuSliderWrapper>
      </StyledSettingsMenuSectionRow>

      <StyledSettingsMenuSectionRow>
        <StyledSettingsMenuBodyText>Skip Video</StyledSettingsMenuBodyText>
        <StyledSettingsMenuCheckbox theme={theme} type="checkbox" checked={skipVideo} onChange={toggleSkipVideo}/>
      </StyledSettingsMenuSectionRow>
    </StyledSettingsMenuSectionFlexbox>
  )
}

export default SettingsMenuSongGuesser