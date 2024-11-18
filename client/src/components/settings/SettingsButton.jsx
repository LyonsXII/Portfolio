import React, { useContext, useEffect } from "react";
import styled from 'styled-components';

import { StyledSettingsButton } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

function SettingsButton({ value, svgPath, link, type, onClick, updateHoverText, resetHoverText }) {
  const { theme } = useContext(ThemeContext);
  const { volume, clickSound } = useContext(AudioContext);

  function onClickHandler() {
    onClick();
    clickSound();
  }

  return (
    <a href={link}>
      <StyledSettingsButton 
        theme={theme} 
        onMouseOver={() => {updateHoverText(value)}} 
        onMouseLeave={() => {resetHoverText()}} 
        onClick={onClickHandler}
        type={type}
      >
        <img src={svgPath} height="100%" width="100%" style={{minHeight: "80px"}}/>
      </StyledSettingsButton>
    </a>
  )
}

export default SettingsButton