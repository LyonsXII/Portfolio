import React, { useState, useContext } from "react";
import styled from 'styled-components';

import TechStack from "./TechStack";

import { StyledMainTitle, StyledMinorTitleInitial, StyledBodyTextInitialText, StyledButtonsContainer, StyledIntroContainer, StyledIntroButton, StyledIntroInitialContentContainer,StyledSectionRowFlexbox, StyledHeadingText } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroTextInitial({ id, title, text, current, tempCurrent, showSubTitle, subTitleEntranceComplete, expandIntroText, introBodyTextAnimationActive }) {
  const { theme } = useContext(ThemeContext);

  const [initialSection, setInitialSection] = useState("None");

  function changeSection(e) {
    if (initialSection == e.target.value) {setInitialSection("None")}
    else {setInitialSection(e.target.value)}
  }

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
          <StyledSectionRowFlexbox $marginTop="20px" $marginRight="0px">
            <StyledIntroButton theme={theme} value="About Me" onClick={changeSection}>
              <StyledHeadingText theme={theme}>About Me</StyledHeadingText>
            </StyledIntroButton>
            <StyledIntroButton theme={theme} value="Tech Stack" onClick={changeSection}>
              <StyledHeadingText theme={theme}>Tech Stack</StyledHeadingText>
            </StyledIntroButton>
            <StyledIntroButton theme={theme} value="Interests" onClick={changeSection}>
              <StyledHeadingText theme={theme}>Interests</StyledHeadingText>
            </StyledIntroButton>
          </StyledSectionRowFlexbox>
          {initialSection == "Tech Stack" && <TechStack/>}
        </StyledIntroInitialContentContainer>
      </StyledIntroContainer>
    : null
  )
}

export default IntroTextInitial