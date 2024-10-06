import React, { useState, useContext } from "react";
import styled, { keyframes, css } from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const slideInLeft = keyframes`
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutRight = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(1000px);
    opacity: 0;
  }
`;

const StyledContainer = styled.div`
  height: 50%;
  width: 70%;
  margin-bottom: -2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 20px;
  box-shadow: 0px 0px 10px black;

  animation: ${({ $animationState }) => 
    $animationState === "Enter" 
      ? css`${slideInLeft} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both` 
      : css`${slideOutRight} 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both`
  };
`;

const StyledDivLeft = styled.div`
  height: 100%;
  width: calc(100% + 4px);
  border: 4px solid black;
  border-right: none;
  border-radius: 20px 0px 0px 20px;
`;

const StyledIframe = styled.iframe`
  border: none;
  border-radius: 16px 0px 0px 16px;
  width: 100%;
  height: calc(100% + 0px); // Adding 0.5px avoids subpixel gap, something to do with subpixel rendering?
  margin-top: 0px;
`;

const StyledDivRight = styled.div`
  height: 100%;
  width: 6%;
  border: 4px solid black;
  border-radius: 0px 20px 20px 0px;
`;

const StyledButton = styled.div`
  height: calc(50% - 2px);
  width: 100%;
  border-bottom: 4px solid black;
  border-radius: ${({ $position }) => $position === "Top" ? "0px 20px 0px 0px" : "0px 0px 20px 0px"};
  background-color: ${({ theme }) => theme.primaryColor};
`;

function SongGuesserVideo({ url, nextQuestion, playSong }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  const [animationState, setAnimationState] = useState("Enter");

  function handleNextQuestion() {
    setAnimationState("Exit");
    clickSound();
    setTimeout(() => {
      nextQuestion();
    }, 500);
  }

  function handlePlaySong() {
    playSong();
    clickSound();
  }

  return (
    <StyledContainer theme={theme} $animationState={animationState} >
      <StyledDivLeft>
        <StyledIframe src={url}/>
      </StyledDivLeft>
      <StyledDivRight>
        <StyledButton theme={theme} $position="Top" onClick={handleNextQuestion}/>
        <StyledButton theme={theme} onClick={handlePlaySong}/>
      </StyledDivRight>
    </StyledContainer>
  )
}

export default SongGuesserVideo