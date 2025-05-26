import { styled, keyframes, css } from 'styled-components';

import { media } from '../../context/media';

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
  color: currentColor;
  display: inline-block;

  ${media.mobile`
    top: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
  `}

  ${media.desktop`
    top: 20px;
    right: 120px;
    width: 80px;
    height: 80px;
  `}
`;

export const SpinnerItem = styled.div`
  /* Default - width: 6.4px, height: 17.6px */
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 40%;
  background: antiqueWhite;
  border: 2px solid black;
  transform-origin: 50% 50%;
  animation: ${spinAnimation} 1.2s linear infinite;

  ${media.mobile`
    width: 3.84px;
    height: 10.56px;
    margin-top: -10px;

    ${({ $index }) => `
      transform: rotate(${$index * 30}deg) translate(0, -20px);
      animation-delay: ${-1.2 + $index * 0.1}s;
    `}
  `}

  ${media.desktop`
    width: 5.12px;
    height: 14.08px;

    ${({ $index }) => `
      transform: rotate(${$index * 30}deg) translate(0, -26px);
      animation-delay: ${-1.2 + $index * 0.1}s;
    `}
  `}
`;

export const StyledEndGameButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 20px;

  cursor: pointer;

  ${media.mobile`
    top: 20px;
    left: 20px;
    height: 60px;
    width: 60px;
    border: 3px solid black;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(7, 3, 3, 0.3), 
              inset 0 -3px 3px rgba(0, 0, 0, 0.6);
  `}

  ${media.desktop`
    top: 40px;
    left: ${({ $left }) => $left || "40px"};
    height: 80px;
    width: 80px;
    border: 4px solid black;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(7, 3, 3, 0.3), 
              inset 0 -4px 4px rgba(0, 0, 0, 0.6);

    &:hover {
      background-color: ${({ theme }) => theme.secondaryColor};
      transform: scale(1.01);
      transition: transform 0.2s ease, background-color 0.8s ease;
    }
  `}
`;

export const StyledEndGameIcon = styled.img`
  width: 75%;
  transition: transform 0.5s ease-in-out;

  &:hover {
    transform: rotate(-36deg);
  }
`