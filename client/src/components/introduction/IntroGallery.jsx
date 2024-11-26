import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledGalleryContainer, StyledGallery, StyledInput, StyledGalleryImage } from "./Introduction.styles";

import { ThemeContext } from "../../context/ThemeContext";

function IntroGallery({ imageChoice, toggleShowSubTitle, galleryAnimationComplete, toggleExpandIntroText }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledGalleryContainer>
      <StyledGallery>
        <StyledInput theme={theme} type="checkbox" onMouseOver={galleryAnimationComplete ? toggleShowSubTitle : null} onClick={toggleExpandIntroText}/>
        <StyledGalleryImage theme={theme} src="https://picsum.photos/id/1028/300/300" alt="a forest after an apocalypse" data-id="1" onClick={imageChoice}/>
        <StyledGalleryImage theme={theme} src="https://picsum.photos/id/15/300/300" alt="a waterfall and many rocks" data-id="2" onClick={imageChoice}/>
        <StyledGalleryImage theme={theme} src="https://picsum.photos/id/1040/300/300" alt="a house on a mountain" data-id="3" onClick={imageChoice}/>
        <StyledGalleryImage theme={theme} src="https://picsum.photos/id/106/300/300" alt="sime pink flowers" data-id="4" onClick={imageChoice}/>
        <StyledGalleryImage theme={theme} src="https://picsum.photos/id/136/300/300" alt="big rocks with some trees" data-id="5" onClick={imageChoice}/>
        <StyledGalleryImage theme={theme} src="https://picsum.photos/id/1039/300/300" alt="a waterfall, a lot of tree and a great view from the sky" data-id="6" onClick={imageChoice}/>
        <StyledGalleryImage theme={theme} src="https://picsum.photos/id/110/300/300" alt="a cool landscape" data-id="7" onClick={imageChoice}/>
        <StyledGalleryImage theme={theme} src="https://picsum.photos/id/1047/300/300" alt="inside a town between two big buildings" data-id="8" onClick={imageChoice}/>
        <StyledGalleryImage theme={theme} src="https://picsum.photos/id/1057/300/300" alt="a great view of the sea above the mountain" data-id="9" onClick={imageChoice}/>
      </StyledGallery>
    </StyledGalleryContainer>
  )
}

export default IntroGallery