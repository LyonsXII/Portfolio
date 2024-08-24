import React, { useContext } from "react";

import IntroButton from "./IntroButton";
import { ThemeContext } from "../context/ThemeContext";

function Introduction() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{
      display: "flex",
      height: "100%",
      width: "90.5%"
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
        width: "40%",
        gap: "40px"
      }}>
        <IntroButton name="Song Guesser"/>
        <IntroButton name="Faraday Cage"/>
        <IntroButton name="Song Guesser"/>
      </div>
    </div>
  )
}

export default Introduction