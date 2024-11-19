import React, { useState, useContext } from "react";
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

  return (
    <StyledContentContainer>
        {initial === true ?
          <IntroTextInitial title="Portfolio" text={text.introText} current={current}/>
          : null
        }
        {songGuesser === true ?
          <IntroText title="Song Guesser" textA={text.songGuesserTextA} textB={text.songGuesserTextB} current={current}/>
        : null}
        {faraday === true ?
          <IntroText title="Faraday Cage" textA={text.faradayCageTextA} textB={text.faradayCageTextB} current={current}/>
        : null}
        {bookNotes === true ?
          <IntroText title="Book Notes" textA={text.bookNotesTextA} textB={text.bookNotesTextB} current={current}/>
        : null}
        <IntroGallery choiceSongGuesser={choiceSongGuesser} choiceFaraday={choiceFaraday} choiceBookNotes={choiceBookNotes}/>
    </StyledContentContainer>
  )
}

export default Introduction