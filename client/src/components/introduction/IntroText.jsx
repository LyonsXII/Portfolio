import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import IntroImage from "./IntroImage";
import IntroLayoutA from "./IntroLayoutA";
import IntroLayoutB from "./IntroLayoutB";
import IntroLayoutC from "./IntroLayoutC";

import { StyledIntroContentContainer, StyledContentFlexbox, StyledContentInteriorFlexbox, StyledTitle, StyledMinorTitle, StyledBodyText, StyledImageWrapper, StyledShadowOverlay, StyledImage, StyledTitleFlexbox, StyledTitleContainer, StyledTitleButtonContainer, StyledIntroButtonContainer, StyledButtonsContainer, StyledIntroContainer, StyledSVG, StyledNextIcon } from "./Introduction.styles";

function IntroText({ id, title, textA, textB, textC, textD, textImgA, textImgB, layout, reverse, links, current, tempCurrent, changeSection, $expandIntroText, imgA }) {
  const { theme } = useContext(ThemeContext);

  if (current != id) {return null}

  const layoutMap = {
    A: ({ title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, $expandIntroText, current, reverse }) => (
      <IntroLayoutA
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
        $expandIntroText={$expandIntroText}
        current={current}
        reverse={reverse}
      />
    ),
    B: ({ title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, $expandIntroText, current, reverse, links }) => (
      <IntroLayoutB
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
        $expandIntroText={$expandIntroText}
        current={current}
        reverse={reverse}
        links={links}
      />
    ),
    C: ({ title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, imgA, $expandIntroText, current, reverse }) => (
      <IntroLayoutC
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
        $expandIntroText={$expandIntroText}
        current={current}
        reverse={reverse}
      />
    ),
  };

  const renderLayout = layoutMap[layout];

  return renderLayout
    ? renderLayout({ title, theme, textA, textB, textC, textD, textImgA, textImgB, changeSection, $expandIntroText, imgA, reverse, links })
    : null;
}

export default IntroText