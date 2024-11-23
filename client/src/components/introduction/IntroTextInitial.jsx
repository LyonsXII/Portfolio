import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledTitle, StyledMinorTitle, StyledBodyTextInitialText, StyledButtonsContainer, StyledIntroContainer } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

const StyledImage = styled.div`
  height: 400px;
  width: 80%;
  border: 4px solid black;
  border-radius: 20px;
  margin-top: 30px;
`;

function IntroTextInitial({ title, text, current, showSubTitle, expandIntroText }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledIntroContainer $title={title} $current={current} $expandIntroText={expandIntroText}>
      <StyledTitle $showSubTitle={showSubTitle} $expandIntroText={expandIntroText}>
        {title}
      </StyledTitle>
      <StyledMinorTitle $showSubTitle={showSubTitle} $expandIntroText={expandIntroText}>
        Michael Lyons
      </StyledMinorTitle>
      {expandIntroText ?
        <StyledBodyTextInitialText>
          {text}
        </StyledBodyTextInitialText>
        : null
      }
    </StyledIntroContainer>
  )
}

export default IntroTextInitial