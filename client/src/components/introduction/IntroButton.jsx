import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledButtonLeft = styled.button`
  height: 80px;
  width: 20vw;
  min-width: 130px;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.textColor};
  border: 4px solid black;
  border-radius: 20px 0px 0px 20px;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
  }
`;

const StyledButtonRight = styled.button`
  height: 80px;
  width: 4vw;
  margin-left: -4px;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.textColor};
  border: 4px solid black;
  border-radius: 0px 20px 20px 0px;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
  }
`;

function IntroButton(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{display: "flex"}}>
      <StyledButtonLeft theme={theme} onClick={props.choice}>
        <h4>{props.name}</h4>
      </StyledButtonLeft>
      <StyledButtonRight theme={theme} onClick={props.activate}/>
    </div>
  )
}

export default IntroButton