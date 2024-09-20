import React, { useState, useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import SettingsContainer from "./SettingsContainer";
import SettingsTextContainer from "./SettingsTextContainer";
import SettingsButtonContainer from "./SettingsButtonContainer";
import SettingsNotch from "./SettingsNotch";
import SettingsMenu from "./SettingsMenu";
import SettingsButton from "./SettingsButton";
import SettingsText from "./SettingsText";
import Spacer from "./Spacer";

function Settings(props) {
  const { theme, toggleTheme, toggleBg } = useContext(ThemeContext);

  const [hoverText, setHoverText] = useState(""); 
  const [settingsHidden, setSettingsHidden] = useState(true);
  const [settingsMenuHidden, setSettingsMenuHidden] = useState(true);

  function updateHoverText(text) {
    setHoverText(text);
  }

  function resetHoverText() {
    setHoverText("");
  }

  function toggleButtonsVisible() {
    setSettingsHidden((prevState) => !prevState);
  }

  function toggleSettingsMenu() {
    setSettingsMenuHidden((prevState) => !prevState);
  }

  return (
    <div>
      <SettingsNotch settingsHidden={settingsHidden} toggleButtonsVisible={toggleButtonsVisible}/>
      <SettingsMenu settingsMenuHidden={settingsMenuHidden}/>
      <SettingsContainer settingsHidden={settingsHidden}>
        <SettingsTextContainer>
          <SettingsText text="Home" curr={hoverText} position="Top"/>
          <SettingsText text="Settings" curr={hoverText}/>
          <SettingsText text="Theme" curr={hoverText}/>
          <SettingsText text="Colour" curr={hoverText}/>
          <Spacer/>
          <SettingsText text="GitHub" curr={hoverText}/>
          <SettingsText text="LinkedIn" curr={hoverText}/>
          <SettingsText text="LeetCode" curr={hoverText} position="Bottom"/>
        </SettingsTextContainer>

        <SettingsButtonContainer settingsHidden={settingsHidden}>
          <SettingsButton value="Home" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={props.home} svgPath="./icons/home.svg"/>
          <SettingsButton value="Settings" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleSettingsMenu} svgPath="./icons/settings.svg"/>
          <SettingsButton value="Theme" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleBg} svgPath="./icons/theme.svg"/>
          <SettingsButton value="Colour" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleTheme} svgPath="./icons/colour.svg"/>
          <Spacer background="true"/>
          <SettingsButton value="GitHub" updateHoverText={updateHoverText} resetHoverText={resetHoverText} svgPath="./icons/github.svg" link="https://github.com/LyonsXII" type="Lower"/>
          <SettingsButton value="LinkedIn" updateHoverText={updateHoverText} resetHoverText={resetHoverText} svgPath="./icons/linkedin.svg" link="https://www.linkedin.com/in/michael-lyons-60186b170/" type="Lower"/>
          <SettingsButton value="LeetCode" updateHoverText={updateHoverText} resetHoverText={resetHoverText} svgPath="./icons/leetcode.svg" link="https://leetcode.com/u/MichaelLyons/" type="Lower"/>
        </SettingsButtonContainer>
      </SettingsContainer>
    </div>
  )
}

export default Settings
