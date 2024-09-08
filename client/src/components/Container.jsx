import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../context/ThemeContext";

const StyledContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 88vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${(props) => props.theme.textColor};
`;

const StyledBackground = styled.div`
  position: absolute;
  z-index: -1;
  background-color: ${(props) => props.theme.backgroundColor};
  background-image: ${(props) => props.bg};;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
`;

const StyledBackgroundGif = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('./bg.webp');
  background-size: cover;
  opacity: 0.03;
  pointer-events: none;
  height: 100%;
  width: 100%;
`;

function Container({ children }) {
  const { theme, bg } = useContext(ThemeContext);

  return (
    <div>
      <StyledContainer>
        <StyledDiv theme={theme}>{children}</StyledDiv>
      </StyledContainer>
      <StyledBackground theme={theme} bg={bg}/>
      <StyledBackgroundGif/>
    </div>
  )
}

export default Container