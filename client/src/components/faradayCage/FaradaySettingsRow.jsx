import React, { useContext, useEffect } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

import { StyledDiv, StyledRowContainer, StyledIncrementButton, StyledTextH4 } from './FaradayCage.styles';

function FaradaySettingsRow({ name, value, onClick }) {
  const { theme } = useContext(ThemeContext);
  const { volume } = useContext(AudioContext);

  const { clickSound } = useContext(AudioContext);

  function onClickHandler(param) {
    onClick(param);
    clickSound();
  } 

  return (
    <StyledRowContainer>
      <StyledIncrementButton theme={theme} onClick={() => {onClickHandler("Subtract")}}>
        <img src="./icons/minus.svg" height="100%" width="100%" style={{minHeight: "50px", marginTop: "14px"}}></img>
      </StyledIncrementButton>
      <StyledDiv theme={theme}>
        <StyledTextH4>{name}</StyledTextH4>
        <StyledTextH4>{value}</StyledTextH4>
      </StyledDiv>
      <StyledIncrementButton theme={theme} onClick={() => {onClickHandler("Add")}}>
        <img src="./icons/plus.svg" height="100%" width="100%" style={{minHeight: "50px", marginTop: "14px"}}></img>
      </StyledIncrementButton>
    </StyledRowContainer>
  )
}

export default FaradaySettingsRow