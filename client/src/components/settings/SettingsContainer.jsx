import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledDiv = styled.div`
  color: ${(props) => props.theme.textColor};
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  width: 12%;
  display: flex;
`;

function SettingsContainer({ children, ...props }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledDiv theme={theme}>
        {children}
      </StyledDiv>
  )
}

export default SettingsContainer