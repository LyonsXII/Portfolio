import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledSettingsButton = styled.div`
  height: auto;
  min-height: 80px;
  width: 100%;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.primaryColor};
  border-top: ${(props) => props.type === "Lower" ? "4px solid black" : "none"};
  border-bottom: ${(props) => props.type === "Lower" ? "none" : "4px solid black"};

  :hover {
    background-color: ${props => props.theme.secondaryColor};
  }
`;

function SettingsButton(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <a href={props.link}>
      <StyledSettingsButton 
        theme={theme} 
        onMouseOver={() => {props.updateHoverText(props.value)}} 
        onMouseLeave={() => {props.resetHoverText()}} 
        onClick={props.onClick}
        type={props.type}
      >
        <img src={props.svgPath} height="100%" width="100%" style={{minHeight: "80px"}}></img>
      </StyledSettingsButton>
    </a>
  )
}

export default SettingsButton