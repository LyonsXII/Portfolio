import { keyframes, css } from 'styled-components';

export const growInput = keyframes`
  0% {
    width: 0px;
  }
  100% {
    width: 800px;
  }
`;

export const shrinkInput = keyframes`
  0% {
    width: 800px;
  }
  100% {
    width: 0px;
  }
`;