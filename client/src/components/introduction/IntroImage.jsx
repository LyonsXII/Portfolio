import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledContentFlexbox, StyledImageWrapper, StyledImage, StyledShadowOverlay, StyledCaptionContainer, StyledBodyText, StyledImageContainer } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroImage({ src, caption, width, position, textPadding, float }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledImageContainer $width={width} $position={position} $float={float}>
      <StyledImageWrapper>
        <StyledImage src={src}/>
        <StyledShadowOverlay/>
      </StyledImageWrapper>
      <StyledCaptionContainer theme={theme}>
        <StyledBodyText $padding={textPadding}>
          {caption}
        </StyledBodyText>
      </StyledCaptionContainer>
    </StyledImageContainer>
  )
}

export default IntroImage