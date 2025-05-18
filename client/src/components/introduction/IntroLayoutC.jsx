import React, { useState } from "react";
import styled from 'styled-components';

import IntroImage from "./IntroImage";

import { StyledIntroContainer, StyledTitleFlexbox, StyledTitleContainer, StyledTitleButtonContainer, StyledIntroContentContainer, StyledRowContainer, StyledContentFlexbox, StyledTitle, StyledBodyText, StyledNextIcon } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroLayoutC({ id, title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, expandIntroText, current, tempCurrent, reverse }) {

  return (
    <StyledIntroContainer $expandIntroText={expandIntroText} $current={current}>
      <StyledTitleFlexbox theme={theme}>
        <StyledTitleContainer>
          <StyledTitle>{title}</StyledTitle>
        </StyledTitleContainer>
        <StyledTitleButtonContainer theme={theme} onClick={changeSection} data-title={title}>
          <StyledNextIcon/>
        </StyledTitleButtonContainer>
      </StyledTitleFlexbox>

      <StyledIntroContentContainer theme={theme} $id={id} $tempCurrent={tempCurrent}>
        <StyledRowContainer>
          <IntroImage src={imgA} caption={textImgA} width="60%" paddingText="0px 0px 0px 20px" float={reverse ? "right" : "left"}/>
          <StyledBodyText>
            {textA}
            <br />
            <br />
            {textB}
            <br />
            <br />
            {textC}
            <br />
            <br />
            {textD}
          </StyledBodyText>
        </StyledRowContainer>
      </StyledIntroContentContainer>
    </StyledIntroContainer>
  )
}

export default IntroLayoutC