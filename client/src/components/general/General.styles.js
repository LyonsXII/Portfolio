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
  top: 100px;
  left: 0px;
  color: currentColor;
  display: inline-block;
  position: relative;
  width: 120px;
  height: 120px;
`;

export const SpinnerItem = styled.div`
  position: absolute;
  top: 3.2px;
  left: 36.8px;
  width: 6.4px;
  height: 17.6px;
  border-radius: 20%;
  background: currentColor;
  transform-origin: 40px 40px;
  animation: ${spinAnimation} 1.2s linear infinite;
  ${({ $index }) => `
    transform: rotate(${$index * 30}deg);
    animation-delay: ${-1.2 + $index * 0.1}s;
  `}
`;