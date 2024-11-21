import styled from 'styled-components';

import { slideInTopAnimation, slideOutBottomAnimation, bounceDownAnimation } from '../../context/Animations';

export const StyledContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 94vw;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 36%;
  gap: 40px;
  margin-right: 4vw;
`;

export const StyledIntroContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0 2%;
  padding: 0px 40px;

  animation: ${({ $current, $title }) => 
    $current === $title 
      ? slideInTopAnimation
      : slideOutBottomAnimation
  };
`;

export const StyledGalleryContainer = styled.div`
  width: 28%;
  margin: 0 4%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Source - Temani Afif, taken from the article "https://freefrontend.com/css-gallery/"
export const StyledGallery = styled.div`
  --s: 200px; /* control the size of the images*/
  
  display: grid;
  grid-template-columns: repeat(3,auto);
  gap: 20px;
  position: relative;
  animation: ${bounceDownAnimation};
`;

export const StyledInput = styled.input`
  position: absolute;
  border: 6px solid #000;
  border-radius: 50%;
  inset: calc(49% - var(--s)/3);
  cursor: pointer;
  --g: linear-gradient(#000 0 0) no-repeat;
  background: var(--g) 50%/var(--b,0%) 8px,var(--g) 50%/8px var(--b,0%);
  transition: transform 1.2s, background 0.6s, box-shadow 0.2s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: ${({ theme }) => theme.primaryColor};

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
    box-shadow: 0 0px 10px rgba(255, 255, 255, 0.3);
  }

  &:checked ~ img {
    transform: scale(1);
    filter: brightness(1);
    pointer-events: initial;
    transform: translateY(-40px);
  }

  &:checked {
    border: 8px solid #000;
    transform: translateY(calc(1.85 * var(--s))) scale(0.5) rotate(45deg);
    --b: 70%;
  }
`;

export const StyledGalleryImage = styled.img`
  border: 4px solid black;
  border: ${({ theme }) => `4px solid ${theme.primaryColor}`};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  width: var(--s);
  aspect-ratio: 1;
  object-fit: cover;
  transform: scale(.1);
  filter: brightness(0);
  pointer-events: none;
  transform-origin: var(--x) var(--y);
  transition: 1s calc((var(--i) - 1)*.02s);

  &:hover {
    transition: 0.2s;
    box-shadow: 0 0px 10px rgba(255, 255, 255, 1);
    border: ${({ theme }) => `4px solid ${theme.secondaryColor}`};
  }

  &:nth-of-type(1) {
    border-radius: 40px 0px 0px 0px;
    --i: 1;
    --x: 155%;
    --y: 155%;
  }

  &:nth-of-type(2) {
    --i: 2;
    --x: 50%;
    --y: 155%;
  }

  &:nth-of-type(3) {
    border-radius: 0px 40px 0px 0px;
    --i: 3;
    --x: -55%;
    --y: 155%;
  }

  &:nth-of-type(4) {
    --i: 4;
    --x: 155%;
    --y: 50%;
  }

  &:nth-of-type(5) {
    --i: 5;
  }

  &:nth-of-type(6) {
    --i: 6;
    --x: -55%;
    --y: 50%;
  }

  &:nth-of-type(7) {
    border-radius: 0px 0px 0px 40px;
    --i: 7;
    --x: 155%;
    --y: -55%;
  }

  &:nth-of-type(8) {
    --i: 8;
    --x: 50%;
    --y: -55%;
  }

  &:nth-of-type(9) {
    border-radius: 0px 0px 40px 0px;
    --i: 9;
    --x: -55%;
    --y: -55%;
  }
`;

export const StyledTitle = styled.h1`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 8rem;
`;

export const StyledMinorTitle = styled.h3`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 3rem;
`;

export const StyledBodyText = styled.p`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);
  font-size: 1.4rem;
`;