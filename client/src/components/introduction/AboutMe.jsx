import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { text } from "./text";
import { StyledSectionFlexbox, StyledSectionRowTextFlexbox, StyledBodyTextInitialText  } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function AboutMe({ initialSection }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledSectionFlexbox $initialSection={initialSection} $sectionName="About Me">
      <StyledSectionRowTextFlexbox theme={theme} $marginRight="0px">
        <StyledBodyTextInitialText>{text.aboutMeTextA}</StyledBodyTextInitialText>
        <StyledBodyTextInitialText>{text.aboutMeTextB}</StyledBodyTextInitialText>
        <StyledBodyTextInitialText>{text.aboutMeTextC}</StyledBodyTextInitialText>
        <StyledBodyTextInitialText>{text.aboutMeTextD}</StyledBodyTextInitialText>
      </StyledSectionRowTextFlexbox>
    </StyledSectionFlexbox>
  )
}

export default AboutMe