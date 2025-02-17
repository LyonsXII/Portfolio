import React, { useState, useEffect, useRef, useContext } from "react";
import styled from 'styled-components';

import { StyledSettingsContainer } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";

function SettingsContainer({ children, settingsHidden, clickedRef }) {
  const { theme } = useContext(ThemeContext);

  const [animationState, setAnimationState] = useState("None");

  useEffect(() => {
    if (clickedRef.current === true && settingsHidden === true) {
      setAnimationState("Exit");
    } else if (clickedRef.current === true && settingsHidden === false) {
      setAnimationState("Enter");
    }
  }, [settingsHidden]);

  return (
      <StyledSettingsContainer theme={theme} $settingsHidden={settingsHidden} $animationState={animationState}>
        {children}
      </StyledSettingsContainer>
  )
}

export default SettingsContainer