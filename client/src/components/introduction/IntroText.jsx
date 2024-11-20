import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { StyledTitle, StyledMinorTitle, StyledBodyText, StyledButtonsContainer, StyledIntroContainer } from "./Introduction.styles";

const StyledImage = styled.div`
  height: 400px;
  width: 80%;
  border: 4px solid black;
  border-radius: 20px;
  margin-top: 30px;
`;

function IntroText({ title, textA, textB, current }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledIntroContainer $current={current} $title={title}>
      <StyledTitle>{title}</StyledTitle>
      <StyledImage />
      <StyledBodyText style={{ marginTop: "40px" }}>
        {textA}
          <br />
          <br />
        {textB}
      </StyledBodyText>
    </StyledIntroContainer>
  )
}

export default IntroText