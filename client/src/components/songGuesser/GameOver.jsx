import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledGameOverBackdrop, StyledMainTitle, StyledMainTitleWord, StyledMainTitleLetter, StyledGameOverText } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";

function GameOver({ gameOverAnimation, handleGameOver, lose, score }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledGameOverBackdrop $gameOverAnimation={gameOverAnimation} onClick={handleGameOver}>
        <StyledMainTitle $mode="Game Over">
          <StyledMainTitleWord $position="first" $mode="Game Over">
            {"Game".split("").map((letter, index) => {
            return <StyledMainTitleLetter theme={theme} key={index} $index={index} $faulty={[2]} $mode="Game Over">{letter}</StyledMainTitleLetter>
            })}
          </StyledMainTitleWord>
          <StyledMainTitleWord $mode="Game Over">
            {"Over".split("").map((letter, index) => {
            return <StyledMainTitleLetter theme={theme} key={index} $index={index} $faulty={[2,4]} $mode="Game Over">{letter}</StyledMainTitleLetter>
            })}
          </StyledMainTitleWord>
        </StyledMainTitle>
        <StyledGameOverText theme={theme} $gameOverAnimation={gameOverAnimation}>Final Score {score} </StyledGameOverText>
    </StyledGameOverBackdrop>
  )
}

export default GameOver

