import React, { useContext } from "react";
import styled from 'styled-components';

import { SettingsMenuSlider, StyledBodyText } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const StyledOptionFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 30px;
`;

const StyledOptionFlexboxEntry = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  min-width: 100%;
  gap: 40px;
`;



function SettingsMenuGeneral({ active }) {
  const { theme } = useContext(ThemeContext);
  const { volume, changeVolume } = useContext(AudioContext);

  return (
      <StyledOptionFlexbox>
        <StyledOptionFlexboxEntry>
          <StyledBodyText>Volume</StyledBodyText>
          <SettingsMenuSlider theme={theme} type="range" min="0" max="100" value={volume} id="VolumeControl" onChange={changeVolume}/>
        </StyledOptionFlexboxEntry>
      </StyledOptionFlexbox>
  )
}

export default SettingsMenuGeneral