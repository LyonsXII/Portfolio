import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledMainTitle, StyledMinorTitleInitial, StyledBodyTextInitialText, StyledButtonsContainer, StyledIntroContainer } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroTextInitial({ id, title, text, current, tempCurrent, showSubTitle, subTitleEntranceComplete, expandIntroText, introBodyTextAnimationActive }) {
  const { theme } = useContext(ThemeContext);

  return (
    current === id ?
      <StyledIntroContainer $id={id} $title={title} $current={current} $tempCurrent={tempCurrent} $expandIntroText={expandIntroText}>
        <StyledMainTitle $showSubTitle={showSubTitle} $expandIntroText={expandIntroText} $subTitleEntranceComplete={subTitleEntranceComplete} $introBodyTextAnimationActive={introBodyTextAnimationActive}>
          {title}
        </StyledMainTitle>
        <StyledMinorTitleInitial $showSubTitle={showSubTitle} $subTitleEntranceComplete={subTitleEntranceComplete} $expandIntroText={expandIntroText} $introBodyTextAnimationActive={introBodyTextAnimationActive}>
          Michael Lyons
        </StyledMinorTitleInitial>
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