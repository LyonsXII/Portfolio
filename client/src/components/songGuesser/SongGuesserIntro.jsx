import React, { useContext } from "react";
import styled from 'styled-components';

import ReturnButton from "../general/ReturnButton";
import SongGuesserButton from "./SongGuesserButton";

import { StyledIntroContainer, StyledMainTitle, StyledMainTitleWord, StyledMainTitleLetter, StyledIntroFlexbox, StyledIntroGrid } from "./SongGuesser.styles";

import { ThemeContext } from "../../context/ThemeContext";

function SongGuesserIntro({ category, updateCategory, difficulty, updateDifficulty, mode, updateMode, startGame, home }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledIntroContainer>
      <ReturnButton returnFunction={home}/>

      <StyledMainTitle>
        <StyledMainTitleWord $position="first">
          {"Song".split("").map((letter, index) => {
          return <StyledMainTitleLetter theme={theme} key={index} $index={index} $faulty={[2]}>{letter}</StyledMainTitleLetter>
          })}
        </StyledMainTitleWord>
        <StyledMainTitleWord>
          {"Guesser".split("").map((letter, index) => {
          return <StyledMainTitleLetter theme={theme} key={index} $index={index} $faulty={[2,4]}>{letter}</StyledMainTitleLetter>
          })}
        </StyledMainTitleWord>
      </StyledMainTitle>
      
      <StyledIntroFlexbox>
        <StyledIntroGrid $position="First" $mobileHeight="40%">
          <SongGuesserButton name="Pop" rowsMobile="span 3" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Indie" rowsMobile="span 3" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Anime" rowsMobile="span 3" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Video Games" rowsMobile="span 3" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="Movies" rowsMobile="span 3" onClick={updateCategory} section={category}/>
          <SongGuesserButton name="TV Shows" rowsMobile="span 3" onClick={updateCategory} section={category}/>
        </StyledIntroGrid>
        <StyledIntroGrid $mobileHeight="60%">
          <SongGuesserButton name="Easy" columnsMobile="span 6" onClick={updateDifficulty} section={difficulty}/>
          <SongGuesserButton name="Hard" columnsMobile="span 6" onClick={updateDifficulty} section={difficulty}/>
          <SongGuesserButton name="Regular" columnsMobile="span 6" onClick={updateMode} section={mode}/>
          <SongGuesserButton name="Sudden Death" columnsMobile="span 6" onClick={updateMode} section={mode}/>
          <SongGuesserButton name="Start" rowsMobile="span 3" columnsDesktop="span 0" columnsMobile="span 0" start="3" end="11" onClick={startGame}/>
        </StyledIntroGrid>
      </StyledIntroFlexbox>
    </StyledIntroContainer>
  )
}

export default SongGuesserIntro