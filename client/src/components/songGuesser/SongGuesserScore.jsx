import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { StyledScoreWrapper, StyledScoreFlexbox, StyledScoreIncrement, StyledBodyText } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";

function SongGuesserScore({ score, transition, numQuestions }) {
  const { theme } = useContext(ThemeContext);

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 1000)
  }, [])

  return (
    <StyledScoreWrapper $display={display}>
      <StyledScoreFlexbox theme={theme}>
        {Array.from({ length: score }, (_, i) => (
          <StyledScoreIncrement theme={theme} key={i} $mode="0" $numQuestions={numQuestions}>
              <StyledBodyText>{i + 1}</StyledBodyText>
          </StyledScoreIncrement>
        ))}

        <StyledScoreIncrement theme={theme} $current="true" $transition={transition} $mode="1" $numQuestions={numQuestions}>
            <StyledBodyText>{score + 1}</StyledBodyText>
        </StyledScoreIncrement>
        <StyledScoreIncrement theme={theme} $transition={transition} $mode="2">
            <StyledBodyText>{score + 2}</StyledBodyText>
        </StyledScoreIncrement>
      </StyledScoreFlexbox>
    </StyledScoreWrapper>
  )
}

export default SongGuesserScore