import React, { useContext } from "react";
import styled, { keyframes } from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const swingInTopFwd = keyframes`
  0% {
    transform: rotateX(-100deg);
    transform-origin: top;
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    transform-origin: top;
    opacity: 1;
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

	animation: ${swingInTopFwd} 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
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

  function handleNextQuestion() {
    nextQuestion();
    clickSound();
  }

  function handlePlaySong() {
    playSong();
    clickSound();
  }

  return (
    <StyledContainer theme={theme}>
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