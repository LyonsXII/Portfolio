import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { StyledHoverTextContainer } from "./Settings.styles";

function SettingsTextContainer({ children, ...props }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledHoverTextContainer theme={theme}>
        {children}
      </StyledHoverTextContainer>
  )
}

export default SettingsTextContainer