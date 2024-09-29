import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledDiv = styled.div`
  height: 100%;
  min-height: 80px;
  width: 33%;
  min-width: 80px;
  display: ${(props) => props.settingsHidden === false ? "flex" : "none"};
  flex-direction: column;
  align-items: center;
  border-left: 4px solid black;
  z-index: 2;
`;

function SettingsButtonContainer({ children, ...props }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledDiv theme={theme} settingsHidden={props.settingsHidden} onMouseOver={props.toggleButtonsVisible} onMouseLeave={props.toggleButtonsVisible} volume={props.volume}>
        {children}
      </StyledDiv>
  )
}

export default SettingsButtonContainer