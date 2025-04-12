import styled from "styled-components";

const createStyledIcon = (IconComponent) => styled(IconComponent)`
  height: 50px;
  width: 50px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

// Generating styled components for each tech icon used
// Done externally to avoid cluttering TechStack.jsx with SVG path definitions

// Import SVG icon files
import PythonIcon from "./icons/python.svg?react";
import JavascriptIcon from "./icons/javascript.svg?react";
import HTMLIcon from "./icons/html.svg?react";
import CSSIcon from "./icons/css.svg?react";
import ReactIcon from "./icons/react.svg?react";
import EJSIcon from "./icons/ejs.svg?react";
import BootstrapIcon from "./icons/bootstrap.svg?react";
import MaterialUIIcon from "./icons/material-ui.svg?react";
import NodeJSIcon from "./icons/nodejs.svg?react";
import ExpressIcon from "./icons/express.svg?react";
import FlaskIcon from "./icons/flask.svg?react";
import GitIcon from "./icons/git.svg?react";
import PostgresqlIcon from "./icons/postgresql.svg?react";
import VSCodeIcon from "./icons/vs-code.svg?react";
import PyCharmIcon from "./icons/pycharm.svg?react";
import PostmanIcon from "./icons/postman.svg?react";
import JupyterIcon from "./icons/jupyter-notebook.svg?react";

// Export styled component for each icon
export const StyledPythonIcon = createStyledIcon(PythonIcon);
export const StyledJavascriptIcon = createStyledIcon(JavascriptIcon);
export const StyledHTMLIcon = createStyledIcon(HTMLIcon);
export const StyledCSSIcon = createStyledIcon(CSSIcon);
export const StyledReactIcon = createStyledIcon(ReactIcon);
export const StyledEJSIcon = createStyledIcon(EJSIcon);
export const StyledBootstrapIcon = createStyledIcon(BootstrapIcon);
export const StyledMaterialUIIcon = createStyledIcon(MaterialUIIcon);
export const StyledNodeJSIcon = createStyledIcon(NodeJSIcon);
export const StyledExpressIcon = createStyledIcon(ExpressIcon);
export const StyledFlaskIcon = createStyledIcon(FlaskIcon);
export const StyledGitIcon = createStyledIcon(GitIcon);
export const StyledPostgresqlIcon = createStyledIcon(PostgresqlIcon);
export const StyledVSCodeIcon = createStyledIcon(VSCodeIcon);
export const StyledPyCharmIcon = createStyledIcon(PyCharmIcon);
export const StyledPostmanIcon = createStyledIcon(PostmanIcon);
export const StyledJupyterIcon = createStyledIcon(JupyterIcon);