import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

const StyledDiv = styled.div`
  height: 100%;
  width: 67%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function SettingsTextContainer({ children, ...props }) {
  const { theme } = useContext(ThemeContext);

  return (
      <StyledDiv theme={theme}>
        {children}
      </StyledDiv>
  )
}

export default SettingsTextContainer