import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";
import { SettingsContext } from "../../context/SettingsContext";

import { StyledSettingsMenuBackground, StyledSettingsMenuFlexbox, StyledSettingsMenuHeader, StyledSettingsMenuContainer, StyledSettingsMenuTextContainer } from "./Settings.styles";

import SettingsMenuHeaderElement from "./SettingsMenuHeaderElement";
import SettingsMenuGeneral from "./SettingsMenuGeneral";
import SettingsMenuSongGuesser from "./SettingsMenuSongGuesser";
import SettingsMenuFaradayCage from "./SettingsMenuFaradayCage";

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
    <StyledSettingsMenuBackground theme={theme} $settingsMenuHidden={settingsMenuHidden} onClick={toggleSettingsMenu}/>
    <StyledSettingsMenuFlexbox $settingsMenuHidden={settingsMenuHidden}>
      <StyledSettingsMenuContainer theme={theme}>
        <StyledSettingsMenuHeader theme={theme}>
          <SettingsMenuHeaderElement value="General" position="First" active={active} updateActive={updateActive}/>
          <SettingsMenuHeaderElement value="Song Guesser" active={active} updateActive={updateActive}/>
          <SettingsMenuHeaderElement value="Faraday Cage" active={active} updateActive={updateActive}/>
          <SettingsMenuHeaderElement value="Book Notes" position="Last" active={active} updateActive={updateActive}/>
        </StyledSettingsMenuHeader>

        <StyledSettingsMenuTextContainer theme={theme}>
          {active === "General" && <SettingsMenuGeneral/>}
          {active === "Song Guesser" && <SettingsMenuSongGuesser/>}
          {active === "Faraday Cage" && <SettingsMenuFaradayCage/>}
        </StyledSettingsMenuTextContainer>
      </StyledSettingsMenuContainer>
    </StyledSettingsMenuFlexbox>
    </div>
  )
}

export default SettingsMenu