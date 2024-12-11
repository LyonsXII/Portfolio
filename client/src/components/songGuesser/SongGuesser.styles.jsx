import styled from 'styled-components';

import { slideInTopAnimation, slideInLeftAnimation, slideOutUpAnimation, slideOutRightAnimation } from '../../context/Animations';

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
  overflow: hidden;
`;

export const StyledGameContainer = styled.div`
  height: 100%;
  width: 100%;
  margin-top: -2vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const StyledChoiceGrid = styled.div`
  height: 20%;
  width: 80%;
  margin-top: 3vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  gap: 25px;
`;

export const StyledTextBox = styled.div`
  height: 25%;
  display: flex;
  align-items: center;
  animation: ${ slideInLeftAnimation };
`;

export const StyledButton = styled.button`
  height: 100%;
  width: 100%;
  padding: 15px 0px;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 10px;
  border: 4px solid black;
  grid-column-start: ${({ $start }) => $start ? $start : "auto"};
  grid-column-end: ${({ $end }) => $end ? $end : "auto"};
  grid-column: ${({ $columns }) => $columns};
  grid-row: ${({ $rows }) => $rows};
  color: ${({ theme }) => theme.textColor};
  box-shadow: ${({ $name, $section }) => $name === $section ? "0px 0px 8px antiquewhite" : "0px 0px 10px black"};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
  }
`;

export const StyledChoiceButton = styled.button`
  padding: 15px 30px;
  word-wrap: break-word;
  white-space: normal;
  letter-spacing: 1px;
  border-radius: 10px;
  border: 4px solid black;
  transition: margin 10s ease;
  color: ${({ theme }) => theme.textColor};
  box-shadow: 0px 0px 10px black;
  background-color: ${({ $showAnswer, $correct, theme }) => 
    $showAnswer ? 
      $correct ? "green" : "red"
      : theme.primaryColor
  };
  
  &:hover {
    color: ${({ theme }) => theme.tertiaryColor};
    background-color: ${({ $showAnswer, theme }) => $showAnswer === false ? theme.secondaryColor : null};
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
`;

export const StyledScoreIncrement = styled.div`
  height: calc(100vh / 20);
  border-bottom: 4px solid black;
  background-color: ${({ $current, theme }) => $current === "true" ? theme.secondaryColor : theme.primaryColor};
`

export const StyledScoreBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledVideoMainContainer = styled.div`
  height: 60%;
  width: 70%;
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
  box-shadow: 0px 0px 10px black;

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
  background-color: ${({ theme }) => theme.primaryColor};
`;

export const StyledVideoTextContainer = styled.div`
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

export const StyledMainTitle = styled.h1`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 8rem;
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