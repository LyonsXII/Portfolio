import React, { useState, useContext } from "react";
import styled from 'styled-components';

import TechStack from "./TechStack";
import AboutMe from "./AboutMe";
import Interests from "./Interests";

import { StyledMainTitle, StyledMinorTitleInitial, StyledBodyTextInitialText, StyledButtonsContainer, StyledIntroContainer, StyledIntroButton, StyledIntroInitialContentContainer,StyledSectionRowFlexbox, StyledInitialSectionFlexbox, StyledHeadingText } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroTextInitial({ id, title, text, current, tempCurrent, showSubTitle, subTitleEntranceComplete, expandIntroText, introBodyTextAnimationActive, initialSection, setInitialSection, changeInitialSection }) {
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
          <StyledSectionRowFlexbox $marginRight="0px">
            <StyledBodyTextInitialText>
              {text}
            </StyledBodyTextInitialText>
          </StyledSectionRowFlexbox>
          <StyledSectionRowFlexbox $marginTop="20px" $marginRight="0px">
            <StyledIntroButton theme={theme} value="About Me" onClick={changeInitialSection}>
              <StyledHeadingText theme={theme}>About Me</StyledHeadingText>
            </StyledIntroButton>
            <StyledIntroButton theme={theme} value="Tech Stack" onClick={changeInitialSection}>
              <StyledHeadingText theme={theme}>Tech Stack</StyledHeadingText>
            </StyledIntroButton>
            <StyledIntroButton theme={theme} value="Interests" onClick={changeInitialSection}>
              <StyledHeadingText theme={theme}>Interests</StyledHeadingText>
            </StyledIntroButton>
          </StyledSectionRowFlexbox>

          <StyledInitialSectionFlexbox>
            <AboutMe initialSection={initialSection}/>
            <TechStack initialSection={initialSection}/>
            <Interests initialSection={initialSection}/>
          </StyledInitialSectionFlexbox>

        </StyledIntroInitialContentContainer>
      </StyledIntroContainer>
    : null
  )
}

export default IntroTextInitial