import React, { useState } from "react";
import axios from "axios";
import './App.css'

import Settings from "./components/settings/Settings";
import PrimaryContainer from "./components/general/PrimaryContainer";
import Introduction from "./components/introduction/Introduction"
import SongGuesser from "./components/songGuesser/SongGuesser";
import FaradayCage from "./components/faradayCage/FaradayCage";
import AuthorAnalysis from "./components/authorAnalysis/AuthorAnalysis";
import { ThemeProvider } from "./context/ThemeContext";
import { AudioProvider } from "./context/AudioContext";
import { SettingsProvider } from "./context/SettingsContext";

function App() {
  const [intro, setIntro] = useState(true);
  const [songGuesserSection, setSongGuesserSection] = useState(false);
  const [faradaySection, setFaradaySection] = useState(false);
  const [authorAnalysisSection, setAuthorAnalysisSection] = useState(false);
  const [transition, setTransition] = useState(false);

  function home() {
    setTransition(true);
    setTimeout(() => {
      setSongGuesserSection(false);
      setFaradaySection(false);
      setAuthorAnalysisSection(false);
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

  function activateAuthorAnalysis() {
    setAuthorAnalysisSection(true);
    setIntro(false);
  }

  return (
    <ThemeProvider>
      <AudioProvider>
        <SettingsProvider>
          <PrimaryContainer>
            {intro === true ? <Introduction home={home} activateSongGuesser={activateSongGuesser} activateFaradayCage={activateFaradayCage} activateAuthorAnalysis={activateAuthorAnalysis} transition={transition}/> : null}
            {songGuesserSection === true ? <SongGuesser transition={transition} setTransition={setTransition} home={home}/> : null}
            {faradaySection === true ? <FaradayCage transition={transition} home={home}/> : null}
            {authorAnalysisSection === true ? <AuthorAnalysis transition={transition} setTransition={setTransition} home={home}/> : null}
            <Settings home={home}/>
          </PrimaryContainer>
        </SettingsProvider>
      </AudioProvider>
    </ThemeProvider>
  )
}

export default App
