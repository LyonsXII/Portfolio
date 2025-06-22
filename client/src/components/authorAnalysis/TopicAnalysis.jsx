import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { FullScreenBackground, FullScreenContainer, StyledIFrame } from './AuthorAnalysis.styles';

function TopicAnalysis({ toggleTopicGraph, topicAnalysisFile }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <FullScreenBackground onClick={toggleTopicGraph}/>
      <FullScreenContainer theme={theme}>
        <StyledIFrame
          src={topicAnalysisFile} 
          title="pyLDAvis Visualization"
        />
      </FullScreenContainer>
    </div>
  )
}

export default TopicAnalysis