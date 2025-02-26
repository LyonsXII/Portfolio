import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledButtonContainer } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";

function SettingsButtonContainer({ children, toggleButtonsVisible }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledButtonContainer theme={theme} onMouseOver={toggleButtonsVisible} onMouseLeave={toggleButtonsVisible}>
        {children}
      </StyledButtonContainer>
  )
}

export default SettingsButtonContainer