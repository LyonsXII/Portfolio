import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledGalleryContainer, StyledGallery, StyledInput, StyledGalleryImage } from "./Introduction.styles";

function IntroductionGallery({ choiceSongGuesser, choiceFaraday, choiceBookNotes }) {

  return (
    <StyledGalleryContainer>
      <StyledGallery>
        <StyledInput type="checkbox"/>
        <StyledGalleryImage src="https://picsum.photos/id/1028/300/300" alt="a forest after an apocalypse" onClick={choiceSongGuesser}/>
        <StyledGalleryImage src="https://picsum.photos/id/15/300/300" alt="a waterfall and many rocks" onClick={choiceSongGuesser}/>
        <StyledGalleryImage src="https://picsum.photos/id/1040/300/300" alt="a house on a mountain" onClick={choiceSongGuesser}/>
        <StyledGalleryImage src="https://picsum.photos/id/106/300/300" alt="sime pink flowers" onClick={choiceFaraday}/>
        <StyledGalleryImage src="https://picsum.photos/id/136/300/300" alt="big rocks with some trees" onClick={choiceFaraday}/>
        <StyledGalleryImage src="https://picsum.photos/id/1039/300/300" alt="a waterfall, a lot of tree and a great view from the sky" onClick={choiceFaraday}/>
        <StyledGalleryImage src="https://picsum.photos/id/110/300/300" alt="a cool landscape" onClick={choiceBookNotes}/>
        <StyledGalleryImage src="https://picsum.photos/id/1047/300/300" alt="inside a town between two big buildings" onClick={choiceBookNotes}/>
        <StyledGalleryImage src="https://picsum.photos/id/1057/300/300" alt="a great view of the sea above the mountain" onClick={choiceBookNotes}/>
      </StyledGallery>
    </StyledGalleryContainer>
  )
}

export default IntroductionGallery