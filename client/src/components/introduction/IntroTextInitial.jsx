import React, { useState, useContext } from "react";
import styled from 'styled-components';

import TechStack from "./TechStack";
import AboutMe from "./AboutMe";
import Interests from "./Interests";

import { StyledIntroTitleWrapper, StyledMainTitle, StyledMinorTitleInitial, StyledBodyTextInitialText, StyledButtonsContainer, StyledIntroContainer, StyledIntroButtonContainer, StyledIntroButton, StyledIntroInitialContentContainer,StyledSectionRowFlexbox, StyledInitialSectionFlexbox, StyledHeadingText } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroTextInitial({ id, title, text, current, tempCurrent, showSubTitle, subTitleEntranceComplete, expandIntroText, initialSection, setInitialSection, changeInitialSection, collapseIntroText }) {
  const { theme } = useContext(ThemeContext);

  return (
    current === id ?
      <StyledIntroContainer  $title={title} $current={current}  $expandIntroText={expandIntroText}>
        <StyledIntroTitleWrapper theme={theme} >
          <StyledMainTitle $id={id} $tempCurrent={tempCurrent} $showSubTitle={showSubTitle}>
            {title}
          </StyledMainTitle>
          <StyledMinorTitleInitial $showSubTitle={showSubTitle} $subTitleEntranceComplete={subTitleEntranceComplete}>
            Michael Lyons
          </StyledMinorTitleInitial>
        </StyledIntroTitleWrapper>
        
        <StyledIntroInitialContentContainer theme={theme} $id={id} $tempCurrent={tempCurrent} $current={current} $expandIntroText={expandIntroText} $initialSection={initialSection}>
          <StyledSectionRowFlexbox $initialSection={initialSection} $collapse={collapseIntroText} $marginTopMobile="20px" $marginRight="0px">
            <StyledBodyTextInitialText $collapse={collapseIntroText}>
              {text}
            </StyledBodyTextInitialText>
          </StyledSectionRowFlexbox>
          
          <StyledIntroButtonContainer $initialSection={initialSection} $collapse={collapseIntroText} $marginTop="20px" $marginTopMobile="0px" $marginRight="0px">
            <StyledIntroButton theme={theme} value="About Me" $right={true} $initialSection={initialSection} onClick={changeInitialSection}>
              <StyledHeadingText theme={theme}>About Me</StyledHeadingText>
            </StyledIntroButton>
            <StyledIntroButton theme={theme} value="Tech Stack" $initialSection={initialSection} onClick={changeInitialSection}>
              <StyledHeadingText theme={theme}>Tech Stack</StyledHeadingText>
            </StyledIntroButton>
            <StyledIntroButton theme={theme} value="Interests" $left={true} $initialSection={initialSection} onClick={changeInitialSection}>
              <StyledHeadingText theme={theme}>Interests</StyledHeadingText>
            </StyledIntroButton>
          </StyledIntroButtonContainer>

          <AboutMe initialSection={initialSection}/>
          <TechStack initialSection={initialSection}/>
          <Interests initialSection={initialSection}/>
        </StyledIntroInitialContentContainer>
      </StyledIntroContainer>
    : null
  )
}

export default IntroTextInitial