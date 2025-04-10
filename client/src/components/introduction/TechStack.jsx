import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledSectionHeadingsFlexbox, StyledSectionRowFlexbox, StyledTechPairFlexbox, StyledTechIcon, StyledHeadingText, StyledBodyText } from "./Introduction.styles";

import { StyledPythonIcon, StyledJavascriptIcon, StyledHTMLIcon, StyledCSSIcon, StyledReactIcon, StyledEJSIcon, StyledBootstrapIcon, StyledMaterialUIIcon, StyledNodeJSIcon, StyledExpressIcon, StyledFlaskIcon, StyledGitIcon, StyledPostgresqlIcon } from "./TechStack.styles";

import { ThemeContext } from "../../context/ThemeContext";

function TechStack() {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledSectionHeadingsFlexbox theme={theme}>
      <StyledSectionRowFlexbox>
        <StyledHeadingText>Languages:</StyledHeadingText>
        <StyledTechPairFlexbox>
          <StyledBodyText>Javascript</StyledBodyText>
          <StyledJavascriptIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>Python</StyledBodyText>
          <StyledPythonIcon/>
        </StyledTechPairFlexbox>
      </StyledSectionRowFlexbox>

      <StyledSectionRowFlexbox>
        <StyledHeadingText>Front End:</StyledHeadingText>
        <StyledTechPairFlexbox>
          <StyledBodyText>HTML</StyledBodyText>
          <StyledHTMLIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>CSS</StyledBodyText>
          <StyledCSSIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>React</StyledBodyText>
          <StyledReactIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>EJS</StyledBodyText>
          <StyledEJSIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>Bootstrap</StyledBodyText>
          <StyledBootstrapIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>Material UI</StyledBodyText>
          <StyledMaterialUIIcon/>
        </StyledTechPairFlexbox>
      </StyledSectionRowFlexbox>

      <StyledSectionRowFlexbox>
        <StyledHeadingText>Back End:</StyledHeadingText>
        <StyledTechPairFlexbox>
          <StyledBodyText>Node.js</StyledBodyText>
          <StyledNodeJSIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>Express</StyledBodyText>
          <StyledExpressIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>Flask</StyledBodyText>
          <StyledFlaskIcon/>
        </StyledTechPairFlexbox>
      </StyledSectionRowFlexbox>

      <StyledSectionRowFlexbox>
        <StyledHeadingText>Tools & Platforms:</StyledHeadingText>
        <StyledTechPairFlexbox>
          <StyledBodyText>Git</StyledBodyText>
          <StyledGitIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>PostgreSQL</StyledBodyText>
          <StyledPostgresqlIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>VS Code</StyledBodyText>
          <StyledPythonIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>PyCharm</StyledBodyText>
          <StyledPythonIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>Postman</StyledBodyText>
          <StyledPythonIcon/>
        </StyledTechPairFlexbox>
        <StyledTechPairFlexbox>
          <StyledBodyText>Jupyter Notebook</StyledBodyText>
          <StyledPythonIcon/>
        </StyledTechPairFlexbox>
      </StyledSectionRowFlexbox>
    </StyledSectionHeadingsFlexbox>
  )
}

export default TechStack