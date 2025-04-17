import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { StyledIntroContentContainer, StyledContentFlexbox, StyledContentInteriorFlexbox, StyledTitle, StyledMinorTitle, StyledBodyText, StyledImage, StyledTitleFlexbox, StyledTitleContainer, StyledTitleButtonContainer, StyledIntroButtonContainer, StyledButtonsContainer, StyledIntroContainer, StyledSVG, StyledNextIcon } from "./Introduction.styles";

function IntroText({ id, title, textA, textB, textC, textD, layout, current, tempCurrent, changeSection, $expandIntroText, imgA }) {
  const { theme } = useContext(ThemeContext);

  if (current != id) {return null}

  const layoutMap = {
    A: ({ containerProps, title, theme, textA, textB, textC, textD, changeSection, imgA, $expandIntroText, current }) => (
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
            <StyledBodyText>
              {textC}
            </StyledBodyText>
            <StyledImage $height="100" $width="60" src={imgA}/>
          </StyledContentFlexbox>
        </StyledIntroContentContainer>
      </StyledIntroContainer>
    ),
    B: ({ containerProps, title, theme, textA, textB, textC, textD, changeSection, imgA, $expandIntroText, current }) => (
      <StyledIntroContainer {...containerProps} $expandIntroText={$expandIntroText} $current={current}>
        <StyledTitleFlexbox theme={theme}>
          <StyledTitleContainer>
            <StyledTitle>{title}</StyledTitle>
          </StyledTitleContainer>
          <StyledTitleButtonContainer theme={theme} onClick={changeSection} data-title={title}>
            <StyledNextIcon/>
          </StyledTitleButtonContainer>
        </StyledTitleFlexbox>

      <StyledIntroContentContainer $flexDirection="row">
        <StyledContentFlexbox $flexDirection="column" $width="50%">
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
        <StyledContentFlexbox $flexDirection="column" $width="50%">
          <StyledImage $height="50%" $width="100%" src={imgA}/>
          <StyledImage $height="50%" $width="100%" src={imgA}/>
        </StyledContentFlexbox>
      </StyledIntroContentContainer>
    </StyledIntroContainer>
    ),
    C: ({ containerProps, title, theme, textA, $expandIntroText }) => (
      <StyledIntroContainer {...containerProps} $expandIntroText={$expandIntroText}>
        <StyledTitleFlexbox theme={theme}>
          <StyledTitleContainer>
            <StyledTitle>{title}</StyledTitle>
          </StyledTitleContainer>
          <StyledTitleButtonContainer theme={theme} onClick={changeSection} data-title={title}>
            <StyledNextIcon/>
          </StyledTitleButtonContainer>
        </StyledTitleFlexbox>
      </StyledIntroContainer>
    ),
  };

  const containerProps = { $id: id, $current: current, $tempCurrent: tempCurrent, $title: title };
  const renderLayout = layoutMap[layout];

  return renderLayout
    ? renderLayout({ containerProps, title, theme, textA, textB, textC, textD, changeSection, $expandIntroText, imgA })
    : null;
}

export default IntroText