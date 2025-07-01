import React, { useContext, useEffect } from "react";
import styled from 'styled-components';

import { StyledLinkContainer, StyledSettingsButton, StyledSVG } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

function SettingsButton({ value, svgPath, link, download, type, position, onClick, updateHoverText, resetHoverText, mobile, mobileOrder, mobileEnd }) {
  const { theme } = useContext(ThemeContext);
  const { volume, clickSound } = useContext(AudioContext);

  function onClickHandler() {
    onClick();
    clickSound();
  }

  return (
    <StyledLinkContainer href={link} download={download} $mobileOrder={mobileOrder}>
      <StyledSettingsButton
        theme={theme} 
        onMouseOver={() => {updateHoverText(value)}} 
        onMouseLeave={() => {resetHoverText()}} 
        onClick={onClickHandler}
        $type={type}
        $position={position}
        $mobile={mobile}
        $mobileEnd={mobileEnd}
      >
        <StyledSVG src={svgPath}/>
      </StyledSettingsButton>
    </StyledLinkContainer>
  )
}

export default SettingsButton