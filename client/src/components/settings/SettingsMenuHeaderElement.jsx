import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledElement = styled.div`
  height: 100%;
  width: 100%;
  white-space: nowrap;
  padding: 0px 2vw 0px 2vw;
  border-radius: ${props => props.position === "First" ? "20px 0px 0px 0px" :
    props.position === "Last" ? "0px 20px 0px 0px" : "0px"};
  border-right: ${props => props.position === "Last" ? "none" : "4px solid black"};
  background-color: ${props => props.value === props.active ? props.theme.secondaryColor : props.theme.primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SettingsMenuHeaderElement(props) {
  const { theme } = useContext(ThemeContext);

  const click = new Audio("./music/misc/Click.mp3");

  function updateActive(value) {
    click.play();
    props.updateActive(props.value);
  }

  return (
    <StyledElement theme={theme} value={props.value} position={props.position} active={props.active} onClick={ updateActive}>
      <h3>{props.value}</h3>
    </StyledElement>
  )
}

export default SettingsMenuHeaderElement