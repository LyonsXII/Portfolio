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
  margin-top: 40vh;
`;

const StyledFlexbox = styled.div`
  height: 70%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8vh;
`;

const StyledGrid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  margin-left: ${props => props.position === "First" ? null : "4%"};
  gap: 20px;
`;

function SongGuesserIntro(props) {
  const { theme } = useContext(ThemeContext);

  function updateCategory(value) {
    setCategory(value);
  }

  return (
    <StyledContainer>
      <h1>Song Guesser</h1>
      
      <StyledFlexbox>
        <StyledGrid position="First">
          <SongGuesserButton name="Pop" columns="span 6" rows="span 2" onClick={updateCategory}/>
          <SongGuesserButton name="Indie" columns="span 6" rows="span 2"/>
          <SongGuesserButton name="Anime" columns="span 6" rows="span 2"/>
          <SongGuesserButton name="Video Games" columns="span 6" rows="span 2"/>
          <SongGuesserButton name="Movies" columns="span 6" rows="span 2"/>
          <SongGuesserButton name="TV Shows" columns="span 6" rows="span 2"/>
        </StyledGrid>
        <StyledGrid>
          <SongGuesserButton name="Easy" columns="span 6" rows="span 2"/>
          <SongGuesserButton name="Hard" columns="span 6" rows="span 2"/>
          <SongGuesserButton name="Regular" columns="span 6" rows="span 2"/>
          <SongGuesserButton name="Sudden Death" columns="span 6" rows="span 2"/>
          <SongGuesserButton name="Start" rows="span 2" start="3" end="11" onClick={props.startGame}/>
        </StyledGrid>
      </StyledFlexbox>
    </StyledContainer>
  )
}

export default SongGuesserIntro