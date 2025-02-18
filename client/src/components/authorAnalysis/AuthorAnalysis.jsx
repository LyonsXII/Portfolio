import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Plot from 'react-plotly.js';

import { ThemeContext } from "../../context/ThemeContext.jsx";
import { StyledFlexboxContainer, StyledMainButton, StyledTextField } from './AuthorAnalysis.styles';

function AuthorAnalysis({ transition }) {
  const { theme } = useContext(ThemeContext);

  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded(prev => !prev);
  }

  return (
    <StyledFlexboxContainer $transition={transition}>
      <StyledMainButton onClick={toggleExpanded}/>
      <StyledTextField $expanded={expanded}/>
    </StyledFlexboxContainer>
  )
}

export default AuthorAnalysis