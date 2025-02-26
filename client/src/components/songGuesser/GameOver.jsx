import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { fadeInAnimation, fadeOutAnimation } from '../../context/Animations';

const StyledBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100vh;
  width: 112vw;
  background-color: black; 
  z-index: 4;
  opacity: 1;
  cursor: pointer;

  animation: ${fadeInAnimation};

  animation: ${({ $gameOverExit }) => 
    !$gameOverExit
      ? fadeInAnimation
      : fadeOutAnimation
  };
`;

function GameOver({ gameOverExit, handleGameOver }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledBackdrop $gameOverExit={gameOverExit} onClick={handleGameOver}>

    </StyledBackdrop>
  )
}

export default GameOver

