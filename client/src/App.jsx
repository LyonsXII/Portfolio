import React, { useState } from "react";
import axios from "axios";
import './App.css'

import Settings from "./components/settings/Settings";
import Container from "./components/Container";
import Introduction from "./components/introduction/Introduction"
import SongGuesser from "./components/songGuesser/SongGuesser";
import FaradayCage from "./components/faradayCage/FaradayCage";
import { ThemeProvider } from "./context/ThemeContext";
import { AudioProvider } from "./context/AudioContext";
import { SettingsProvider } from "./context/SettingsContext";

function App() {
  const [intro, setIntro] = useState(true);
  const [songGuesserSection, setSongGuesserSection] = useState(false);
  const [faradaySection, setFaradaySection] = useState(false);
  const [bookNotesSection, setBookNotesSection] = useState(false);
  const [transition, setTransition] = useState(false);

  function home() {
    setTransition(true);
    setTimeout(() => {
      setSongGuesserSection(false);
      setFaradaySection(false);
      setBookNotesSection(false);
      setIntro(true);
      setTransition(false)
    }, 500)
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

  return (
    <ThemeProvider>
      <AudioProvider>
        <SettingsProvider>
          <Container>
            {intro === true ? <Introduction home={home} activateSongGuesser={activateSongGuesser} activateFaradayCage={activateFaradayCage} transition={transition}/> : null}
            {songGuesserSection === true ? <SongGuesser transition={transition} setTransition={setTransition}/> : null}
            {faradaySection === true ? <FaradayCage transition={transition}/> : null}
            {bookNotesSection === true ? null : null}
            <Settings home={home}/>
          </Container>
        </SettingsProvider>
      </AudioProvider>
    </ThemeProvider>
  )
}

export default App
