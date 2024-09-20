import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledSettingsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 1;
  opacity: 0.9;
  display: ${(props) => props.settingsMenuHidden === true ? "none" : "inline"};
`;

function SettingsMenu(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledSettingsContainer theme={theme} settingsMenuHidden={props.settingsMenuHidden}>

    </StyledSettingsContainer>
  )
}

export default SettingsMenu