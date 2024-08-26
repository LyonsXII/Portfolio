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
    <StyledSettingsButton onMouseOver={() => {props.updateHoverText(props.value)}} onMouseLeave={() => {props.resetHoverText()}} onClick={props.home}>
      <svg width="800px" height="800px" viewBox="-2 2 28 28" >
        <path fill="none" stroke="black" strokeWidth="3.5px" strokeLinejoin="round" strokeLinecap="round" d={props.svgPath}/>
        <path fill="#ededed" d={props.svgPath}/>
      </svg>
    </StyledSettingsButton>
  )
}

export default SettingsButton