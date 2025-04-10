import React, { useState, useContext } from "react";
import styled from 'styled-components';

import TechStack from "./TechStack";

import { StyledMainTitle, StyledMinorTitleInitial, StyledBodyTextInitialText, StyledButtonsContainer, StyledIntroContainer, StyledIntroInitialContentContainer, StyledSectionRowFlexbox, StyledHeadingText } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroTextInitial({ id, title, text, current, tempCurrent, showSubTitle, subTitleEntranceComplete, expandIntroText, introBodyTextAnimationActive }) {
  const { theme } = useContext(ThemeContext);

  return (
    current === id ?
      <StyledIntroContainer $id={id} $title={title} $current={current} $tempCurrent={tempCurrent} $expandIntroText={expandIntroText}>
        <StyledMainTitle $showSubTitle={showSubTitle}>
          {title}
        </StyledMainTitle>
        <StyledMinorTitleInitial $showSubTitle={showSubTitle} $subTitleEntranceComplete={subTitleEntranceComplete}>
          Michael Lyons
        </StyledMinorTitleInitial>
        

          <StyledIntroInitialContentContainer $expandIntroText={expandIntroText}>
            <StyledBodyTextInitialText $introBodyTextAnimationActive={introBodyTextAnimationActive}>
              {text}
            </StyledBodyTextInitialText>
            <StyledSectionRowFlexbox>
              <StyledHeadingText>About Me</StyledHeadingText>
              <StyledHeadingText>Tech Stack</StyledHeadingText>
              <StyledHeadingText>Hobbies</StyledHeadingText>
            </StyledSectionRowFlexbox>
            <TechStack/>
          </StyledIntroInitialContentContainer>
      </StyledIntroContainer>
    : null
  )
}

export default IntroTextInitial