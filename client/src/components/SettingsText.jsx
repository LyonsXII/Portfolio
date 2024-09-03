import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../context/ThemeContext";

const StyledSettingsText = styled.div`
  height: auto;
  min-height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.primaryColor};
  // Text only visible when button hovered over
  visibility: ${(props) => props.curr === props.text ? "visible" : "hidden"};
  margin-top: -4px;
  border-left: 4px solid black;
  border-top: 4px solid black;
  // Conditionally apply border radius and bottom border based on prop.position
  border-bottom: ${(props) => props.position === "Bottom" ? "none" : "4px solid black"};
  border-radius: ${(props) => 
    props.position === "Top" ? "0px 0px 0px 20px" : 
    props.position === "Bottom" ? "20px 0px 0px 0px" :
    "20px 0px 0px 20px"};
`;

function SettingsText(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledSettingsText 
      theme={theme}
      curr={props.curr}
      text={props.text}
      position={props.position}
    >
      <h3>{props.text}</h3>
    </StyledSettingsText>
  )
}

export default SettingsText