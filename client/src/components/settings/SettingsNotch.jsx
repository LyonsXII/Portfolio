import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledSettingsDiv = styled.div`
  height: 100px;
  width: 1vw;
  background-color: antiquewhite;
  border: 4px solid black;
  border-right: none;
  border-radius: 20px 0px 0px 20px;
`;

function SettingsNotch(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <a href={props.link}>
      <StyledSettingsDiv onMouseOver={props.toggleButtonsVisible} onMouseLeave={props.toggleButtonsVisible}/>
    </a>
  )
}

export default SettingsNotch