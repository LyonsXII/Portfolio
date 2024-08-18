import React from "react";
import axios from "axios";
import './App.css'

import Settings from "./components/Settings";
import { ThemeProvider } from "./context/ThemeContext";

function App() {  

  return (
    <ThemeProvider>
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
