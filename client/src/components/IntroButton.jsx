import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../context/ThemeContext";

const StyledButton = styled.button`
  height: 80px;
  width: 300px;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.textColor};
  border: 4px solid black;
  border-radius: 20px;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
  }
`;

function IntroButton(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledButton theme={theme}>
      <h3>{props.name}</h3>
    </StyledButton>
  )
}

export default IntroButton