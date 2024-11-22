import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledTitle, StyledMinorTitle, StyledBodyText, StyledButtonsContainer, StyledIntroContainer } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

const StyledImage = styled.div`
  height: 400px;
  width: 80%;
  border: 4px solid black;
  border-radius: 20px;
  margin-top: 30px;
`;

function IntroTextInitial({ title, text, current, showSubTitle }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledIntroContainer $title={title} $current={current}>
      <StyledTitle>{title}</StyledTitle>
      <StyledMinorTitle $showSubTitle={showSubTitle}>Michael Lyons</StyledMinorTitle>
    </StyledIntroContainer>
  )
}

export default IntroTextInitial