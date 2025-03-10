import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { FullScreenBackground, FullScreenContainer, StyledIFrame } from './AuthorAnalysis.styles';

function TopicAnalysis({ toggleTopicGraph }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <FullScreenBackground onClick={toggleTopicGraph}/>
      <FullScreenContainer theme={theme}>
        <StyledIFrame
          src="/lda_vis.html" 
          title="pyLDAvis Visualization"
        />
      </FullScreenContainer>
    </div>
  )
}

export default TopicAnalysis