import { keyframes, css } from 'styled-components';

export const flicker = (textColour ) => keyframes`
  0%, 5% {
    transform: translate(-0.2rem, 1rem) rotate(10deg);
    color: ${textColour};
    text-shadow: 
      3px 3px 6px #000,
      -3px -3px 6px #000,  
      3px -3px 6px #000,
      -3px 3px 6px #000,
      3px 3px 6px #000,
      0 0 2rem rgb(255, 255, 255);
  }
  5.5%, 7% {
    transform: translate(-0.2rem, 1rem) rotate(10deg);
  }
  6%, 6.5%, 8%, 50%, 100% {
    transform: translate(-0.2rem, 1rem) rotate(10deg);
  }
  50% {
    transform: translate(-0.2rem, 1rem) rotate(13deg);
  }
`;