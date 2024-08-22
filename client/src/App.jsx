import React from "react";
import axios from "axios";
import './App.css'

import Settings from "./components/Settings";
import Container from "./components/Container"
import { ThemeProvider } from "./context/ThemeContext";

function App() {

  return (
    <ThemeProvider>
      <Settings></Settings>
      <Container>
        <div style={{
          display: "flex",
          height: "100%",
          width: "100%"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center",
            width: "60%"
          }}>
            <h1>Portfolio</h1>
            <h2>Michael Lyons</h2>
            <h3 style={{marginTop: "40px"}}>Hey here's some text</h3>
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center",
            width: "40%"
          }}>
            {/* <button style={{
              height: "80px",
              width: "300px",
              backgroundColor: theme.primaryColour
            }}>
              <h3>Song Guesser</h3>
            </button> */}
          </div>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default App
