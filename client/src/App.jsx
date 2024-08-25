import React, { useState } from "react";
import axios from "axios";
import './App.css'

import Settings from "./components/Settings";
import Container from "./components/Container";
import Introduction from "./components/Introduction"
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [intro, setIntro] = useState(true);

  function home() {
    setIntro(true);
  }

  return (
    <ThemeProvider>
      <Settings home={home}/>
      <Container>
        {intro === true ? <Introduction /> : null}
      </Container>
    </ThemeProvider>
  )
}

export default App
