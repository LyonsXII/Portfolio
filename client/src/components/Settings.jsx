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
          <SettingsText text="Home" curr={hoverText} position="Top"></SettingsText>
          <SettingsText text="Settings" curr={hoverText}></SettingsText>
          <SettingsText text="Theme" curr={hoverText}></SettingsText>
          <SettingsText text="Colour" curr={hoverText}></SettingsText>
          <div className="spacer"></div>
          <SettingsText text="Github" curr={hoverText}></SettingsText>
          <SettingsText text="LinkedIn" curr={hoverText}></SettingsText>
          <SettingsText text="LeetCode" curr={hoverText}></SettingsText>
          {/* <div className="settingsButton settingsButtonHoverTextTop" style={{backgroundColor: theme.primaryColor, visibility: hoverText == "Home" ? "visible" : "hidden"}}>
            <h3>Home</h3>
          </div>
          <div className="settingsButton settingsButtonHoverText" style={{backgroundColor: theme.primaryColor, visibility: hoverText == "Settings" ? "visible" : "hidden"}}>
            <h3>Settings</h3>
          </div>
          <div className="settingsButton settingsButtonHoverText" style={{backgroundColor: theme.primaryColor, visibility: hoverText == "Theme" ? "visible" : "hidden"}}>
            <h3>Theme</h3>
          </div>
          <div className="settingsButton settingsButtonHoverText" style={{backgroundColor: theme.primaryColor, visibility: hoverText == "Colour" ? "visible" : "hidden"}}>
            <h3>Colour</h3>
          </div>
          <div className="spacer"></div>
          <div className="settingsButton settingsButtonHoverText" style={{backgroundColor: theme.primaryColor, visibility: hoverText == "Github" ? "visible" : "hidden"}}>
            <h3>LinkedIn</h3>
          </div>
          <div className="settingsButton settingsButtonHoverText" style={{backgroundColor: theme.primaryColor, visibility: hoverText == "LinkedIn" ? "visible" : "hidden"}}>
            <h3>Github</h3>
          </div>
          <div className="settingsButton settingsButtonHoverTextBottom" style={{backgroundColor: theme.primaryColor, visibility: hoverText == "LeetCode" ? "visible" : "hidden"}}>
            <h3>LeetCode</h3>
          </div> */}
        </div>

        <div className="settingsButtonContainer">
        <SettingsButton value="Home" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={props.home} svgPath="./icons/home.svg" />
        <SettingsButton value="Settings" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={props.home} svgPath="./icons/settings.svg" />
        <SettingsButton value="Theme" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleBg} svgPath="./icons/theme.svg" />
        <SettingsButton value="Colour" updateHoverText={updateHoverText} resetHoverText={resetHoverText} onClick={toggleTheme} svgPath="./icons/colour.svg" />
        
          <div className="spacer" style={{backgroundColor: theme.primaryColor}}></div>
          <a href="https://github.com/LyonsXII">
            <div className="settingsButton settingsButtonLower" style={{backgroundColor: hoverText == "Github" ? theme.secondaryColor : theme.primaryColor}} onMouseOver={() => {updateHoverText("Github")}} onMouseLeave={() => {resetHoverText()}}>
            <img src="./icons/github.png"></img>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/michael-lyons-60186b170/" >
            <div className="settingsButton settingsButtonLower" style={{backgroundColor: hoverText == "LinkedIn" ? theme.secondaryColor : theme.primaryColor}} onMouseOver={() => {updateHoverText("LinkedIn")}} onMouseLeave={() => {resetHoverText()}}>
              <svg width="100px" height="100px" viewBox="0 0 50 50">
                <path fill="none" stroke="black" strokeWidth="6px" strokeLinejoin="round" strokeLinecap="round" d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/>

                <path fill="#ededed" d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/>
              </svg>
            </div>
          </a>
          <a href="https://leetcode.com/u/MichaelLyons/" >
            <div className="settingsButton settingsButtonLower" style={{backgroundColor: hoverText == "LeetCode" ? theme.secondaryColor : theme.primaryColor}} onMouseOver={() => {updateHoverText("LeetCode")}} onMouseLeave={() => {resetHoverText()}}>
              <svg width="800px" height="800px" viewBox="-2 -2 28 28">
                <path fill="none" stroke="black" strokeWidth="3.5px" strokeLinejoin="round" strokeLinecap="round" d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/>

                <path fill="#ededed" d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Settings
