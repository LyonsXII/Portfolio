import styled, { css, createGlobalStyle } from 'styled-components';

import { flicker, fadeInFastAnimation, fadeInSlowAnimation, fadeOutFastAnimation, fadeOutSlowAnimation } from "./SongGuesserAnimations";

import { slideInTopAnimation, slideInLeftAnimation, slideOutUpAnimation, slideOutRightAnimation, slideInBottomAnimation } from '../../context/Animations';

import ReplayIcon from "../../icons/replay.svg?react";
import ReplayShadowIcon from "../../icons/replay-shadow.svg?react";
import NextSongIcon from "../../icons/nextSong.svg?react";

export const StyledSongGuesserContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${({ $transition } ) => !$transition ? slideInTopAnimation : slideOutRightAnimation};
`;

export const StyledIntroContainer = styled.div`
  height: 100vh;
  width: 88vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const StyledIntroFlexbox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8vh;
`;

export const StyledIntroGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  margin-left: ${({ $position }) => $position === "First" ? null : "4%"};
  gap: 20px;
`;

export const StyledGameFlexboxContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const StyledEndGameButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  position: absolute;
  top: 40px;
  left: ${({ $mode }) => $mode === "Regular" ? "calc(3vw + 44px)" : "40px" };
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 20px;
  border: 4px solid black;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(7, 3, 3, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    transform: scale(1.01);
    transition: transform 0.2s ease, background-color 0.8s ease;
  }
`;

export const StyledEndGameIcon = styled.img`
  width: 90%;
  transition: transform 0.5s ease-in-out;

  &:hover {
    transform: rotate(-36deg);
  }
`

export const StyledGameContainer = styled.div`
  height: 100%;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const StyledChoiceGrid = styled.div`
  width: 80%;
  max-width: 1400px;
  margin-top: 3vh;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: auto;
  gap: 1rem;
`;

export const StyledTextContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 120px;
  gap: 20px;
  animation: ${ slideInLeftAnimation };
`;

export const StyledIcon = styled.svg`
  height: 15vh;
  cursor: pointer;

  path {
    stroke: black;
    fill: antiquewhite;
  }

  &:hover {
    transform: scale(1.02);
    transition: transform 0.4 ease;
  }
`;

export const StyledButton = styled.button`
  height: 100%;
  width: 100%;
  padding: 15px 0px;
  background-color: ${({ $name, $section, theme }) => $name === $section ? theme.secondaryColor : theme.primaryColor};
  border-radius: 10px;
  border: 4px solid black;
  cursor: pointer;
  grid-column-start: ${({ $start }) => $start ? $start : "auto"};
  grid-column-end: ${({ $end }) => $end ? $end : "auto"};
  grid-column: ${({ $columns }) => $columns};
  grid-row: ${({ $rows }) => $rows};
  color: ${({ theme }) => theme.textColor};
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    transform: scale(1.01);
    transition: transform 0.2s ease, background-color 0.8s ease;
  }
`;

export const StyledChoiceButton = styled.button`
  height: 100%;
  width: 100%;
  padding: 15px 30px;
  word-wrap: break-word;
  white-space: normal;
  letter-spacing: 1px;
  border-radius: 10px;
  border: 4px solid black;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor};
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(7, 3, 3, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  background-color: ${({ $showAnswer, $correct, theme }) => 
    $showAnswer ? 
      $correct ? "green" : "red"
      : theme.primaryColor
  };
  
  &:hover {
    color: ${({ $showAnswer, theme }) => $showAnswer ? theme.textColor : theme.tertiaryColor};
    background-color: ${({ $showAnswer, theme }) => $showAnswer === false ? theme.secondaryColor : null};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3),
                inset 0 2px 4px rgba(255, 255, 255, 0.3), 
                inset 0 -4px 4px rgba(0, 0, 0, 0.6);
    transform: scale(1.01);
    transition: transform 0.2s ease, background-color 0.8s ease;
  }
`;

export const StyledScoreFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 3vw;
  border-right: 4px solid black;
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.8);
`;

export const StyledScoreIncrement = styled.div`
  height: 100%;
  border-bottom: 4px solid black;
  ${({ $mode, $transition, $numQuestions }) => {
    if ($mode === "0") return `max-height: calc(100% / ${$numQuestions});`
    else if ($mode === "1") {
      if ($transition) {
        return `max-height: calc(100% / ${$numQuestions});`
      } else {
        return "max-height: 100%; border-bottom: none;"
      }
    }
    else if ($mode === "2") {
      if ($transition) {
        return "max-height: 100%; border-bottom: none;"
      } else {
        return "max-height: 0%; border-bottom: none;"
      }
    }
    return ""
  }}
  overflow: ${({ $current }) => $current ? "visible" : "hidden"};
  box-sizing: border-box;
  background-color: ${({ $current, theme }) => $current === "true" ? theme.secondaryColor : theme.primaryColor};
  box-shadow: inset 0 2px 4px rgba(7, 3, 3, 0.3), 
            inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  
  transition: ${({ $transition }) => $transition ? "max-height 1s ease" : "max-height 0s ease"};
`

export const StyledVideoMainContainer = styled.div`
  height: 60%;
  max-height: 600px;
  width: 70%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const StyledVideoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 20px;
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.6);

  animation: ${({ $animationState }) => 
    $animationState === "Enter" 
      ? slideInLeftAnimation
      : slideOutRightAnimation
  };
`;

export const StyledVideoDivLeft = styled.div`
  height: 100%;
  width: calc(100% + 4px);
  border: 4px solid black;
  border-right: none;
  border-radius: 20px 0px 0px 20px;
`;

export const StyledIframe = styled.iframe`
  border: none;
  border-radius: 16px 0px 0px 16px;
  width: 100%;
  height: calc(100% + 0px); // Adding 0.5px avoids subpixel gap, something to do with subpixel rendering?
  margin-top: 0px;
`;

export const StyledVideoDivRight = styled.div`
  height: 100%;
  width: 6%;
  border: 4px solid black;
  border-radius: 0px 20px 20px 0px;
`;

export const StyledVideoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(50% - 2px);
  width: 100%;
  border-bottom: 4px solid black;
  border-radius: ${({ $position }) => $position === "Top" ? "0px 20px 0px 0px" : "0px 0px 20px 0px"};
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  background-color: ${({ theme }) => theme.primaryColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
  }
`;

export const StyledVideoTextContainer = styled.div`
  width: calc(100% - 40px);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 40px;
  position: relative;
  overflow: hidden;

  animation: ${({ $animationState }) => 
    $animationState === "Enter" 
      ? slideInLeftAnimation
      : slideOutRightAnimation
  };
`;

export const StyledVideoTextBox = styled.div`
  position: relative;
  width: auto;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0px 4px;
  margin: 0px -4px;
  overflow: hidden;
`;

export const StyledGameOverBackdrop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100vh;
  width: 100vw;
  gap: 40px;
  background-color: black; 
  z-index: 4;
  opacity: 1;
  cursor: pointer;

  animation: ${({ $gameOverExit }) => 
    !$gameOverExit
      ? fadeInFastAnimation
      : fadeOutSlowAnimation
  };
`;

export const StyledMainTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 7rem;
`;

export const StyledMainTitleLetter = styled.h1`
  font-family: "Liberty";

  ${({ $index }) => ![2, 6, 10].includes($index) && css`
    color:${({ theme }) => theme.tertiaryColor};
    text-shadow: 
      3px 3px 6px #000,
      -3px -3px 6px #000,  
      3px -3px 6px #000,
      -3px 3px 6px #000,
      3px 3px 6px #000,
      0 0 2rem rgb(255, 255, 255);
  `}

  ${({ $index }) => [2, 6, 10].includes($index) && css`
    color:${({ theme }) => theme.primaryColor};
    text-shadow: 
      3px 3px 6px #000,
      -3px -3px 6px #000,  
      3px -3px 6px #000,
      -3px 3px 6px #000,
      3px 3px 6px #000,
      0 0 2rem rgb(0, 0, 0);
    transform: translate(-0.2rem, 1rem) rotate(10deg);
    animation: ${({ theme }) => {
      const textColour = theme.tertiaryColor; 
      return css`
        ${flicker(textColour)} 2s ease-in-out infinite alternate;
      `
    }};
    animation-delay: ${({ $index }) => `${0.2 * $index}s`};
  `}

  ${({ $index }) => 
    $index === 4 && css`
      margin-left: 40px;
    `}

    ${({ $gameOver, $gameOverExit }) => 
      $gameOver 
        ? css`animation: ${!$gameOverExit ? fadeInSlowAnimation : fadeOutFastAnimation};`
        : ''
    }
    
`

export const StyledHeaderTitle = styled.h2`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);

  font-size: 7rem;
  color: ${({ theme }) => theme.fontColor};
`;


export const StyledSubTitle = styled.h2`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 4rem;
`;

export const StyledSubTitleScrolling = styled.h2`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 4rem;
  white-space: nowrap;
  text-overflow: ${({ $ellipsis }) => $ellipsis ? "ellipsis" : "clip"};
  overflow: ${({ $ellipsis }) => $ellipsis ? "hidden" : "visible"};
  transform: translateX(0);
  transition: transform linear;
  display: inline-block;
`;

export const StyledLargeText = styled.h3`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 3rem;
`;

export const StyledMinorTitle = styled.h4`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 2.5rem;
  white-space: nowrap;
`;

export const StyledBodyText = styled.p`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 1.5rem;
`;

export const StyledGameOverText = styled.h1`
  font-family: "Liberty";
  font-size: 4rem;
  color: ${({ theme }) => theme.tertiaryColor};
  text-shadow: 
  3px 3px 6px #000,
  -3px -3px 6px #000,  
  3px -3px 6px #000,
  -3px 3px 6px #000,
  3px 3px 6px #000,
  0 0 2rem rgb(255, 255, 255);
`

const createStyledIcon = (IconComponent) => styled(IconComponent)`
  height: 100%;
  width: ${({ $width }) => $width || "auto"};
  transition: transform 0.4s;
  cursor: pointer;
  -webkit-filter: ${({ $shadow }) => $shadow ? "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))" : "none"};
  filter: ${({ $shadow }) => $shadow ? "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))" : "none"};

  &:hover {
    transform: scale(1.1);
  }
`;

export const StyledReplayIcon = createStyledIcon(ReplayIcon);
export const StyledReplayShadowIcon = createStyledIcon(ReplayShadowIcon);
export const StyledNextSongIcon = createStyledIcon(NextSongIcon);