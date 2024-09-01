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
  background-color: ${props => props.theme.primaryColor};
  visibility: visible;
  border-bottom: 4px solid black;
  margin-top: -4px;
  border-top: 4px solid black;
  border-left: 4px solid black;
  border-radius: 20px 0px 0px 20px;
`;

function SettingsText(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledSettingsText>
      <h3>{props.text}</h3>
    </StyledSettingsText>
  )
}

export default SettingsText