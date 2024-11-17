import React, { useState, useContext } from "react";
import styled from 'styled-components';

import IntroButton from "./IntroButton";
import IntroText from "./IntroText";

import { text } from "./text";
import { StyledContentContainer, StyledButtonsContainer, StyledIntroContainer, StyledTitle, StyledMinorTitle, StyledGallery } from "./Introduction.styles";
import IntroductionGallery from "./IntroductionGallery";

function Introduction({ activateSongGuesser, activateFaradayCage }) {
  const [initial, setInitial] = useState(true);
  const [songGuesser, setSongGuesser] = useState(false);
  const [faraday, setFaraday] = useState(false);
  const [bookNotes, setBookNotes] = useState(false);

  function choiceSongGuesser() {
    setFaraday(false);
    setBookNotes(false);

    if (songGuesser) {
      setSongGuesser(false);
      setInitial(true);
    } else if (!songGuesser) {
      setSongGuesser(true);
      setInitial(false);
    }
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
          <StyledIntroContainer>
            <StyledTitle>Portfolio</StyledTitle>
            <StyledMinorTitle>Michael Lyons</StyledMinorTitle>
          </StyledIntroContainer>
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
        <IntroductionGallery choiceSongGuesser={choiceSongGuesser} choiceFaraday={choiceFaraday} choiceBookNotes={choiceBookNotes}/>
    </StyledContentContainer>
  )
}

export default Introduction