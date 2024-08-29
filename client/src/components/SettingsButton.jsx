import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../context/ThemeContext";

const StyledSettingsButton = styled.div`
  height: auto;
  min-height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.primaryColor};
  border-bottom: 4px solid black;

  :hover {
    background-color: ${props => props.theme.secondaryColor};
  }
`;

function SettingsButton(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledSettingsButton theme={theme} onMouseOver={() => {props.updateHoverText(props.value)}} onMouseLeave={() => {props.resetHoverText()}} onClick={props.home}>
      <img src={props.svgPath} ></img>
      <object id="my-svg" type="image/svg+xml" data={props.svgPath}></object>
    </StyledSettingsButton>
  )
}

export default SettingsButton