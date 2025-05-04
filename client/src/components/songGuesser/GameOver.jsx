import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledGameOverBackdrop, StyledMainTitle, StyledMainTitleLetter, StyledGameOverText } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";

function GameOver({ gameOverAnimation, handleGameOver, lose, score }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledGameOverBackdrop $gameOverAnimation={gameOverAnimation} onClick={handleGameOver}>
        <StyledMainTitle>
          {lose && "Game Over".split("").map((letter, index) => {
            return <StyledMainTitleLetter theme={theme} key={index} $index={index} $faulty={[2,7]} $spaces={[4]} $gameOver={true} $gameOverAnimation={gameOverAnimation}>{letter}</StyledMainTitleLetter>
          })
          }
          {!lose && "Round End".split("").map((letter, index) => {
            return <StyledMainTitleLetter theme={theme} key={index} $index={index} $faulty={[2,7]} $spaces={[5]} $gameOver={true} $gameOverAnimation={gameOverAnimation}>{letter}</StyledMainTitleLetter>
          })
          }
        </StyledMainTitle>
        <StyledGameOverText theme={theme} $gameOverAnimation={gameOverAnimation}>Final Score {score} </StyledGameOverText>
    </StyledGameOverBackdrop>
  )
}

export default GameOver

