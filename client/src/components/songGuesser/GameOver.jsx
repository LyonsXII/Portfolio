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
  width: 100vw;
  background-color: black; 
  z-index: 1000;
  opacity: 1;

  animation: ${fadeInAnimation};
`;

function GameOver({ handleGameOver }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledBackdrop onClick={handleGameOver}>

    </StyledBackdrop>
  )
}

export default GameOver

