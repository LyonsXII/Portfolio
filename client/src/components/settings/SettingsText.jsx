import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { StyledH4 } from "./Settings.styles";

const StyledSettingsText = styled.div`
  height: auto;
  min-height: 80px;
  width: auto;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.secondaryColor};
  // Text only visible when button hovered over
  visibility: ${({ $curr, $text }) => $curr === $text ? "visible" : "hidden"};
  margin-top: -4px;
  border-left: 4px solid black;
  border-top: 4px solid black;
  // Conditionally apply border radius and bottom border based on position
  border-bottom: ${({ $position }) => $position === "Bottom" ? "none" : "4px solid black"};
  border-radius: ${({ $position }) => 
    $position === "Top" ? "0px 0px 0px 20px" : 
    $position === "Bottom" ? "20px 0px 0px 0px" :
    "20px 0px 0px 20px"};
`;

function SettingsText({ text, curr, position}) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledSettingsText 
      theme={theme}
      $curr={curr}
      $text={text}
      $position={position}
    >
      <StyledH4>{text}</StyledH4>
    </StyledSettingsText>
  )
}

export default SettingsText