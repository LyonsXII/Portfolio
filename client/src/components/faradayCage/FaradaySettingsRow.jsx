import React, { useContext, useEffect } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";

const StyledRowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledButton = styled.button`
  width: auto;
  min-width: 160px;
  padding: 15px 30px;
  word-wrap: break-word;
  white-space: normal;
  border: 4px solid black;
  border-radius: 20px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.primaryColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
    transform: scale(1.01);
    transition: transform 0.2s ease, background-color 0.8s ease;
  }
`;

const StyledIncrementButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  padding: 0px;
  border: 4px solid black;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.primaryColor};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: ${({ theme }) => theme.tertiaryColor};
    transform: scale(1.01);
    transition: transform 0.1s ease, background-color 0.8s ease;
  }
`;

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
      <StyledButton theme={theme}>
        <h4>{name}</h4>
        <h4>{value}</h4>
      </StyledButton>
      <StyledIncrementButton theme={theme} onClick={() => {onClickHandler("Add")}}>
        <img src="./icons/plus.svg" height="100%" width="100%" style={{minHeight: "50px", marginTop: "14px"}}></img>
      </StyledIncrementButton>
    </StyledRowContainer>
  )
}

export default FaradaySettingsRow