import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledSpacer } from "./Settings.styles"

import { ThemeContext } from "../../context/ThemeContext";

function Spacer({ children, background, mobileOrder }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledSpacer theme={theme} $background={background} $mobileOrder={mobileOrder}>
        {children}
      </StyledSpacer>
  )
}

export default Spacer