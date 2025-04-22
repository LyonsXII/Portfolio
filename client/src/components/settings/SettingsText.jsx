import React, { useContext } from "react";
import styled from 'styled-components';

import { StyledSettingsText, StyledH4 } from "./Settings.styles";

import { ThemeContext } from "../../context/ThemeContext";

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