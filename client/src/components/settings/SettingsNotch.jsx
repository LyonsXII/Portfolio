import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const StyledSettingsDiv = styled.div.attrs(({ settingsHidden, ...rest}) => rest)`
  height: 100px;
  width: 1vw;
  background-color: ${({theme}) => theme.primaryColor};
  border: 4px solid black;
  border-right: none;
  border-radius: 20px 0px 0px 20px;
  position: absolute;
  top: calc(50% - 50px);
  right: ${({settingsHidden}) => settingsHidden === true ? "0px" : "84px"};
  z-index: 3;
`;

function SettingsNotch({ settingsHidden, toggleButtonsVisible }) {
  const { theme } = useContext(ThemeContext);
  const { clickSound } = useContext(AudioContext);

  function toggle() {
    toggleButtonsVisible();
    clickSound();
  }

  return (
    <StyledSettingsDiv theme={theme} onClick={toggle} settingsHidden={settingsHidden}/>
  )
}

export default SettingsNotch