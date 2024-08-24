import React from "react";
import axios from "axios";
import './App.css'

import Settings from "./components/Settings";
import Container from "./components/Container";
import Introduction from "./components/Introduction"
import { ThemeProvider } from "./context/ThemeContext";

function App() {

  return (
    <ThemeProvider>
      <Settings />
      <Container>
        <Introduction />
      </Container>
    </ThemeProvider>
  )
}

export default App
