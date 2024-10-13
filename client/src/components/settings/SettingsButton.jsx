import React, { useContext, useEffect } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const StyledSettingsButton = styled.div`
  height: auto;
  min-height: 80px;
  width: 100%;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryColor};
  border-top: ${({ type }) => type === "Lower" ? "4px solid black" : "none"};
  border-bottom: ${({ type }) => type === "Lower" ? "none" : "4px solid black"};

  :hover {
    background-color: ${props => props.theme.secondaryColor};
  }
`;

function SettingsButton({ value, svgPath, link, type, onClick, updateHoverText, resetHoverText }) {
  const { theme } = useContext(ThemeContext);
  const { volume } = useContext(AudioContext);

  const click = new Audio("./music/misc/Click.mp3");
  click.volume = volume / 100;

  function onClickHandler() {
    onClick();
    click.play();
  }

  useEffect(() => {
    if (volume) {click.volume = volume / 100}
  }, [volume]);

  return (
    <a href={link}>
      <StyledSettingsButton 
        theme={theme} 
        onMouseOver={() => {updateHoverText(value)}} 
        onMouseLeave={() => {resetHoverText()}} 
        onClick={onClickHandler}
        type={type}
      >
        <img src={svgPath} height="100%" width="100%" style={{minHeight: "80px"}}></img>
      </StyledSettingsButton>
    </a>
  )
}

export default SettingsButton