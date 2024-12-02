import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledScoreFlexbox, StyledScoreIncrement, StyledScoreBox } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";

function SongGuesserScore({ score }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <StyledScoreFlexbox theme={theme}>
        {Array.from({ length: score }, (_, i) => (
          <StyledScoreIncrement theme={theme} key={i}>
            <StyledScoreBox>
              <h4>{i + 1}</h4>
            </StyledScoreBox>
          </StyledScoreIncrement>
        ))}
        <StyledScoreIncrement theme={theme} $current={"true"}>
            <StyledScoreBox>
              <h4>{score + 1}</h4>
            </StyledScoreBox>
          </StyledScoreIncrement>
      </StyledScoreFlexbox>
    </div>
  )
}

export default SongGuesserScore