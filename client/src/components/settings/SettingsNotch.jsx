import React, { useState, useEffect, useRef, useContext } from "react";
import styled from 'styled-components';

import { StyledNotchContainer } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

function SettingsNotch({ settingsHidden, toggleButtonsVisible, clickedRef }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  const [animationState, setAnimationState] = useState("None");

  function toggle() {
    toggleButtonsVisible();
    clickSound();
    clickedRef.current = true;
  }

  useEffect(() => {
    if (clickedRef.current === true && settingsHidden === true) {
      setAnimationState("Exit");
    } else if (clickedRef.current === true && settingsHidden === false) {
      setAnimationState("Enter");
    }
  }, [settingsHidden]);

  return (
    <StyledNotchContainer theme={theme} onClick={toggle} $settingsHidden={settingsHidden} $animationState={animationState}/>
  )
}

export default SettingsNotch