import React, { useState, useContext, useRef } from "react";

import { ThemeContext } from "../../context/ThemeContext";

import SettingsContainer from "./SettingsContainer";
import SettingsHoverTextContainer from "./SettingsHoverTextContainer";
import SettingsButtonContainer from "./SettingsButtonContainer";
import SettingsNotch from "./SettingsNotch";
import SettingsMenu from "./SettingsMenu";
import SettingsButton from "./SettingsButton";
import SettingsText from "./SettingsText";
import Spacer from "./Spacer";

function Settings({ home, changeVolume }) {
  const { toggleTheme, toggleBg } = useContext(ThemeContext);
  
  const [hoverText, setHoverText] = useState(""); 
  const [settingsHidden, setSettingsHidden] = useState(true);
  const [settingsMenuHidden, setSettingsMenuHidden] = useState(true);

  const clickedRef = useRef(false);

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
    setAnimationState("Enter");
  }

  return (
    <div>
      <SettingsMenu settingsMenuHidden={settingsMenuHidden} toggleSettingsMenu={toggleSettingsMenu} changeVolume={changeVolume}/>

      <SettingsNotch settingsHidden={settingsHidden} toggleButtonsVisible={toggleButtonsVisible} clickedRef={clickedRef}/>
      <SettingsContainer settingsHidden={settingsHidden} clickedRef={clickedRef}>
        <SettingsHoverTextContainer>
          <SettingsText text="Home" curr={hoverText} position="Top"/>
          <SettingsText text="Settings" curr={hoverText}/>
          <SettingsText text="Theme" curr={hoverText}/>
          <SettingsText text="Colour" curr={hoverText}/>
          <Spacer/>
          <SettingsText text="GitHub" curr={hoverText}/>
          <SettingsText text="LinkedIn" curr={hoverText}/>
          <SettingsText text="LeetCode" curr={hoverText} position="Bottom"/>
        </SettingsHoverTextContainer>

        <SettingsButtonContainer>
          <SettingsButton value="Home" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={home} svgPath="./icons/home.svg"/>
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
