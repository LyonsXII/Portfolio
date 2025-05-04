import React, { useContext } from "react";
import styled from 'styled-components';

import SongGuesserButton from "./SongGuesserButton";

import { StyledIntroContainer, StyledMainTitle, StyledMainTitleLetter, StyledIntroFlexbox, StyledIntroGrid } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";

function SongGuesserIntro({ category, updateCategory, difficulty, updateDifficulty, mode, updateMode, startGame }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledIntroContainer>
        <StyledMainTitle>
          {"Song Guesser".split("").map((letter, index) => {
            return <StyledMainTitleLetter theme={theme} key={index} $index={index} $faulty={[2,6,10]} $spaces={[4]}>{letter}</StyledMainTitleLetter>
          })
          }
        </StyledMainTitle>
      
      <StyledIntroFlexbox>
        <StyledIntroGrid $position="First">
          <SongGuesserButton name="Pop" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Indie" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Anime" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Video Games" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Movies" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="TV Shows" columns="span 6" rows="span 2" onClick={updateCategory} section={category}/>
        </StyledIntroGrid>
        <StyledIntroGrid>
          <SongGuesserButton name="Easy" columns="span 6" rows="span 2" onClick={updateDifficulty} section={difficulty}/>
          <SongGuesserButton name="Hard" columns="span 6" rows="span 2" onClick={updateDifficulty} section={difficulty}/>
          <SongGuesserButton name="Regular" columns="span 6" rows="span 2" onClick={updateMode} section={mode}/>
          <SongGuesserButton name="Sudden Death" columns="span 6" rows="span 2" onClick={updateMode} section={mode}/>
          <SongGuesserButton name="Start" rows="span 2" start="3" end="11" onClick={startGame}/>
        </StyledIntroGrid>
      </StyledIntroFlexbox>
    </StyledIntroContainer>
  )
}

export default SongGuesserIntro