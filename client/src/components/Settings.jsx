import React, { useState, useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

import SettingsButton from "./SettingsButton";
import SettingsText from "./SettingsText";

function Settings(props) {
  const { theme, toggleTheme, toggleBg } = useContext(ThemeContext);

  const [hoverText, setHoverText] = useState("");

  function updateHoverText(text) {
    setHoverText(text);
  }

  function resetHoverText() {
    setHoverText("");
  }

  return (
    <div>
      <div className="settingsContainer" style={{color: theme.textColor}}>
        <div className="settingsTextContainer">
          <SettingsText text="Home" curr={hoverText} position="Top"/>
          <SettingsText text="Settings" curr={hoverText}/>
          <SettingsText text="Theme" curr={hoverText}/>
          <SettingsText text="Colour" curr={hoverText}/>
          <div className="spacer"></div>
          <SettingsText text="GitHub" curr={hoverText}/>
          <SettingsText text="LinkedIn" curr={hoverText}/>
          <SettingsText text="LeetCode" curr={hoverText} position="Bottom"/>
        </div>

        <div className="settingsButtonContainer">
          <SettingsButton value="Home" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={props.home} svgPath="./icons/home.svg"/>
          <SettingsButton value="Settings" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={props.home} svgPath="./icons/settings.svg"/>
          <SettingsButton value="Theme" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleBg} svgPath="./icons/theme.svg"/>
          <SettingsButton value="Colour" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleTheme} svgPath="./icons/colour.svg"/>
          <div className="spacer" style={{backgroundColor: theme.primaryColor}}></div>
          <a href="https://github.com/LyonsXII">
            <SettingsButton value="GitHub" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleTheme} svgPath="./icons/colour.svg" type="Lower"/>
          </a>
          <a href="https://www.linkedin.com/in/michael-lyons-60186b170/">
            <SettingsButton value="LinkedIn" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleTheme} svgPath="./icons/linkedin.svg" type="Lower"/>
          </a>
          <a href="https://leetcode.com/u/MichaelLyons/">
            <SettingsButton value="LeetCode" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleTheme} svgPath="./icons/colour.svg" type="Lower"/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Settings
