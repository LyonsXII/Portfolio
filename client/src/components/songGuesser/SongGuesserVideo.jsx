import React, { useState, useEffect, useContext, useRef } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

import { StyledVideoMainContainer, StyledVideoContainer, StyledVideoDivLeft, StyledIframe, StyledVideoDivRight, StyledVideoButton, StyledVideoTextContainer, StyledVideoTextBox, StyledSubTitleScrolling, StyledMinorTitle, StyledNextSongIcon, StyledReplayIcon } from "./SongGuesser.styles";

function SongGuesserVideo({ url, nextQuestionButton, playSong, name, property, showAnswerExit }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  const [animationState, setAnimationState] = useState("Enter");

  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [ellipsis, setEllipsis] = useState(true);

  function handleNextQuestionButton() {
    clickSound();
    nextQuestionButton();
  }

  function handlePlaySong() {
    playSong();
    clickSound();
  }

  function scrollText() {
    if (!textRef.current) {return}
    setEllipsis(false);
    textRef.current.style.transitionDuration = `${animationDuration}s`; // Apply transition
    textRef.current.style.transitionTimingFunction = "linear"; // Ensure smooth scrolling
    // Trigger layout reflow before setting transform
    requestAnimationFrame(() => {
      textRef.current.style.transform = `translateX(-${textRef.current.scrollWidth - containerRef.current.offsetWidth}px)`;
    });
  }

  function scrollTextBack() {
    if (textRef.current) {
    setEllipsis(true);
    textRef.current.style.transform = 'translateX(0)';
    textRef.current.style.transitionDuration = '0.5s';
  }
  }

  // Calculate width of text and set animation duration if greater than text box
  useEffect(() => {
    if (textRef.current && containerRef.current) {
      // Calculate the scroll distance and duration dynamically
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const scrollDistance = textWidth - containerWidth;

      // Set the duration based on the text length (e.g., 50px per second)
      const duration = scrollDistance > 0 ? scrollDistance / 100 : 0; // Adjust speed (50px/sec)
      setAnimationDuration(duration);
    }
  }, [ellipsis]);

  return (
    <StyledVideoMainContainer $showAnswerExit={showAnswerExit}>
      <StyledVideoContainer theme={theme}>
        <StyledVideoDivLeft>
          <StyledIframe src={url}/>
        </StyledVideoDivLeft>
        <StyledVideoDivRight>
          <StyledVideoButton theme={theme} $position="Top" onClick={handleNextQuestionButton}>
            <StyledNextSongIcon $widthDesktop="80%" $heightMobile="80%" $marginLeft="0px"/>
          </StyledVideoButton >
          <StyledVideoButton theme={theme} onClick={handlePlaySong}>
            <StyledReplayIcon $widthDesktop="80%" $heightMobile="80%" $marginLeft="0px"/>
          </StyledVideoButton>
        </StyledVideoDivRight>
      </StyledVideoContainer>
      <StyledVideoTextContainer>
        <StyledVideoTextBox $position="first"
          ref={containerRef} 
          onMouseEnter={() => {scrollText()}}
          onClick={() => {
            scrollText();
            setTimeout(() => {scrollTextBack();}, (animationDuration * 1000) + 1000);
          }}
          onMouseLeave={() => {
            scrollTextBack();
          }}
        >
          <StyledSubTitleScrolling ref={textRef} $ellipsis={ellipsis}>
            {name}
          </StyledSubTitleScrolling>
        </StyledVideoTextBox>
        <StyledVideoTextBox>
          <StyledMinorTitle style={{marginBottom: "2px"}}>{property}</StyledMinorTitle>
        </StyledVideoTextBox>
      </StyledVideoTextContainer>
    </StyledVideoMainContainer>
  )
}

export default SongGuesserVideo