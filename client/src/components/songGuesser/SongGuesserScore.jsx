import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledDiv = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: none;
`;

const StyledFlexbox = styled.div`
  display: flex;
  height: 100%;
  width: 3vw;
  background-color: cyan;
`;

function SongGuesserScore(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <StyledDiv theme={theme}>
        <h3>Score: {props.score}</h3>
      </StyledDiv>

      <StyledFlexbox>

      </StyledFlexbox>
    </div>
  )
}

export default SongGuesserScore