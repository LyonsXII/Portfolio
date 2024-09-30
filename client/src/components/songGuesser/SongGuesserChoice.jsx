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
  color: ${(props) => props.theme.textColor};
  box-shadow: 0px 0px 10px black;
  background-color: ${(props) => 
    props.showAnswer ? 
      props.correct ? "green" : "red"
      : props.theme.primaryColor
  };

  &:hover {
    background-color: ${props => props.showAnswer === false ? props.theme.secondaryColor : null};
    color: ${props => props.theme.tertiaryColor};
  }
`;

function SongGuesserChoice(props) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  function onClick() {
    props.onClick(props.correct);
    clickSound();
  }

  return (
    <StyledButton theme={theme} columns={props.columns} rows={props.rows} start={props.start} end={props.end} correct={props.correct} showAnswer={props.showAnswer} onClick={() => {onClick()}}>
      <h3>{props.name}</h3>
    </StyledButton>
  )
}

export default SongGuesserChoice