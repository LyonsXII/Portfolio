import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const StyledButton = styled.button`
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

function SongGuesserChoice({ name, correct, showAnswer, onClick }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  function handleOnClick() {
    onClick(correct);
    clickSound();
  }

  return (
    <StyledButton theme={theme} $correct={correct} $showAnswer={showAnswer} onClick={() => {handleOnClick()}}>
      <h3>{name}</h3>
    </StyledButton>
  )
}

export default SongGuesserChoice