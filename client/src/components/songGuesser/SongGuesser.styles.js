import { styled, css, createGlobalStyle } from 'styled-components';

import { media } from '../../context/media';

import { flicker, flickerGameOver, fadeInFastAnimation, fadeInSlowAnimation, fadeOutAnimation, slideOutLeftAnimation, slideOutRightAnimation, expandScoreBarAnimation } from "./SongGuesserAnimations";

import { slideInTopAnimation, slideInLeftAnimation, slideOutUpAnimation, slideInBottomAnimation } from '../../context/Animations';

import ReplayIcon from "../../icons/replay.svg?react";
import ReplayShadowIcon from "../../icons/replay-shadow.svg?react";
import NextSongIcon from "../../icons/nextSong.svg?react";

export const StyledSongGuesserContainer = styled.div`
  height: 100dvh;
  width: 100dvw;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${({ $transition } ) => !$transition ? slideInTopAnimation : slideOutLeftAnimation};
`;

export const StyledIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  overflow: hidden;

  ${media.mobile`
    width: 100dvw;
  `}

  ${media.desktop`
    width: 88dvw;
  `}
`;

export const StyledIntroFlexbox = styled.div`
  display: flex;
  width: 90%;
  margin-top: 8dvh;

  ${media.mobile`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 55dvh;
    gap: 30px;
  `}

  ${media.desktop`
    align-items: center;
    justify-content: center;
  `}
`;

export const StyledIntroGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);

  ${media.mobile`
    height: ${({ $mobileHeight }) => $mobileHeight};
    gap: 10px;
  `}

  ${media.desktop`
    margin-left: ${({ $position }) => $position === "First" ? null : "4%"};
    gap: 20px;
  `}
`;

export const StyledGameFlexboxContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const StyledGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;

  ${media.mobile`
    justify-content: flex-end;
  `}

  ${media.desktop`
    justify-content: center;
  `}
`;

export const StyledChoiceGrid = styled.div`
  justify-content: center;
  align-items: center;

  ${media.mobile`
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 35%;
    width: calc(100% - 60px);
    margin-bottom: 50px;
  `}

  ${media.desktop`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    gap: 1rem;
    width: 75%;
    max-width: 1400px;
    margin-top: ${({ $showAnswer }) => $showAnswer ? "40px" : "5%"};
  `}
`;

export const StyledTextContainer = styled.div`
  animation: ${({ $showAnswerExit}) => !$showAnswerExit ? slideInLeftAnimation : slideOutRightAnimation};

  ${media.mobile`
    height: 30%;
    display: flex;
    align-items: center;
    width: 90%;
    margin-top: 30px;
  `}

  ${media.desktop`
    height: fit-content;
    width: 75%;
  `}
`;

export const StyledIcon = styled.svg`
  height: 15dvh;
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
  background-color: ${({ $name, $section, theme }) => $name === $section ? theme.secondaryColor : theme.primaryColor};
  border-radius: 10px;
  border: 4px solid black;
  cursor: pointer;
  grid-column-start: ${({ $start }) => $start || "auto"};
  grid-column-end: ${({ $end }) => $end || "auto"};
  color: ${({ theme }) => theme.textColor};
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  cursor: pointer;


  ${media.mobile`
    grid-column: ${({ $columnsMobile }) => $columnsMobile || "span 4"};
    grid-row: ${({ $rowsMobile }) => $rowsMobile || "span 2"};
    padding: 5px 0px;
  `}

  ${media.desktop`
    grid-column: ${({ $columnsDesktop }) => $columnsDesktop || "span 6"};
    grid-row: ${({ $rowsDesktop }) => $rowsDesktop || "span 2"};
    padding: 15px 5px;

    &:hover {
      background-color: ${({ theme }) => theme.secondaryColor};
      transform: scale(1.01);
      transition: transform 0.2s ease, background-color 0.8s ease;
    }
  `}
`;

export const StyledChoiceButton = styled.button`
  height: 100%;
  width: 100%;
  word-wrap: break-word;
  white-space: normal;
  letter-spacing: 1px;
  border-radius: 10px;
  border: 4px solid black;
  color: ${({ theme }) => theme.textColor};
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(7, 3, 3, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  background-color: ${({ $showAnswer, $correct, theme }) => 
    $showAnswer ? 
      $correct ? "green" : "red"
      : theme.primaryColor
  };
  cursor: pointer;
  
  ${media.mobile`
    padding: 10px 20px;
  `}

  ${media.desktop`
    padding: 15px 30px;

    &:hover {
      color: ${({ $showAnswer, theme }) => $showAnswer ? theme.textColor : theme.tertiaryColor};
      background-color: ${({ $showAnswer, theme }) => $showAnswer === false ? theme.secondaryColor : null};
      box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3),
                  inset 0 2px 4px rgba(255, 255, 255, 0.3), 
                  inset 0 -4px 4px rgba(0, 0, 0, 0.6);
      transform: scale(1.01);
      transition: transform 0.2s ease, background-color 0.8s ease;
    }
  `}
`;

export const StyledScoreWrapper = styled.div`
  ${media.desktop`
    visibility: ${({ $display }) => $display ? "auto" : "hidden"};
    animation: ${({ $display }) => $display && expandScoreBarAnimation}
  `}
`

export const StyledScoreFlexbox = styled.div`
  display: flex;
  border-right: 4px solid black;
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.8);

  ${media.mobile`
    position: absolute;
    top: 30px;
    left: 100px;
    height: 30px;
    width: calc(100dvw - 130px);
    border: 3px solid black;
    border-radius: 10px;
    overflow: hidden;
  `}

  ${media.desktop`
    flex-direction: column;
    height: 100dvh;
    width: 3dvw;
    min-width: 50px;
  `}
`;

export const StyledScoreIncrement = styled.div`
  ${media.mobile`
    width: 100%;
    border-right: 3px solid black;
    ${({ $mode, $transition, $numQuestions }) => {
      if ($mode === "0") return `max-width: calc(100% / (${$numQuestions} - 4));`
      else if ($mode === "1") {
        if ($transition) {
          return `max-width: calc(100% / (${$numQuestions} - 4));`
        } else {
          return "max-width: 100%; border-right: none;"
        }
      }
      else if ($mode === "2") {
        if ($transition) {
          return "max-width: 100%; border-right: none;"
        } else {
          return "max-width: 0%; border-right: none;"
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
    
    transition: ${({ $transition }) => $transition ? "max-width 1s ease" : "max-width 0s ease"};
  `}

  ${media.desktop`
    height: 100%;
    border-bottom: 4px solid black;
    ${({ $mode, $transition, $numQuestions }) => {
      if ($mode === "0") return `max-height: calc(100% / (${$numQuestions} - 4));`
      else if ($mode === "1") {
        if ($transition) {
          return `max-height: calc(100% / (${$numQuestions} - 4));`
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
  `}
`

export const StyledVideoMainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;

  animation: ${({ $showAnswerExit}) => !$showAnswerExit ? slideInLeftAnimation : slideOutRightAnimation};

  ${media.mobile`
    justify-content: flex-end;
    align-items: center;
    flex: 1 1 auto;
    max-height: calc(65% - 140px);
    width: 80%;
    margin-top: 100px;
    margin-bottom: 10px;
  `}

  ${media.desktop`
    justify-content: center;
    align-items: center;
    height: 60%;
    max-height: 600px;
    width: 70%;
    max-width: 1200px;
  `}
`;

export const StyledVideoContainer = styled.div`
  height: calc((100dvw / 16) * 9);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 4px solid black;
  background-color: black;
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.6);
  
  ${media.mobile`
    flex-direction: column;
  `}

  ${media.desktop`
    overflow: hidden;
  `}
`;

export const StyledVideoDivLeft = styled.div`
  ${media.mobile`
    height: 100%;
    width: 100%;
    border-radius: 16px 16px 0px 0px;
    overflow: hidden;
  `}

  ${media.desktop`
    flex: 1 1 auto;
    height: 100%;
    width: calc(100% + 4px);
    border-radius: 16px 0px 0px 16px;
    overflow: hidden;
  `}
`;

export const StyledIframe = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
`;

export const StyledVideoDivRight = styled.div`
  ${media.mobile`
    display: flex;
    height: 40px;
    width: 100%;
    border-top: 4px solid black;
    border-radius: 0px 0px 20px 20px;
  `}

  ${media.desktop`
    flex: 0 0 auto;
    height: 100%;
    border-left: 4px solid black;
    border-radius: 0px 20px 20px 0px;
  `}
`;

export const StyledVideoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);
  background-color: ${({ theme }) => theme.primaryColor};
  cursor: pointer;

  ${media.mobile`
    height: 100%;
    width: 50%;
    border-right: ${({ $position }) => $position === "Top" ? "4px solid black" : "none"};
    border-radius: ${({ $position }) => $position === "Top" ? "0px 0px 0px 16px" : "0px 0px 16px 0px"};
  `}

  ${media.desktop`
    height: calc(50% - 2px);
    width: 60px;
    border-bottom: 4px solid black;
    border-radius: ${({ $position }) => $position === "Top" ? "0px 20px 0px 0px" : "0px 0px 20px 0px"};

    &:hover {
      background-color: ${({ theme }) => theme.secondaryColor};
      color: ${({ theme }) => theme.tertiaryColor};
    }
  `}
`;

export const StyledVideoTextContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  position: relative;

  ${media.mobile`
    flex: 0 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    max-width: 100%;
    overflow: hidden;
  `}

  ${media.desktop`
    flex: 0 0 auto;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    column-gap: 40px;
  `}
`;

export const StyledVideoTextBox = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 0px;
  box-sizing: border-box;

  ${media.mobile`
    flex: ${({ $position }) => $position === "first" ? "0 1 auto" : "0 0 auto"};
    width: 80dvw;
    min-width: ${({ $position }) => $position === "first" ? "0px" : "fit-content"};
    margin-top: ${({ $position }) => $position === "first" ? "0px" : "-10px"};
    overflow: ${({ $position }) => $position === "first" ? "hidden" : "visible"};
  `}

  ${media.desktop`
    flex: ${({ $position }) => $position === "first" ? "0 1 auto" : "0 0 auto"};
    width: auto;
    min-width: 400px;
    margin-bottom: ${({ $position }) => $position === "first" ? "0px" : "8px"};
    overflow: ${({ $position }) => $position === "first" ? "hidden" : "visible"};
  `}
`;

export const StyledGameOverBackdrop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100dvh;
  width: 100dvw;
  background-color: black;
  box-sizing: border-box; 
  z-index: 4;
  opacity: 0.9;
  cursor: pointer;

  animation: ${({ $gameOverExit }) => 
    !$gameOverExit
      ? fadeInFastAnimation
      : fadeOutAnimation
  };

  ${media.mobile`
    gap: 10px;
  `}

  ${media.desktop`
    gap: 40px;
    padding: 10%;
  `}
`;

export const StyledMainTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  ${media.mobile`
    flex-direction: ${({ $mode }) => $mode === "Game Over" ? "row" : "column"};
    gap: 10px;
  `}

  ${media.desktop`
    flex-wrap: wrap;
    column-gap: 40px;
  `}
`;

export const StyledMainTitleWord = styled.div`
  display: flex;

  ${media.mobile`
    flex-direction: ${({ $mode }) => $mode === "Game Over" ? "column" : "row"};
    justify-content: flex-start;
    align-items: center;
    width: ${({ $mode, $position }) => $position === "first" && !$mode ? "75%" : "100%"};
    margin-top: ${({ $mode, $position }) => {
      if ($position === "first" && $mode === "Game Over") return "-5dvh";
      if ($position != "first" && $mode === "Game Over") return "5dvh";
      return "0%";
    }};
    margin-left: ${({ $mode, $position }) => {
      if ($mode === "Game Over" && $position !== "first") return "10dvw";
      if (!$mode && $position === "first") return "25%";
      return "0%";
    }};
  `}

  ${media.desktop`
    width: fit-content;
  `}
`

export const StyledMainTitleLetter = styled.h1`
  font-family: "Liberty";
  color: ${({ theme }) => theme.tertiaryColor};
  text-shadow: 
    3px 3px 6px #000,
    -3px -3px 6px #000,  
    3px -3px 6px #000,
    -3px 3px 6px #000,
    3px 3px 6px #000,
    0 0 2rem rgb(255, 255, 255);

  ${({ $gameOver, $gameOverAnimation }) =>
    $gameOver && $gameOverAnimation === "Entrance" && css`
      animation: ${fadeInSlowAnimation};
  `}

  ${({ $gameOver, $gameOverAnimation }) =>
    $gameOver && $gameOverAnimation === "Exit" && css`
      animation: ${fadeOutAnimation};
  `}

  ${media.mobile`
    font-size: 4rem;

  ${({ $index, $faulty, $mode, theme }) =>
    Array.isArray($faulty) && $faulty.includes($index) && css`
      color: ${theme.primaryColor};
      text-shadow: 
        3px 3px 6px #000,
        -3px -3px 6px #000,  
        3px -3px 6px #000,
        -3px 3px 6px #000,
        3px 3px 6px #000,
        0 0 2rem rgb(0, 0, 0);
      transform:  ${$mode != "Game Over" 
        ? "translate(-0.2rem, 1rem) rotate(10deg)"
        : "none"};
      animation: ${$mode === "Game Over"
        ? flickerGameOver(theme.tertiaryColor)
        : flicker(theme.tertiaryColor)} 2s ease-in-out infinite alternate;
    `}
  `}

  ${media.desktop`
    font-size: 10rem;

    ${({ $index, $faulty }) =>
    Array.isArray($faulty) && $faulty.includes($index) && css`
      color: ${({ theme }) => theme.primaryColor};
      text-shadow: 
        3px 3px 6px #000,
        -3px -3px 6px #000,  
        3px -3px 6px #000,
        -3px 3px 6px #000,
        3px 3px 6px #000,
        0 0 2rem rgb(0, 0, 0);
      transform: translate(-0.2rem, 1rem) rotate(10deg);
      animation: ${({ theme }) => flicker(theme.tertiaryColor)} 2s ease-in-out infinite alternate;
    `}
  `}
`;


export const StyledHeaderTitle = styled.h2`
  text-align: center;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  color: ${({ theme }) => theme.fontColor};

  ${media.mobile`
    font-size: 4rem;
  `}

  ${media.desktop`
    font-size: 7rem;
  `}
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
  display: inline-block;
  white-space: nowrap;
  text-overflow: ${({ $ellipsis }) => $ellipsis ? "ellipsis" : "clip"};
  transform: translateX(0px);
  transition: transform linear;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);


  ${media.mobile`
    font-size: 2rem;
    padding: 5px;
    overflow: ${({ $ellipsis }) => $ellipsis ? "hidden" : "visible"};
  `}

  ${media.desktop`
    font-size: 4rem;
    padding: 5px 10px;
    overflow: ${({ $ellipsis }) => $ellipsis ? "hidden" : "visible"};
  `}
`;

export const StyledLargeText = styled.h3`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);


  ${media.mobile`
    font-size: 1.2rem;
  `}

  ${media.desktop`
    font-size: 2rem;
  `}
`;

export const StyledMinorTitle = styled.h4`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  white-space: nowrap;
  margin-bottom: 2px;
  padding: 0px 5px;

  ${media.mobile`
    font-size: 1.5rem;
  `}

  ${media.desktop`
    font-size: 2.5rem;
  `}
`;

export const StyledBodyText = styled.p`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 1.5rem;

  ${media.mobile`
    display: ${({ $visible }) => $visible ? "auto" : "none"};
  `}
`;

export const StyledGameOverText = styled.h1`
  font-family: "Liberty";
  color: ${({ theme }) => theme.tertiaryColor};

  animation: ${({ $gameOverAnimation }) => 
    $gameOverAnimation === "Enter"
      ? fadeInSlowAnimation
      : fadeOutAnimation
  };

  ${media.mobile`
    position: absolute;
    bottom: 40px;
    left: 20px;
    font-size: 2rem;
  `}

  ${media.desktop`
    font-size: 4rem;
    text-shadow: 
      3px 3px 6px #000,
      -3px -3px 6px #000,  
      3px -3px 6px #000,
      -3px 3px 6px #000,
      3px 3px 6px #000,
      0 0 2rem rgb(255, 255, 255);
  `}
`

export const StyledIconContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: ${({ $height }) => $height || "40px"};
  width: ${({ $width }) => $width || "40px"};

  ${media.mobile`
    height: 4rem;
    width: 4rem;
  `}

  ${media.desktop`
    height: 8rem;
    width: 8rem;
  `}
`

const createStyledIcon = (IconComponent) => styled(IconComponent)`
  transition: transform 0.4s;
  cursor: pointer;
  -webkit-filter: ${({ $shadow }) => $shadow ? "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))" : "none"};
  filter: ${({ $shadow }) => $shadow ? "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))" : "none"};
  vertical-align: bottom;

  ${media.mobile`
    height: ${({ $heightMobile }) => $heightMobile || "auto"};
    width: ${({ $widthMobile }) => $widthMobile || "auto"};
    margin-left: 10px;
  `}

  ${media.desktop`
    height: ${({ $heightDesktop }) => $heightDesktop || "auto"};
    width: ${({ $widthDesktop }) => $widthDesktop || "auto"};
    margin-left: ${({ $marginLeftDesktop }) => $marginLeftDesktop || "0px"};

    &:hover {
      transform: scale(1.1);
    }
  `}
`;

export const StyledReplayIcon = createStyledIcon(ReplayIcon);
export const StyledReplayShadowIcon = createStyledIcon(ReplayShadowIcon);
export const StyledNextSongIcon = createStyledIcon(NextSongIcon);