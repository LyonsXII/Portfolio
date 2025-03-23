import styled from 'styled-components';
import { keyframes, css } from 'styled-components';

export const spinAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const SpinnerContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  color: currentColor;
  display: inline-block;
  width: 80px;
  height: 80px;
  // border: 1px solid yellow;
`;

export const SpinnerItem = styled.div`
  /* Default - width: 6.4px, height: 17.6px */
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5.12px;
  height: 14.08px;
  border-radius: 40%;
  background: antiqueWhite;
  border: 2px solid black;
  transform-origin: 50% 50%;
  animation: ${spinAnimation} 1.2s linear infinite;
  ${({ $index }) => `
    transform: rotate(${$index * 30}deg) translate(0, -26px);
    animation-delay: ${-1.2 + $index * 0.1}s;
  `}
`;