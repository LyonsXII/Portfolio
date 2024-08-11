import React, { useState } from "react";
import { ThemeProvider } from "react-ui";
import axios from "axios";
import './App.css'

import Settings from "./Settings";

function App() {
  const theme = {
    colors: {
      primary: '#0070f3',
      bg: '#fff',
      text: '#333',
      grey: '#aaa',
    },
    fontSize: {
      small: '12px',
      medium: '16px',
      large: '24px',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className="containerBackground">
        </div>
        <Settings></Settings>
        <h1>Portfolio</h1>
        <h2>Michael Lyons</h2>
      </div>
    </ThemeProvider>
  )
}

export default App
