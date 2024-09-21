import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledSettingsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 1;
  opacity: 0.8;
  display: ${(props) => props.settingsMenuHidden === true ? "none" : "inline"};
`;

const StyledFlexbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.primaryColor};
  display: ${(props) => props.settingsMenuHidden === true ? "none" : "flex"};
  justify-content: center;
  align-items: center;
`;

const StyledSettingsHeader = styled.div`
  height: 8vh;
  width: 70vw;
  background-color: ${(props) => props.theme.secondaryColor};
  border-radius: 20px 20px 0px 0px;
  border-bottom: 4px solid black;
  z-index: 4;
  display: ${(props) => props.settingsMenuHidden === true ? "none" : "flex"};
  justify-self: center;
  align-self: flex-start;
`;

const StyledSettingsHeaderElement = styled.div`
  height: 100%;
  padding: 0px 2vw 0px 2vw;
  border-radius: ${props => props.position === "First" ? "20px 0px 0px 0px" : "0px"};
  border-right: 4px solid black;
  background-color: ${(props) => props.active === props.value ? props.theme.secondaryColor : props.theme.primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSettingsContainer = styled.div`
  height: 60vh;
  width: 70vw;
  background-color: ${(props) => props.theme.primaryColor};
  border: 4px solid black;
  border-radius: 20px;
  z-index: 3;
  display: ${(props) => props.settingsMenuHidden === true ? "none" : "flex"};
  justify-content: center;
  align-items: center;
`;

function SettingsMenu(props) {
  const { theme } = useContext(ThemeContext);

  const [active, setActive] = useState("General");

  function updateCurrent() {

  }

  return (
    <div>
    <StyledSettingsBackground theme={theme} settingsMenuHidden={props.settingsMenuHidden}/>
    <StyledFlexbox settingsMenuHidden={props.settingsMenuHidden}>
      <StyledSettingsContainer theme={theme}>
        <StyledSettingsHeader theme={theme}>
          <StyledSettingsHeaderElement theme={theme} value="General" position="First" active={active}>
            <h3>General</h3>
          </StyledSettingsHeaderElement>
          <StyledSettingsHeaderElement theme={theme} value="Song Guesser" active={active}>
            <h3>Song Guesser</h3>
          </StyledSettingsHeaderElement>
          <StyledSettingsHeaderElement theme={theme} value="Faraday Cage" active={active}>
            <h3>Faraday Cage</h3>
          </StyledSettingsHeaderElement>
          <StyledSettingsHeaderElement theme={theme} value="Book Notes" position="Last" active={active}>
            <h3>Book Notes</h3>
          </StyledSettingsHeaderElement>
        </StyledSettingsHeader>
      </StyledSettingsContainer>
    </StyledFlexbox>
    </div>
  )
}

export default SettingsMenu