import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../../context/ThemeContext";

const StyledButton = styled.button`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.primaryColor};
  border-radius: 10px;
  border: 4px solid black;
  grid-column: ${props => props.columns};
  grid-column-start: ${props => props.start ? props.start : null};
  grid-column-end: ${props => props.end ? props.end : null};
  grid-row: ${props => props.rows};
  color: ${(props) => props.theme.textColor};
  box-shadow: 0px 0px 10px black;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.tertiaryColor};
  }
`;

function SongGuesserButton(props) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledButton theme={theme} columns={props.columns} rows={props.rows} start={props.start} end={props.end} onClick={() => {props.onClick(props.value)}}>
      <h3>{props.name}</h3>
    </StyledButton>
  )
}

export default SongGuesserButton