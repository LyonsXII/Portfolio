import React, { useContext } from "react";
import styled from 'styled-components';

import SongGuesserButton from "./SongGuesserButton";

import { ThemeContext } from "../../context/ThemeContext";

const StyledContainer = styled.div`
  height: 100vh;
  width: 88vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledFlexbox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8vh;
`;

const StyledGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  margin-left: ${({ $position }) => $position === "First" ? null : "4%"};
  gap: 20px;
`;

function SongGuesserIntro({ category, updateCategory, difficulty, updateDifficulty, mode, updateMode, startGame }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledContainer>
      <h1>Song Guesser</h1>
      
      <StyledFlexbox>
        <StyledGrid $position="First">
          <SongGuesserButton name="Pop" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Indie" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Anime" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Video Games" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Movies" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="TV Shows" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
        </StyledGrid>
        <StyledGrid>
          <SongGuesserButton name="Easy" columns="span 6" rows="span 2" onClick={updateDifficulty} section={difficulty}/>
          <SongGuesserButton name="Hard" columns="span 6" rows="span 2" onClick={updateDifficulty} section={difficulty}/>
          <SongGuesserButton name="Regular" columns="span 6" rows="span 2" onClick={updateMode} section={mode}/>
          <SongGuesserButton name="Sudden Death" columns="span 6" rows="span 2" onClick={updateMode} section={mode}/>
          <SongGuesserButton name="Start" rows="span 2" start="3" end="11" onClick={startGame}/>
        </StyledGrid>
      </StyledFlexbox>
    </StyledContainer>
  )
}

export default SongGuesserIntro