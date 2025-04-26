import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledScoreFlexbox, StyledScoreIncrement, StyledBodyText } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";

function SongGuesserScore({ score, transition }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <StyledScoreFlexbox theme={theme}>
        {Array.from({ length: score }, (_, i) => (
          <StyledScoreIncrement theme={theme} key={i} $mode="0">
              <StyledBodyText>{i + 1}</StyledBodyText>
          </StyledScoreIncrement>
        ))}

        <StyledScoreIncrement theme={theme} $current="true" $transition={transition} $mode="1">
            <StyledBodyText>{score + 1}</StyledBodyText>
        </StyledScoreIncrement>
        <StyledScoreIncrement theme={theme} $transition={transition} $mode="2">
            <StyledBodyText>{score + 2}</StyledBodyText>
        </StyledScoreIncrement>
      </StyledScoreFlexbox>
    </div>
  )
}

export default SongGuesserScore