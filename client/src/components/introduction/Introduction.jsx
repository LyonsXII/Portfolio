import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import IntroButton from "./IntroButton";
import IntroTextInitial from "./IntroTextInitial";
import IntroText from "./IntroText";
import IntroGallery from "./IntroGallery";

import { text } from "./text";
import { StyledContentContainer, StyledButtonsContainer, StyledIntroContainer, StyledTitle, StyledMinorTitle, StyledGallery } from "./Introduction.styles";

function Introduction({ activateSongGuesser, activateFaradayCage }) {
  const [initial, setInitial] = useState(true);
  const [songGuesser, setSongGuesser] = useState(false);
  const [faraday, setFaraday] = useState(false);
  const [bookNotes, setBookNotes] = useState(false);
  const [current, setCurrent] = useState("Portfolio");

  // Animation states
  const [showSubTitle, setShowSubTitle] = useState(false);
  const [subTitleEntranceComplete, setSubTitleEntranceComplete] = useState(false);
  const [expandIntroText, setExpandIntroText] = useState(false);
  const [introBodyTextAnimationActive, setIntroBodyTextAnimationActive] = useState("none");
  const [galleryAnimationComplete, setGalleryAnimationComplete] = useState(false);

  function choiceSongGuesser() {
    setTimeout(() => {
      current === "Song Guesser" ? setInitial(true) : setInitial(false);
      setSongGuesser(prev => !prev);
      setFaraday(false);
      setBookNotes(false);
    }, 500)

    if (current === "Song Guesser") {
      setCurrent("Portfolio"); 
    } else {
      setCurrent("Song Guesser");
    } 
  }

  function choiceFaraday() {
    setTimeout(() => {
      current === "Faraday Cage" ? setInitial(true) : setInitial(false);
      setSongGuesser(false);
      setFaraday(prev => !prev);
      setBookNotes(false);
    }, 500)

    if (current === "Faraday Cage") {
      setCurrent("Portfolio"); 
    } else {
      setCurrent("Faraday Cage");
    } 
  }

  function choiceBookNotes() {
    setTimeout(() => {
      current === "Book Notes" ? setInitial(true) : setInitial(false);
      setSongGuesser(false);
      setFaraday(false);
      setBookNotes(prev => !prev);
    }, 500)

    if (current === "Book Notes") {
      setCurrent("Portfolio"); 
    } else {
      setCurrent("Book Notes");
    } 
  }

  function toggleShowSubTitle() {
    setShowSubTitle(true);
    setTimeout(() => {setSubTitleEntranceComplete(true)}, 1000);
  }

  function toggleExpandIntroText() {
    if (expandIntroText) {
      setTimeout(() => {setExpandIntroText(false)}, 1000);
      setIntroBodyTextAnimationActive("Exit");
      setTimeout(() => {setIntroBodyTextAnimationActive("none")}, 1000);
    } else {
      setExpandIntroText(true);
      setIntroBodyTextAnimationActive("Entrance");
      setTimeout(() => {setIntroBodyTextAnimationActive("none")}, 1000);
    }
  }

  // Time allowed insertion of subtitle to animation completion, avoids jarring title movement
  useEffect(() => {
    setTimeout(() => {setGalleryAnimationComplete(true)}, 1000)
  } 
  , []);

  return (
    <StyledContentContainer>
        {initial ?
          <IntroTextInitial title="Portfolio" text={text.introText} current={current} showSubTitle={showSubTitle} subTitleEntranceComplete={subTitleEntranceComplete} expandIntroText={expandIntroText} introBodyTextAnimationActive={introBodyTextAnimationActive}/>
          : null
        }
        {songGuesser ?
          <IntroText title="Song Guesser" textA={text.songGuesserTextA} textB={text.songGuesserTextB} current={current}/>
        : null}
        {faraday ?
          <IntroText title="Faraday Cage" textA={text.faradayCageTextA} textB={text.faradayCageTextB} current={current}/>
        : null}
        {bookNotes ?
          <IntroText title="Book Notes" textA={text.bookNotesTextA} textB={text.bookNotesTextB} current={current}/>
        : null}
        <IntroGallery choiceSongGuesser={choiceSongGuesser} choiceFaraday={choiceFaraday} choiceBookNotes={choiceBookNotes} toggleShowSubTitle={toggleShowSubTitle} galleryAnimationComplete={galleryAnimationComplete} toggleExpandIntroText={toggleExpandIntroText}/>
    </StyledContentContainer>
  )
}

export default Introduction