import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledGalleryContainer, StyledGallery, StyledInput, StyledGalleryImage } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroGallery({ imageChoice, toggleShowSubTitle, galleryAnimationComplete, current, toggleExpandIntroText, sectionData }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledGalleryContainer $current={current}>
      <StyledGallery>
        <StyledInput theme={theme} type="checkbox" onMouseOver={galleryAnimationComplete ? toggleShowSubTitle : null}  onClick={toggleExpandIntroText}/>
        {sectionData.map((section) => (
          <StyledGalleryImage
            theme={theme}
            key={section.id}
            src={section.imgA}
            alt={section.imgAAlt}
            data-id={section.id}
            onClick={imageChoice}
          />
        ))}
      </StyledGallery>
    </StyledGalleryContainer>
  )
}

export default IntroGallery