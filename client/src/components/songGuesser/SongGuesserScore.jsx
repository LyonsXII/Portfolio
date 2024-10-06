import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 3vw;
  border-right: 4px solid black;
  background-color: ${({ theme }) => theme.primaryColor};
`;

const StyledIncrement = styled.div`
  height: calc(100vh / 20);
  border-bottom: 4px solid black;
  background-color: ${({ $current, theme }) => $current === "true" ? theme.secondaryColor : theme.primaryColor};
`

const StyledBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

function SongGuesserScore({ score }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <StyledFlexbox theme={theme}>
        {Array.from({ length: score }, (_, i) => (
          <StyledIncrement theme={theme} key={i}>
            <StyledBox>
              <h4>{i + 1}</h4>
            </StyledBox>
          </StyledIncrement>
        ))}
        <StyledIncrement theme={theme} $current={"true"}>
            <StyledBox>
              <h4>{score + 1}</h4>
            </StyledBox>
          </StyledIncrement>
      </StyledFlexbox>
    </div>
  )
}

export default SongGuesserScore