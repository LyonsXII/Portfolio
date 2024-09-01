import React, { useState } from "react";
import axios from "axios";
import './App.css'

import Settings from "./components/Settings";
import Container from "./components/Container";
import Introduction from "./components/Introduction"
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [intro, setIntro] = useState(true);
  const [songGuesserSection, setSongGuesserSection] = useState(false);
  const [faradaySection, setFaradaySection] = useState(false);
  const [bookNotesSection, setBookNotesSection] = useState(false);

  function home() {
    setSongGuesserSection(false);
    setFaradaySection(false);
    setBookNotesSection(false);
    setIntro(true);
    console.log("hye");
  }

  return (
    <ThemeProvider>
      <Settings home={home}/>
      <Container>
        {intro === true ? <Introduction /> : null}
        {songGuesserSection === true ? null : null}
        {faradaySection === true ? null : null}
        {bookNotesSection === true ? null : null}
      </Container>
    </ThemeProvider>
  )
}

export default App
