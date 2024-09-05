import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../context/ThemeContext";

const StyledDiv = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  background-image: ${(props) => props.bg};;
  overflow: hidden;
  color: ${(props) => props.theme.textColor};
  height: 100vh;
  width: 96vw;
`;

const StyledBackground = styled.div`
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
      <StyledDiv theme={theme} bg={bg}>
        {children}
      </StyledDiv>

      <StyledBackground/>
    </div>
  )
}

export default Container