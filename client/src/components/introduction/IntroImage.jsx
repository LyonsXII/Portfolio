import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledContentFlexbox, StyledImageWrapper, StyledImage, StyledShadowOverlay, StyledCaptionContainer, StyledBodyText } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroImage({ src, caption, width, margin, textPadding }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledContentFlexbox $flexDirection="column" $width={width} $gap="0px">
      <StyledImageWrapper>
        <StyledImage src={src}/>
        <StyledShadowOverlay/>
      </StyledImageWrapper>
      <StyledCaptionContainer theme={theme}>
        <StyledBodyText $padding={textPadding}>
          {caption}
        </StyledBodyText>
      </StyledCaptionContainer>
    </StyledContentFlexbox>
  )
}

export default IntroImage