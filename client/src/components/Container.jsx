import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../context/ThemeContext";

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.textColor};
`;

const StyledBackground = styled.div`
  position: absolute;
  z-index:-1;
  background-color: ${({ theme }) => theme.backgroundColor};
  background-image: ${({ $bg }) => $bg};;
  overflow: hidden;
  pointer-events: none;
  height: 100vh;
  width: 100vw;
  box-shadow: inset 0px 0px 40px rgba(0, 0, 0, 1),
              inset 0px 0px 80px rgba(0, 0, 0, 0.6);
`;

function Container({ children }) {
  const { theme, bg } = useContext(ThemeContext);

  return (
    <div>
      <StyledBackground theme={theme} $bg={bg}/>
      <StyledContainer>
        <StyledDiv theme={theme}>
          {children}
        </StyledDiv>
      </StyledContainer>
    </div>
  )
}

export default Container