import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledMainBackground, StyledMainContainer } from './General.styles';

import { ThemeContext } from "../../context/ThemeContext";

function PrimaryContainer({ children }) {
  const { theme, bg } = useContext(ThemeContext);

  return (
    <div>
      <StyledMainBackground theme={theme} $bg={bg}/>
      <StyledMainContainer theme={theme}>
        {children}
      </StyledMainContainer>
    </div>
  )
}

export default PrimaryContainer