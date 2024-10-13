import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";
import { SettingsContext } from "../../context/SettingsContext";

const StyledOptionFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 30px;
`;

const StyledOptionFlexboxEntry = styled.div`
  display: flex;
  width: 100%;
  min-width: 100%;
  gap: 40px;
`;

function SettingsMenuSongGuesser({ active }) {
  const { theme } = useContext(ThemeContext);
  const { volume, changeVolume } = useContext(AudioContext);
  const { autoplay, autoNextQuestion, toggleAutoplay, toggleAutoNextQuestion } = useContext(SettingsContext);

  return (
    <StyledOptionFlexbox>
      <StyledOptionFlexboxEntry>
        <h4>Autoplay</h4>
        <input type="checkbox" checked={autoplay} onChange={toggleAutoplay}/>
      </StyledOptionFlexboxEntry>
      <StyledOptionFlexboxEntry>
        <h4>Autoplay Next Question</h4>
        <input type="checkbox" checked={autoNextQuestion} onChange={toggleAutoNextQuestion}/>
      </StyledOptionFlexboxEntry>
    </StyledOptionFlexbox>
  )
}

export default SettingsMenuSongGuesser