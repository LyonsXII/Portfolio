import React, { useState, useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

function Container({ children }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <div style={{
        backgroundColor: theme.backgroundColor,
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
        overflow: "hidden",
        color: theme.textColor,
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {children}
      </div>

      <div style={{
          position: "absolute",
          zIndex: "1",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundImage: "url('./bg.webp')",
          backgroundSize: "cover",
          opacity: "0.04",
          pointerEvents: "none",
          height: "100%",
          width: "100%"
      }}>
      </div>
    </div>
  )
}

export default Container