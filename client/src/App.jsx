import React, { useState } from "react";
import axios from "axios";
import './App.css'

import Settings from "./components/settings/Settings";
import Container from "./components/Container";
import Introduction from "./components/introduction/Introduction"
import { ThemeProvider } from "./context/ThemeContext";
import SongGuesser from "./components/songGuesser/SongGuesser";

function App() {
  const [intro, setIntro] = useState(true);
  const [songGuesserSection, setSongGuesserSection] = useState(false);
  const [faradaySection, setFaradaySection] = useState(false);
  const [bookNotesSection, setBookNotesSection] = useState(false);

  const [volume, setVolume] = useState(40);

  function home() {
    setSongGuesserSection(false);
    setFaradaySection(false);
    setBookNotesSection(false);
    setIntro(true);
  }

  function activateSongGuesser() {
    setSongGuesserSection(true);
    setIntro(false);
  }

  function activateFaradayCage() {
    setFaradaySection(true);
    setIntro(false);
  }

  function activateBookNotes() {
    setBookNotes(true);
    setIntro(false);
  }

  function changeVolume(event) {
    setVolume(event.target.value);
  }

  return (
    <ThemeProvider>
      <Container>
        {intro === true ? <Introduction activateSongGuesser={activateSongGuesser}/> : null}
        {songGuesserSection === true ? <SongGuesser volume={volume}/> : null}
        {faradaySection === true ? null : null}
        {bookNotesSection === true ? null : null}
        <Settings home={home} volume={volume} changeVolume={changeVolume}/>
      </Container>
    </ThemeProvider>
  )
}

export default App
