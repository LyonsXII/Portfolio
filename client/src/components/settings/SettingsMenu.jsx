import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

import SettingsMenuHeaderElement from "./SettingsMenuHeaderElement";

const StyledSettingsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 1;
  opacity: 0.8;
  display: ${({ $settingsMenuHidden }) => $settingsMenuHidden === true ? "none" : "inline"};
`;

const StyledFlexbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.primaryColor};
  display: ${({ $settingsMenuHidden }) => $settingsMenuHidden === true ? "none" : "flex"};
  justify-content: center;
  align-items: center;
`;

const StyledSettingsHeader = styled.div`
  height: 10vh;
  width: 70vw;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 20px 20px 0px 0px;
  border-bottom: 4px solid black;
  z-index: 4;
  display: ${({ $settingsMenuHidden }) => $settingsMenuHidden === true ? "none" : "flex"};
  justify-self: center;
  align-self: flex-start;
`;

const StyledSettingsContainer = styled.div`
  height: 60vh;
  width: 70vw;
  background-color: ${({ theme }) => theme.primaryColor};
  border: 4px solid black;
  border-radius: 20px;
  z-index: 3;
  display: ${({ $settingsMenuHidden }) => $settingsMenuHidden === true ? "none" : "flex"};
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledOptionFlexbox = styled.div`
  display: flex;
  width: 40%;
  gap: 30px;
`;

const Slider = styled.input`
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

  /* WebKit browsers (Chrome, Safari, etc.) */
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #04AA6D; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  /* Firefox */
  &::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #04AA6D; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }

  /* Custom thumb styling for Internet Explorer and Edge */
  &::-ms-thumb {
    width: 25px;
    height: 25px;
    background: #04AA6D;
    cursor: pointer;
  }
`;

const StyledTextContainer = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 30px;
  padding-left: 30px;
`;

function SettingsMenu({ settingsMenuHidden, toggleSettingsMenu }) {
  const { theme } = useContext(ThemeContext);
  const { volume, changeVolume } = useContext(AudioContext);

  const [active, setActive] = useState("General");

  function updateActive(value) {
    setActive(value);
  }

  return (
    <div>
    <StyledSettingsBackground theme={theme} $settingsMenuHidden={settingsMenuHidden} onClick={toggleSettingsMenu}/>
    <StyledFlexbox $settingsMenuHidden={settingsMenuHidden}>
      <StyledSettingsContainer theme={theme}>
        <StyledSettingsHeader theme={theme}>
          <SettingsMenuHeaderElement value="General" position="First" active={active} updateActive={updateActive}/>
          <SettingsMenuHeaderElement value="Song Guesser" active={active} updateActive={updateActive}/>
          <SettingsMenuHeaderElement value="Faraday Cage" active={active} updateActive={updateActive}/>
          <SettingsMenuHeaderElement value="Book Notes" position="Last" active={active} updateActive={updateActive}/>
        </StyledSettingsHeader>
        <StyledTextContainer>
          {active === "General" ? 
            <StyledOptionFlexbox>
            <h4>Volume</h4>
            <Slider type="range" min="0" max="100" value={volume} id="myRange" onChange={changeVolume}/>
            </StyledOptionFlexbox>
          : null}
          {active === "Song Guesser" ? 
            <StyledOptionFlexbox>
            <h4>Autoplay</h4>
            <Slider type="range" min="0" max="100" value={volume} id="myRange" onChange={changeVolume}/>
            <h4>Auto Next Question</h4>
            <Slider type="range" min="0" max="100" value={volume} id="myRange" onChange={changeVolume}/>
            </StyledOptionFlexbox>
          : null}
        </StyledTextContainer>
      </StyledSettingsContainer>
    </StyledFlexbox>
    </div>
  )
}

export default SettingsMenu