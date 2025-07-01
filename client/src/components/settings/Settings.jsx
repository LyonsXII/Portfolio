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
          <SettingsText text="CV" curr={hoverText}/>
          <SettingsText text="GitHub" curr={hoverText}/>
          <SettingsText text="LinkedIn" curr={hoverText}/>
          <SettingsText text="LeetCode" curr={hoverText} position="Bottom"/>
        </SettingsHoverTextContainer>

        <SettingsButtonContainer>
          <SettingsButton value="Home" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={home} position="Top" svgPath="./icons/home.svg" mobile={true} mobileOrder="1"/>
          <SettingsButton value="Settings" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleSettingsMenu} svgPath="./icons/settings.svg" mobile={true} mobileOrder="2"/>
          <SettingsButton value="Theme" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleBg} svgPath="./icons/theme.svg" mobile={true} mobileOrder="5"/>
          <SettingsButton value="Colour" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleTheme} svgPath="./icons/colour.svg" mobile={true} mobileOrder="6"/>
          <Spacer background="true" mobileOrder="4"/>
          <SettingsButton value="CV" updateHoverText={updateHoverText} resetHoverText={resetHoverText} svgPath="./icons/cv.svg" link="/papers/CV - Michael Lyons.pdf" download={true} type="Lower" mobile={true} mobileOrder="3" mobileEnd={true}/>
          <SettingsButton value="GitHub" updateHoverText={updateHoverText} resetHoverText={resetHoverText} svgPath="./icons/github.svg" link="https://github.com/LyonsXII" type="Lower" mobile={false}/>
          <SettingsButton value="LinkedIn" updateHoverText={updateHoverText} resetHoverText={resetHoverText} svgPath="./icons/linkedin.svg" link="https://www.linkedin.com/in/michael-lyons-60186b170/" type="Lower" mobile={false}/>
          <SettingsButton value="LeetCode" updateHoverText={updateHoverText} resetHoverText={resetHoverText} svgPath="./icons/leetcode.svg" link="https://leetcode.com/u/MichaelLyons/" position="Bottom" type="Lower" mobile={false}/>
        </SettingsButtonContainer>
      </SettingsContainer>
    </div>
  )
}

export default Settings
