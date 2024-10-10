import React, { useState, useContext } from "react";
import styled, { keyframes, css } from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";
import { slideInLeftAnimation, slideOutUpAnimation, slideOutRightAnimation } from '../../context/Animations';

const StyledContainer = styled.div`
  height: 60%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledVideoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 20px;
  box-shadow: 0px 0px 10px black;

  animation: ${({ $animationState }) => 
    $animationState === "Enter" 
      ? slideInLeftAnimation
      : slideOutRightAnimation
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

const StyledTextContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 40px;
  margin-left: 2vw;

  animation: ${({ $animationState }) => 
    $animationState === "Enter" 
      ? slideInLeftAnimation
      : slideOutRightAnimation
  };
`;

function SongGuesserVideo({ url, nextQuestion, playSong, name, property }) {
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
    <StyledContainer>
      <StyledVideoContainer theme={theme} $animationState={animationState}>
        <StyledDivLeft>
          <StyledIframe src={url}/>
        </StyledDivLeft>
        <StyledDivRight>
          <StyledButton theme={theme} $position="Top" onClick={handleNextQuestion}/>
          <StyledButton theme={theme} onClick={handlePlaySong}/>
        </StyledDivRight>
      </StyledVideoContainer>
      <StyledTextContainer $animationState={animationState}>
        <h3 style={{fontSize: "3.5rem"}}>{name}</h3>
        <h4 style={{fontSize: "2.5rem", marginBottom: "2px"}}>{property}</h4>
      </StyledTextContainer>
    </StyledContainer>
  )
}

export default SongGuesserVideo