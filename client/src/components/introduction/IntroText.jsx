import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import IntroImage from "./IntroImage";
import IntroLayoutA from "./IntroLayoutA";
import IntroLayoutB from "./IntroLayoutB";
import IntroLayoutC from "./IntroLayoutC";

import { StyledIntroContentContainer, StyledContentFlexbox, StyledContentInteriorFlexbox, StyledTitle, StyledMinorTitle, StyledBodyText, StyledImageWrapper, StyledShadowOverlay, StyledImage, StyledTitleFlexbox, StyledTitleContainer, StyledTitleButtonContainer, StyledButtonsContainer, StyledIntroContainer, StyledSVG, StyledNextIcon } from "./Introduction.styles";

function IntroText({ id, title, textA, textB, textC, textD, textImgA, textImgB, layout, reverse, links, current, tempCurrent, changeSection, expandIntroText, imgA }) {
  const { theme } = useContext(ThemeContext);

  if (current != id) {return null}

  const layoutMap = {
    A: ({ id, title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, expandIntroText, current, tempCurrent, reverse }) => (
      <IntroLayoutA
        id={id}
        title={title}
        theme={theme}
        textA={textA}
        textB={textB}
        textC={textC}
        textD={textD}
        textImgA={textImgA}
        textImgB={textImgB}
        changeSection={changeSection}
        imgA={imgA}
        expandIntroText={expandIntroText}
        current={current}
        tempCurrent={tempCurrent}
        reverse={reverse}
      />
    ),
    B: ({ id, title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, expandIntroText, current, tempCurrent, reverse, links }) => (
      <IntroLayoutB
        id={id}
        title={title}
        theme={theme}
        textA={textA}
        textB={textB}
        textC={textC}
        textD={textD}
        textImgA={textImgA}
        textImgB={textImgB}
        changeSection={changeSection}
        imgA={imgA}
        expandIntroText={expandIntroText}
        current={current}
        tempCurrent={tempCurrent}
        reverse={reverse}
        links={links}
      />
    ),
    C: ({ id, title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, expandIntroText, current, tempCurrent, reverse }) => (
      <IntroLayoutC
        id={id}
        title={title}
        theme={theme}
        textA={textA}
        textB={textB}
        textC={textC}
        textD={textD}
        textImgA={textImgA}
        textImgB={textImgB}
        changeSection={changeSection}
        imgA={imgA}
        expandIntroText={expandIntroText}
        current={current}
        tempCurrent={tempCurrent}
        reverse={reverse}
      />
    ),
  };

  const renderLayout = layoutMap[layout];

  return renderLayout
    ? renderLayout({ id, title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, expandIntroText, current, tempCurrent, reverse, links })
    : null;
}

export default IntroText