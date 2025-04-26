import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledSettingsMenuSectionFlexbox, StyledSettingsMenuSectionRow, StyledSettingsMenuSlider, StyledSettingsMenuBodyText } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

function SettingsMenuGeneral({ active }) {
  const { theme } = useContext(ThemeContext);
  const { volume, changeVolume } = useContext(AudioContext);

  return (
      <StyledSettingsMenuSectionFlexbox>
        <StyledSettingsMenuSectionRow  $width="50%">
          <StyledSettingsMenuBodyText>Volume</StyledSettingsMenuBodyText>
          <StyledSettingsMenuSlider theme={theme} type="range" min="0" max="100" value={volume} id="VolumeControl" onChange={changeVolume}/>
        </StyledSettingsMenuSectionRow>
      </StyledSettingsMenuSectionFlexbox>
  )
}

export default SettingsMenuGeneral