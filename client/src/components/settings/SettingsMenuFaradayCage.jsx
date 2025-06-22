import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { StyledSettingsMenuSectionFlexbox, StyledSettingsMenuSectionRow, StyledSettingsMenuCheckbox, StyledSettingsMenuSliderWrapper, StyledSliderValue, StyledSettingsMenuSlider, StyledSettingsMenuButton, StyledSettingsMenuBodyText } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";
import { SettingsContext } from "../../context/SettingsContext";

function SettingsMenuFaradayCage() {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);
  const { plotColour, cyclePlotColour } = useContext(SettingsContext);

  function onClickHandler() {
    clickSound();
    cyclePlotColour();
  }

  return (
    <StyledSettingsMenuSectionFlexbox>
      <StyledSettingsMenuSectionRow>
        <StyledSettingsMenuBodyText>Plot Colours</StyledSettingsMenuBodyText>
        <StyledSettingsMenuButton theme={theme} onClick={onClickHandler}>
          <StyledSettingsMenuBodyText $align="center">
            {plotColour}
          </StyledSettingsMenuBodyText>
        </StyledSettingsMenuButton>
      </StyledSettingsMenuSectionRow>
    </StyledSettingsMenuSectionFlexbox>
  )
}

export default SettingsMenuFaradayCage