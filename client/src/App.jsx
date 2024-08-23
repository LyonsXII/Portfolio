import React from "react";
import axios from "axios";
import './App.css'

import Settings from "./components/Settings";
import Container from "./components/Container";
import Intro from "./components/Intro"
import { ThemeProvider } from "./context/ThemeContext";

function App() {

  return (
    <ThemeProvider>
      <Settings></Settings>
      <Container>
        <Intro>

        </Intro>
      </Container>
    </ThemeProvider>
  )
}

export default App
