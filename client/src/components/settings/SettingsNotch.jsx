import React, { useContext, useEffect } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const StyledSettingsDiv = styled.div`
  height: 100px;
  width: 1vw;
  background-color: ${(props) => props.theme.primaryColor};
  border: 4px solid black;
  border-right: none;
  border-radius: 20px 0px 0px 20px;
  position: absolute;
  top: calc(50% - 50px);
  right: ${(props) => props.settingsHidden === true ? "0px" : "84px"};
  z-index: 3;
`;

function SettingsNotch(props) {
  const { theme } = useContext(ThemeContext);
  const { volume } = useContext(AudioContext);

  const click = new Audio("./music/misc/Click.mp3");
  click.volume = volume / 100;

  function toggle() {
    props.toggleButtonsVisible();
    click.play();
  }

  useEffect(() => {
    if (volume) {click.volume = volume / 100}
  }, [volume]);
  
  return (
    <a href={props.link}>
      <StyledSettingsDiv theme={theme} onClick={toggle} settingsHidden={props.settingsHidden}/>
    </a>
  )
}

export default SettingsNotch