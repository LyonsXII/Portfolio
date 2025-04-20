import React, { useState } from "react";
import styled from 'styled-components';

import IntroImage from "./IntroImage";

import { StyledIntroContainer, StyledTitleFlexbox, StyledTitleContainer, StyledTitleButtonContainer, StyledIntroContentContainer, StyledRowContainer, StyledContentFlexbox, StyledTitle, StyledBodyText, StyledNextIcon } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroLayoutC({ title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, $expandIntroText, current, reverse }) {

  return (
    <StyledIntroContainer $expandIntroText={$expandIntroText}>
      <StyledTitleFlexbox theme={theme}>
        <StyledTitleContainer>
          <StyledTitle>{title}</StyledTitle>
        </StyledTitleContainer>
        <StyledTitleButtonContainer theme={theme} onClick={changeSection} data-title={title}>
          <StyledNextIcon/>
        </StyledTitleButtonContainer>
      </StyledTitleFlexbox>

      <StyledIntroContentContainer theme={theme}>
        <StyledRowContainer>
          <IntroImage src={imgA} caption={textImgA} width="60%" paddingText="0px 0px 0px 20px" margin={reverse ? "10px 0px 20px 30px" : "10px 30px 20px 0px"} float={reverse ? "right" : "left"}/>
          <StyledBodyText>
            {textA}
            <br />
            <br />
            {textB}
            <br />
            <br />
            {textC}
          </StyledBodyText>
        </StyledRowContainer>
      </StyledIntroContentContainer>
    </StyledIntroContainer>
  )
}

export default IntroLayoutC