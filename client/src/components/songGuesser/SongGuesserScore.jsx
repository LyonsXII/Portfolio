import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledScoreFlexbox, StyledScoreIncrement, StyledScoreBox, StyledBodyText } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";

function SongGuesserScore({ score }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <StyledScoreFlexbox theme={theme}>
        {Array.from({ length: score }, (_, i) => (
          <StyledScoreIncrement theme={theme} key={i}>
            <StyledScoreBox>
              <StyledBodyText>{i + 1}</StyledBodyText>
            </StyledScoreBox>
          </StyledScoreIncrement>
        ))}
        <StyledScoreIncrement theme={theme} $current="true">
            <StyledScoreBox>
              <StyledBodyText>{score + 1}</StyledBodyText>
            </StyledScoreBox>
          </StyledScoreIncrement>
      </StyledScoreFlexbox>
    </div>
  )
}

export default SongGuesserScore