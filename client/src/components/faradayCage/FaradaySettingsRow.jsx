import React, { useContext, useEffect } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

import { StyledRowContainer, StyledIncrementButton, StyledTextBox, StyledTextBoxDivider, StyledTextH4, StyledPlusIcon, StyledPlusIconMobile, StyledMinusIcon, StyledMinusIconMobile } from './FaradayCage.styles';

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
      <StyledIncrementButton theme={theme} $position="top" onClick={() => {onClickHandler("Subtract")}}>
        <StyledMinusIcon $display="desktop"/>
        <StyledMinusIconMobile $display="mobile"/>
      </StyledIncrementButton>
      <StyledTextBox theme={theme}>
        <StyledTextBoxDivider theme={theme} $position="first" $colour="main" $grow={true}>
          <StyledTextH4>{name}</StyledTextH4>
        </StyledTextBoxDivider>
        <StyledTextBoxDivider theme={theme} $divider={true}>
          <StyledTextH4>{value}</StyledTextH4>
        </StyledTextBoxDivider>
      </StyledTextBox>
      <StyledIncrementButton theme={theme} $position="bottom" onClick={() => {onClickHandler("Add")}}>
        <StyledPlusIcon $display="desktop"/>
        <StyledPlusIconMobile $display="mobile"/>
      </StyledIncrementButton>
    </StyledRowContainer>
  )
}

export default FaradaySettingsRow