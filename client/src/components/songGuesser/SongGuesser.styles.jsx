import styled from 'styled-components';

import { slideInLeftAnimation } from '../../context/Animations';

export const StyledSongGuesserContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${() => slideInLeftAnimation};
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