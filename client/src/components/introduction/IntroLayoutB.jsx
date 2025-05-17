import React, { useState } from "react";
import styled from 'styled-components';

import IntroImage from "./IntroImage";

import { StyledIntroContainer, StyledTitleFlexbox, StyledTitleContainer, StyledTitleButtonContainer, StyledIntroContentContainer, StyledContentFlexbox, StyledRowContainer, StyledImageContainer, StyledDownloadButtonContainer, StyledDownloadButtonFlexbox, StyledFloatContainer, StyledTitle, StyledBodyText, StyledNextIcon, StyledDownloadIcon } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroLayoutB({ id, title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, expandIntroText, current, tempCurrent, reverse, links }) {

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

      <StyledIntroContentContainer theme={theme} $id={id} $tempCurrent={tempCurrent} $flexDirection={reverse ? "row-reverse" : "row"} $gap="30px">
        <StyledRowContainer>
          <StyledFloatContainer $float={reverse ? "right" : "left"} $width="40%" $margin={reverse ? "10px 0px 0px 30px" : "10px 30px 20px 0px"}>
            <IntroImage src={imgA} caption={textImgA} width="100%" paddingText="0px 0px 0px 20px"/>
            <IntroImage src={imgA} caption={textImgB} width="100%" paddingText="0px 0px 0px 20px" margin={reverse ? "20px 0px 0px 0px" : "20px 0px 0px 0px"}/>
          </StyledFloatContainer>

          <StyledBodyText>
            {textA}
            <br/>
            <br/>
            {textB}
            <br/>
            <br/>
            {textC}
            <br/>
            <br/>
            {textD}
          </StyledBodyText>

          {links && 
            <StyledDownloadButtonContainer>
              <StyledDownloadButtonFlexbox>
              <a href="papers/Mathematics of the Faraday Cage.pdf" download="Mathematics of the Faraday Cage.pdf"><StyledDownloadIcon/></a>
              <StyledBodyText>Original Paper</StyledBodyText>
              </StyledDownloadButtonFlexbox>

              <StyledDownloadButtonFlexbox>
                <a href="papers/A Two-Dimensional Mathematical Analysis of the Faraday Cage.pdf" download="A Two-Dimensional Mathematical Analysis of the Faraday Cage.pdf"><StyledDownloadIcon/></a>
                <StyledBodyText>My Dissertation</StyledBodyText>
              </StyledDownloadButtonFlexbox>
            </StyledDownloadButtonContainer>
          }
        </StyledRowContainer>
      </StyledIntroContentContainer>
    </StyledIntroContainer>
  )
}

export default IntroLayoutB