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
  align-items: center;
  width: 100%;
  min-width: 100%;
  gap: 40px;
`;

const StyledInput = styled.input`
  // Hide default tickbox
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 60px;
  height: 30px;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;

  // Knob settings
  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    background-color: ${({ theme }) => theme.textColor};
    border-radius: 50%;
    transition: 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  // State changes when toggled
  &:checked {
    background-color: ${({ theme }) => theme.tertiaryColor};

    &::after {
      left: calc(100% - 27px); /* Move knob to right */
    }
  }

  // Hover effect
  &:hover {
    background-color: #b289b5;
  }
`;



function SettingsMenuSongGuesser({ active }) {
  const { theme } = useContext(ThemeContext);
  const { volume, changeVolume } = useContext(AudioContext);
  const { autoplay, autoNextQuestion, toggleAutoplay, toggleAutoNextQuestion } = useContext(SettingsContext);

  return (
    <StyledOptionFlexbox>
      <StyledOptionFlexboxEntry>
        <h4>Autoplay</h4>
        <StyledInput theme={theme} type="checkbox" checked={autoplay} onChange={toggleAutoplay}/>
      </StyledOptionFlexboxEntry>
      <StyledOptionFlexboxEntry>
        <h4>Autoplay Next Question</h4>
        <StyledInput theme={theme} type="checkbox" checked={autoNextQuestion} onChange={toggleAutoNextQuestion}/>
      </StyledOptionFlexboxEntry>
    </StyledOptionFlexbox>
  )
}

export default SettingsMenuSongGuesser