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

function IntroText({ title, id, textA, textB, current }) {
  const { theme } = useContext(ThemeContext);

  const names = {
    0: "Portfolio",
    1: "Song Guesser",
    2: "Faraday Cage",
    3: "Book Notes"
  }
  const currentName = names[Math.ceil(current / 3)];
  console.log("typeof current:", typeof current, "typeof id:", typeof id);

  return (
    current === id ?
      <StyledIntroContainer $current={currentName} $title={title}>
        <StyledTitle>{title}</StyledTitle>
        <StyledImage />
        <StyledBodyText style={{ marginTop: "40px" }}>
          {textA}
            <br />
            <br />
          {textB}
        </StyledBodyText>
      </StyledIntroContainer>
    : null
  )
}

export default IntroText