import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledSpacer } from "./Settings.styles"

import { ThemeContext } from "../../context/ThemeContext";

function Spacer({ children, background }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledSpacer theme={theme} $background={background}>
        {children}
      </StyledSpacer>
  )
}

export default Spacer