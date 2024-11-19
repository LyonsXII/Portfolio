import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledTitle, StyledMinorTitle, StyledBodyText } from "./Introduction.styles";

import { slideInTopAnimation, slideOutBottomAnimation } from '../../context/Animations';

import { ThemeContext } from "../../context/ThemeContext";

const StyledFlexContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 60px;
  padding: 0px 40px;

  animation: ${({ $current, $title }) => 
    $current === $title 
      ? slideInTopAnimation
      : slideOutBottomAnimation
  };
`;

const StyledImage = styled.div`
  height: 400px;
  width: 80%;
  border: 4px solid black;
  border-radius: 20px;
  margin-top: 30px;
`;

function IntroTextInitial({ title, text, current }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledFlexContainer $title={title} $current={current}>
      <StyledTitle>{title}</StyledTitle>
      <StyledMinorTitle>Michael Lyons</StyledMinorTitle>
      <p>{text}</p>
    </StyledFlexContainer>
  )
}

export default IntroTextInitial