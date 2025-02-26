import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";
import { SettingsContext } from "../../context/SettingsContext";

import SettingsMenuHeaderElement from "./SettingsMenuHeaderElement";
import SettingsMenuGeneral from "./SettingsMenuGeneral";
import SettingsMenuSongGuesser from "./SettingsMenuSongGuesser";

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
  background-color: ${({ theme }) => theme.secondaryColor};
`;

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

const StyledTextContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
`;

function SettingsMenu({ settingsMenuHidden, toggleSettingsMenu }) {
  const { theme } = useContext(ThemeContext);
  const { volume, changeVolume } = useContext(AudioContext);
  const { autoplay, toggleAutoplay, autoNextQuestion, toggleAutoNextQuestion } = useContext(SettingsContext);

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
          {active === "General" ? <SettingsMenuGeneral/> : null}
          {active === "Song Guesser" ? <SettingsMenuSongGuesser/> : null}
        </StyledTextContainer>
      </StyledSettingsContainer>
    </StyledFlexbox>
    </div>
  )
}

export default SettingsMenu