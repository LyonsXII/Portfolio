import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

import { StyledVideoMainContainer, StyledVideoContainer, StyledVideoDivLeft, StyledIframe, StyledVideoDivRight, StyledVideoButton, StyledVideoTextContainer, StyledSubTitle, StyledMinorTitle } from "./SongGuesser.styles";

function SongGuesserVideo({ url, nextQuestionButton, playSong, name, property }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  const [animationState, setAnimationState] = useState("Enter");

  function handleNextQuestionButton() {
    setAnimationState("Exit");
    clickSound();
    setTimeout(() => {
      nextQuestionButton();
    }, 500);
  }

  function handlePlaySong() {
    playSong();
    clickSound();
  }

  return (
    <StyledVideoMainContainer>
      <StyledVideoContainer theme={theme} $animationState={animationState}>
        <StyledVideoDivLeft>
          <StyledIframe src={url}/>
        </StyledVideoDivLeft>
        <StyledVideoDivRight>
          <StyledVideoButton theme={theme} $position="Top" onClick={handleNextQuestionButton}/>
          <StyledVideoButton theme={theme} onClick={handlePlaySong}/>
        </StyledVideoDivRight>
      </StyledVideoContainer>
      <StyledVideoTextContainer $animationState={animationState}>
        <StyledSubTitle>{name}</StyledSubTitle>
        <StyledMinorTitle style={{marginBottom: "2px"}}>{property}</StyledMinorTitle>
      </StyledVideoTextContainer>
    </StyledVideoMainContainer>
  )
}

export default SongGuesserVideo