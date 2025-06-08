import React, { useState, useContext } from "react";
import styled from 'styled-components';

import { StyledSectionFlexbox, StyledSectionHeadingsFlexbox, StyledSectionRowTechStackFlexbox, StyledTechPairFlexbox, StyledTechIcon, StyledHeadingText, StyledBodyText } from "./Introduction.styles";

import { StyledPythonIcon, StyledJavascriptIcon, StyledHTMLIcon, StyledCSSIcon, StyledReactIcon, StyledEJSIcon, StyledBootstrapIcon, StyledMaterialUIIcon, StyledNodeJSIcon, StyledExpressIcon, StyledFlaskIcon, StyledGitIcon, StyledPostgresqlIcon, StyledVSCodeIcon, StyledPyCharmIcon, StyledPostmanIcon, StyledJupyterIcon } from "./TechStack.styles";

import { ThemeContext } from "../../context/ThemeContext";

function TechStack({ initialSection }) {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledSectionFlexbox $initialSection={initialSection} $sectionName="Tech Stack">
      <StyledSectionHeadingsFlexbox theme={theme} $paddingDesktop="10px 10px 10px 0px">
        <StyledSectionRowTechStackFlexbox>
          <StyledHeadingText>Languages:</StyledHeadingText>
          <StyledTechPairFlexbox>
            <StyledBodyText>Javascript</StyledBodyText>
            <StyledJavascriptIcon/>
          </StyledTechPairFlexbox>
          <StyledTechPairFlexbox>
            <StyledBodyText>Python</StyledBodyText>
            <StyledPythonIcon/>
          </StyledTechPairFlexbox>
        </StyledSectionRowTechStackFlexbox>

        <StyledSectionRowTechStackFlexbox>
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
            <StyledBodyText>Bootstrap</StyledBodyText>
            <StyledBootstrapIcon/>
          </StyledTechPairFlexbox>
          <StyledTechPairFlexbox>
            <StyledBodyText>Material UI</StyledBodyText>
            <StyledMaterialUIIcon/>
          </StyledTechPairFlexbox>
          <StyledTechPairFlexbox>
            <StyledBodyText>EJS</StyledBodyText>
            <StyledEJSIcon/>
          </StyledTechPairFlexbox>
        </StyledSectionRowTechStackFlexbox>

        <StyledSectionRowTechStackFlexbox>
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
        </StyledSectionRowTechStackFlexbox>

        <StyledSectionRowTechStackFlexbox $position="last">
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
            <StyledBodyText>Postman</StyledBodyText>
            <StyledPostmanIcon/>
          </StyledTechPairFlexbox>
          <StyledTechPairFlexbox>
            <StyledBodyText>Jupyter Notebook</StyledBodyText>
            <StyledJupyterIcon style={{height:"60px", width:"60px"}}/>
          </StyledTechPairFlexbox>
          <StyledTechPairFlexbox>
            <StyledBodyText>VS Code</StyledBodyText>
            <StyledVSCodeIcon/>
          </StyledTechPairFlexbox>
          <StyledTechPairFlexbox>
            <StyledBodyText>PyCharm</StyledBodyText>
            <StyledPyCharmIcon/>
          </StyledTechPairFlexbox>
        </StyledSectionRowTechStackFlexbox>
      </StyledSectionHeadingsFlexbox>
    </StyledSectionFlexbox>
  )
}

export default TechStack