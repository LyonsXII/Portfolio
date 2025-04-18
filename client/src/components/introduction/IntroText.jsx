import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import IntroImage from "./IntroImage";

import { StyledIntroContentContainer, StyledContentFlexbox, StyledContentInteriorFlexbox, StyledTitle, StyledMinorTitle, StyledBodyText, StyledImageWrapper, StyledShadowOverlay, StyledImage, StyledTitleFlexbox, StyledTitleContainer, StyledTitleButtonContainer, StyledIntroButtonContainer, StyledButtonsContainer, StyledIntroContainer, StyledSVG, StyledNextIcon } from "./Introduction.styles";

function IntroText({ id, title, textA, textB, textC, textD, textImgA, textImgB, layout, current, tempCurrent, changeSection, $expandIntroText, imgA }) {
  const { theme } = useContext(ThemeContext);

  if (current != id) {return null}

  const layoutMap = {
    A: ({ containerProps, title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, $expandIntroText, current }) => (
      <StyledIntroContainer {...containerProps} $expandIntroText={$expandIntroText} $current={current}>
        <StyledTitleFlexbox theme={theme}>
          <StyledTitleContainer>
            <StyledTitle>{title}</StyledTitle>
          </StyledTitleContainer>
          <StyledTitleButtonContainer theme={theme} onClick={changeSection} data-title={title}>
            <StyledNextIcon/>
          </StyledTitleButtonContainer>
        </StyledTitleFlexbox>
  
        <StyledIntroContentContainer>
          <StyledContentFlexbox>
            <StyledBodyText>
              {textA}
              <br />
              <br />
              {textB}
            </StyledBodyText>
          </StyledContentFlexbox>
          <StyledContentFlexbox>
            <StyledContentFlexbox $width="40%">
              <StyledBodyText $padding="0px 20px 0px 0px">
                {textC}
                <br />
                <br />
                {textD}
              </StyledBodyText>
            </StyledContentFlexbox>
            <StyledContentFlexbox $flexDirection="column" $width="60%">
              <IntroImage src={imgA} textPadding="0px 0px 0px 20px" caption={textImgA}/>
            </StyledContentFlexbox>
          </StyledContentFlexbox>
        </StyledIntroContentContainer>
      </StyledIntroContainer>
    ),
    B: ({ containerProps, title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, $expandIntroText, current }) => (
      <StyledIntroContainer {...containerProps} $expandIntroText={$expandIntroText} $current={current}>
        <StyledTitleFlexbox theme={theme}>
          <StyledTitleContainer>
            <StyledTitle>{title}</StyledTitle>
          </StyledTitleContainer>
          <StyledTitleButtonContainer theme={theme} onClick={changeSection} data-title={title}>
            <StyledNextIcon/>
          </StyledTitleButtonContainer>
        </StyledTitleFlexbox>

      <StyledIntroContentContainer $flexDirection="row" $gap="30px">
        <StyledContentFlexbox $flexDirection="column" $width="60%">
          <StyledBodyText>
            {textA}
            <br />
            <br />
            {textB}
            <br />
            <br />
            {textC}
          </StyledBodyText>
        </StyledContentFlexbox>
        <StyledContentFlexbox $flexDirection="column" $width="40%" $padding="0px" $gap="20px">
          <IntroImage src={imgA} caption={textImgA} paddingText="0px 0px 0px 20px"/>
          <IntroImage src={imgA} caption={textImgA} paddingText="0px 0px 0px 20px"/>
        </StyledContentFlexbox>
      </StyledIntroContentContainer>
    </StyledIntroContainer>
    ),
    C: ({ containerProps, title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, $expandIntroText, current }) => (
      <StyledIntroContainer {...containerProps} $expandIntroText={$expandIntroText}>
        <StyledTitleFlexbox theme={theme}>
          <StyledTitleContainer>
            <StyledTitle>{title}</StyledTitle>
          </StyledTitleContainer>
          <StyledTitleButtonContainer theme={theme} onClick={changeSection} data-title={title}>
            <StyledNextIcon/>
          </StyledTitleButtonContainer>
        </StyledTitleFlexbox>
        <StyledIntroContentContainer>
          <StyledContentFlexbox $width="100%">
            <StyledContentFlexbox $width="70%" $padding="0px" $flexDirection="column">
              <IntroImage src={imgA} caption={textImgA} paddingText="0px 0px 0px 20px"/>
            </StyledContentFlexbox>
            <StyledContentFlexbox $width="30%">
              <StyledBodyText $padding="0px 0px 0px 20px">
                {textA}
              </StyledBodyText>
            </StyledContentFlexbox>
          </StyledContentFlexbox>
          <StyledContentFlexbox>
            <StyledBodyText>
              {textA}
              <br />
              <br />
              {textB}
            </StyledBodyText>
          </StyledContentFlexbox>
        </StyledIntroContentContainer>
      </StyledIntroContainer>
    ),
  };

  const containerProps = { $id: id, $current: current, $tempCurrent: tempCurrent, $title: title };
  const renderLayout = layoutMap[layout];

  return renderLayout
    ? renderLayout({ containerProps, title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, $expandIntroText, imgA })
    : null;
}

export default IntroText