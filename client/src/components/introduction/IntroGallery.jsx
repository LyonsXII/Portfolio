import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledGalleryContainer, StyledGallery, StyledInput, StyledGalleryImage } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroGallery({ imageChoice, toggleShowSubTitle, galleryAnimationComplete, toggleExpandIntroText, sectionData }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledGalleryContainer>
      <StyledGallery>
        <StyledInput theme={theme} type="checkbox" onMouseOver={galleryAnimationComplete ? toggleShowSubTitle : null} onClick={toggleExpandIntroText}/>
        {sectionData.map((section) => (
        <StyledGalleryImage
          theme={theme}
          key={section.id}
          src={section.imgA}
          alt="a forest after an apocalypse"
          data-id={section.id}
          onClick={imageChoice}
        />
      ))}
      </StyledGallery>
    </StyledGalleryContainer>
  )
}

export default IntroGallery