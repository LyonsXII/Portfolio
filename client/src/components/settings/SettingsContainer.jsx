import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledDiv = styled.div`
  color: ${(props) => props.theme.textColor};
  height: 100vh;
  width: 12vw;
  display: ${(props) => props.settingsHidden === false ? "flex" : "none"};
  justify-content: flex-end;
`;

function SettingsContainer({ children, ...props }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledDiv theme={theme} settingsHidden={props.settingsHidden}>
        {children}
      </StyledDiv>
  )
}

export default SettingsContainer