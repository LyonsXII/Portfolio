import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledGameOverBackdrop, StyledMainTitle, StyledMainTitleLetter, StyledGameOverText } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";

function GameOver({ gameOverExit, handleGameOver, lose, score }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledGameOverBackdrop $gameOverExit={gameOverExit} onClick={handleGameOver}>
        <StyledMainTitle>
          {lose && "Game Over".split("").map((letter, index) => {
            return <StyledMainTitleLetter theme={theme} key={index} $index={index} $gameOver={true} $gameOverExit={gameOverExit}>{letter}</StyledMainTitleLetter>
          })
          }
          {!lose && "Round End".split("").map((letter, index) => {
            return <StyledMainTitleLetter theme={theme} key={index} $index={index} $gameOver={true} $gameOverExit={gameOverExit}>{letter}</StyledMainTitleLetter>
          })
          }
        </StyledMainTitle>
        <StyledGameOverText theme={theme} $gameOverExit={gameOverExit}>Final Score {score} </StyledGameOverText>
    </StyledGameOverBackdrop>
  )
}

export default GameOver

