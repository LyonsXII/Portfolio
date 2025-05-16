import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { text } from "./text";
import { StyledSectionFlexbox, StyledSectionRowTextFlexbox, StyledBodyTextInitialText, Scroll  } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function AboutMe({ initialSection }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledSectionFlexbox $initialSection={initialSection} $sectionName="About Me">
      <StyledSectionRowTextFlexbox theme={theme} $marginRight="0px" $marginTop="20px" $marginTopMobile="0px">
        <Scroll>
          <StyledBodyTextInitialText>{text.aboutMeTextA}</StyledBodyTextInitialText>
          <StyledBodyTextInitialText>{text.aboutMeTextB}</StyledBodyTextInitialText>
          <StyledBodyTextInitialText>{text.aboutMeTextC}</StyledBodyTextInitialText>
          <StyledBodyTextInitialText>{text.aboutMeTextD}</StyledBodyTextInitialText>
        </Scroll>
      </StyledSectionRowTextFlexbox>
    </StyledSectionFlexbox>
  )
}

export default AboutMe