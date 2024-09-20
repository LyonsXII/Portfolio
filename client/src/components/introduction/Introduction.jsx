import React, { useState, useContext } from "react";
import styled from 'styled-components';

import IntroButton from "./IntroButton";
import IntroText from "./IntroText";
import { ThemeContext } from "../../context/ThemeContext";

import { text } from "./text";

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 36%;
  gap: 40px;
  margin-right: 4vw;
`;

const StyledIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Introduction(props) {
  const { theme } = useContext(ThemeContext);

  const [initial, setInitial] = useState(true);
  const [songGuesser, setSongGuesser] = useState(false);
  const [faraday, setFaraday] = useState(false);
  const [bookNotes, setBookNotes] = useState(false);

  function choiceSongGuesser() {
    setFaraday(false);
    setBookNotes(false);

    if (songGuesser === false) {
      setSongGuesser(true);
      setInitial(false);
    } else if (songGuesser === true) {
      setSongGuesser(false);
      setInitial(true);
    }
  }

  function choiceFaraday() {
    setSongGuesser(false);
    setBookNotes(false);

    if (faraday === false) {
      setFaraday(true);
      setInitial(false);
    } else if (faraday === true) {
      setFaraday(false);
      setInitial(true);
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
    <div style={{display: "flex"}}>
      <StyledContentContainer>
        {initial === true ?
          <StyledIntroContainer>
            <h1>Portfolio</h1>
            <h3>Michael Lyons</h3>
            <h4 style={{marginTop: "40px", width: "90%"}}>{text.introText}</h4>
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
      </StyledContentContainer>
        
      <StyledButtonsContainer>
        <IntroButton name="About Me" choice={choiceSongGuesser} activate={props.activateSongGuesser}/>
        <IntroButton name="Song Guesser" choice={choiceSongGuesser} activate={props.activateSongGuesser}/>
        <IntroButton name="Faraday Cage" choice={choiceFaraday}/>
        <IntroButton name="Book Notes" choice={choiceBookNotes}/>
      </StyledButtonsContainer>
    </div>
  )
}

export default Introduction