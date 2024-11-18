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
      setFaraday(false);
      setBookNotes(false);
      setInitial(prev => !prev);
      setSongGuesser(prev => !prev);
    }, 500)

    current == "Song Guesser" ? setCurrent("Initial") : setCurrent("Song Guesser");
  }

  function choiceFaraday() {
    setSongGuesser(false);
    setBookNotes(false);

    if (faraday) {
      setFaraday(false);
      setInitial(true);
    } else if (!faraday) {
      setFaraday(true);
      setInitial(false);
    }
  }

  function choiceBookNotes() {
    setSongGuesser(false);
    setFaraday(false);

    if (bookNotes === false) {
      setBookNotes(true);
      setInitial(false);
    } else if (bookNotes === true) {
      setBookNotes(false);
      setInitial(true);
    }
  }

  return (
    <StyledContentContainer>
        {initial === true ?
          <IntroTextInitial title="Portfolio" text={text.introText} current={current}/>
          : null
        }
        {songGuesser === true ?
          <IntroText title="Song Guesser" textA={text.songGuesserTextA} textB={text.songGuesserTextB}/>
        : null}
        {faraday === true ?
          <IntroText title="Faraday Cage" textA={text.faradayCageTextA} textB={text.faradayCageTextB}/>
        : null}
        {bookNotes === true ?
          <IntroText title="Book Notes" textA={text.bookNotesTextA} textB={text.bookNotesTextB}/>
        : null}
        <IntroGallery choiceSongGuesser={choiceSongGuesser} choiceFaraday={choiceFaraday} choiceBookNotes={choiceBookNotes}/>
    </StyledContentContainer>
  )
}

export default Introduction