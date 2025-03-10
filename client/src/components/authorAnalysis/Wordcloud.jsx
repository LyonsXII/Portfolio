import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { FullScreenBackground, FullScreenContainer, StyledWordcloud } from './AuthorAnalysis.styles';

function Wordcloud({ src, toggleWordcloud }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <FullScreenBackground onClick={toggleWordcloud}/>
      <FullScreenContainer theme={theme} onClick={toggleWordcloud}>
        <StyledWordcloud src={src}/>
      </FullScreenContainer>
    </div>
  )
}

export default Wordcloud