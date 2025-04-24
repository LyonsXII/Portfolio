import React, { useState, useEffect, useContext, useRef } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

import { StyledVideoMainContainer, StyledVideoContainer, StyledVideoDivLeft, StyledIframe, StyledVideoDivRight, StyledVideoButton, StyledVideoTextContainer, StyledVideoTextBox, StyledSubTitleScrolling, StyledMinorTitle } from "./SongGuesser.styles";

function SongGuesserVideo({ url, nextQuestionButton, playSong, name, property }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  const [animationState, setAnimationState] = useState("Enter");

  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [ellipsis, setEllipsis] = useState(true);

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
    <StyledVideoMainContainer>
      <StyledVideoContainer theme={theme} $animationState={animationState}>
        <StyledVideoDivLeft>
          <StyledIframe src={url}/>
        </StyledVideoDivLeft>
        <StyledVideoDivRight>
          <StyledVideoButton theme={theme} $position="Top" onClick={handleNextQuestionButton}>
            <img src="./icons/nextSong.svg" width="80%"/>
          </StyledVideoButton>
          <StyledVideoButton theme={theme} onClick={handlePlaySong}>
            <img src="./icons/replay.svg" width="80%"/>
          </StyledVideoButton>
        </StyledVideoDivRight>
      </StyledVideoContainer>
      <StyledVideoTextContainer $animationState={animationState}>
        <StyledVideoTextBox style={{flex: "0 1 auto"}}
          ref={containerRef} 
          onMouseEnter={() => {
            if (!textRef.current) {return}
            setEllipsis(false);
            textRef.current.style.transitionDuration = `${animationDuration}s`; // Apply transition
            textRef.current.style.transitionTimingFunction = "linear"; // Ensure smooth scrolling
            // Trigger layout reflow before setting transform
            requestAnimationFrame(() => {
              textRef.current.style.transform = `translateX(-${textRef.current.scrollWidth - containerRef.current.offsetWidth}px)`;
            });
          }}
          onMouseLeave={() => {
            if (textRef.current) {
              setEllipsis(true);
              textRef.current.style.transform = 'translateX(0)';
              textRef.current.style.transitionDuration = '0.5s';
            }
          }}
        >
          <StyledSubTitleScrolling ref={textRef} $ellipsis={ellipsis}>
            {name}
          </StyledSubTitleScrolling>
        </StyledVideoTextBox>
        <StyledVideoTextBox style={{flex: "0 0 auto", overflow: "visible"}}>
          <StyledMinorTitle style={{marginBottom: "2px"}}>{property}</StyledMinorTitle>
        </StyledVideoTextBox>
      </StyledVideoTextContainer>
    </StyledVideoMainContainer>
  )
}

export default SongGuesserVideo