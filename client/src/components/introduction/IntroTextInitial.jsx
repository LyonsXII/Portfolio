import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledTitle, StyledMinorTitle, StyledBodyTextInitialText, StyledButtonsContainer, StyledIntroContainer } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroTextInitial({ title, text, current, showSubTitle, subTitleEntranceComplete, expandIntroText, introBodyTextAnimationActive }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledIntroContainer $title={title} $current={current} $expandIntroText={expandIntroText}>
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
  )
}

export default IntroTextInitial