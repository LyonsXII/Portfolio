import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledTitle, StyledMinorTitle, StyledBodyTextInitialText, StyledButtonsContainer, StyledIntroContainer } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroTextInitial({ title, text, current, showSubTitle, subTitleEntranceComplete, expandIntroText, introBodyTextAnimationActive }) {
  const { theme } = useContext(ThemeContext);

  const names = {
    0: "Portfolio",
    1: "Song Guesser",
    2: "Faraday Cage",
    3: "Book Notes"
  }
  const currentName = names[Math.ceil(current / 3)];

  return (
    current === 0 ?
      <StyledIntroContainer $title={title} $current={currentName} $expandIntroText={expandIntroText}>
        <StyledTitle $showSubTitle={showSubTitle} $expandIntroText={expandIntroText} $subTitleEntranceComplete={subTitleEntranceComplete} $introBodyTextAnimationActive={introBodyTextAnimationActive}>
          {title}
        </StyledTitle>
        <StyledMinorTitle $showSubTitle={showSubTitle} $subTitleEntranceComplete={subTitleEntranceComplete} $expandIntroText={expandIntroText} $introBodyTextAnimationActive={introBodyTextAnimationActive}>
          Michael Lyons
        </StyledMinorTitle>
        {expandIntroText ?
          <StyledBodyTextInitialText $introBodyTextAnimationActive={introBodyTextAnimationActive}>
            {text}
          </StyledBodyTextInitialText>
          : null
        }
      </StyledIntroContainer>
    : null
  )
}

export default IntroTextInitial