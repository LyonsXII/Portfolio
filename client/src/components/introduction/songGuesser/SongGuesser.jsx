import React, { useContext } from "react";
import styled from 'styled-components';

import SongGuesserButton from "./SongGuesserButton";
import { ThemeContext } from "../../../context/ThemeContext";

const StyledContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 88vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 20vh;
`;

const StyledGrid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  margin-top: 8vh;
  margin-left: 4vw;
  gap: 20px;
`;

function SongGuesser(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledContainer>
      <h1>Song Guesser</h1>
      <StyledGrid>
        <SongGuesserButton name="Anime" columns="span 2" rows="span 2"/>
        <SongGuesserButton name="Indie" columns="span 2" rows="span 2"/>
      </StyledGrid>
    </StyledContainer>
  )
}

export default SongGuesser