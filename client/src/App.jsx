import React from "react";
import axios from "axios";
import './App.css'

import Settings from "./components/Settings";
import Container from "./components/Container"
import { ThemeProvider } from "./context/ThemeContext";

function App() {

  return (
    <ThemeProvider>
      <Container>
        <Settings></Settings>
        <h1>Portfolio</h1>
        <h2>Michael Lyons</h2>
      </Container>
    </ThemeProvider>
  )
}

export default App
