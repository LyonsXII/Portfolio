import React, { useState } from "react";

function Settings() {
  const [hoverText, setHoverText] = useState("Settings");
  const [hoverTextVisible, setHoverTextVisible] = useState(true);

  function updateHoverText(text) {
    setHoverText(text);
  }

  return (
    <div className="settingsContainer">
      <div className="settingsButton" onMouseOver={updateHoverText("Settings")}>
        <img src="./icons/settings.svg" alt="Settings"></img>
      </div>
      <div className="settingsButton" onMouseOver={updateHoverText("Theme")}>
        <img src="./icons/theme.svg" alt="Theme"></img>
      </div>
      <div className="settingsButton" onMouseOver={updateHoverText("Colour")}>
        <img src="./icons/colour.svg" alt="Colour"></img>
      </div>

      {hoverTextVisible ? 
        <div className="hoverText">{hoverText}</div> 
        : null} 
    </div>
  )
}

export default Settings
