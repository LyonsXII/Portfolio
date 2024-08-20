import React, { createContext, useState } from "react";
import { colourSchemeA, colourSchemeB, colourSchemeC } from "../themes";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(colourSchemeA);
  const [bg, setBg] = useState("url('https://www.transparenttextures.com/patterns/cubes.png')");
  const [themeCount, setThemeCount] = useState(1);
  const [bgCount, setBgCount] = useState(0);

  function toggleTheme() {
    setThemeCount((themeCount + 1) % 3);
    switch(themeCount) {
      case 0:
        setTheme(colourSchemeA);
        break;
      case 1:
        setTheme(colourSchemeB);
        break;
      case 2:
        setTheme(colourSchemeC);
        break;
      default:
        setTheme(colourSchemeA);
    } 
  };

  function toggleBg() {
    setBgCount((bgCount + 1) % 3);
    switch(bgCount) {
      case 0:
        setBg("url('https://www.transparenttextures.com/patterns/cubes.png')");
        break;
      case 1:
        setBg("url('https://www.transparenttextures.com/patterns/cubes.png')");
        break;
      case 2:
        setBg("url('https://www.transparenttextures.com/patterns/cubes.png')");
        break;
      default:
        setBg("url('https://www.transparenttextures.com/patterns/cubes.png')");
    } 
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, toggleBg }}>
      {children}
    </ThemeContext.Provider>
  );
};
