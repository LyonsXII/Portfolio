import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const StyledButton = styled.button`
  padding: 20px;
  word-wrap: break-word;
  white-space: normal;
  border-radius: 10px;
  border: 4px solid black;
  color: ${({ theme }) => theme.textColor};
  box-shadow: 0px 0px 10px black;
  background-color: ${({ $showAnswer, $correct, theme }) => 
    $showAnswer ? 
      $correct ? "green" : "red"
      : theme.primaryColor
  };

  &:hover {
    background-color: ${({ $showAnswer, theme }) => $showAnswer === false ? theme.secondaryColor : null};
    color: ${({ theme }) => theme.tertiaryColor};
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