import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { text } from "./text";
import { StyledSectionFlexbox, StyledSectionRowTextFlexbox, StyledBodyTextInitialText  } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function Interests({ initialSection }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledSectionFlexbox $initialSection={initialSection} $sectionName="Interests">
      <StyledSectionRowTextFlexbox theme={theme} $marginRight="0px">
        <StyledBodyTextInitialText>{text.interestsA}</StyledBodyTextInitialText>
        <StyledBodyTextInitialText>{text.interestsB}</StyledBodyTextInitialText>
        <StyledBodyTextInitialText>{text.interestsC}</StyledBodyTextInitialText>
        <StyledBodyTextInitialText>{text.interestsD}</StyledBodyTextInitialText>
      </StyledSectionRowTextFlexbox>
    </StyledSectionFlexbox>
  )
}

export default Interests