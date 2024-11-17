import styled from 'styled-components';

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
`;

export const StyledGalleryContainer = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Source - Temani Afif, taken from the article "https://freefrontend.com/css-gallery/"
export const StyledGallery = styled.div`
  --s: 200px; /* control the size of the images*/
  
  display: grid;
  grid-template-columns: repeat(3,auto);
  gap: 5px;
  position: relative;
`;

export const StyledInput = styled.input`
  position: absolute;
  border: 2px solid #000;
  border-radius: 50%;
  inset: calc(50% - var(--s)/3);
  cursor: pointer;
  --g: linear-gradient(#000 0 0) no-repeat;
  background: var(--g) 50%/var(--b,0%) 3px,var(--g) 50%/3px var(--b,0%);
  transition: 1.5s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:checked ~ img {
    transform: scale(1);
    filter: brightness(1);
    pointer-events: initial;
  }

  &:checked {
    transform: translateY(calc(1.75 * var(--s))) scale(0.5) rotate(45deg);
    --b: 70%;
  }
`;

export const StyledGalleryImage = styled.img`
  width: var(--s);
  aspect-ratio: 1;
  object-fit: cover;
  transform: scale(.1);
  filter: brightness(0);
  pointer-events: none;
  transform-origin: var(--x) var(--y);
  transition: 1s calc((var(--i) - 1)*.1s);

  &:nth-of-type(1) {
    --i: 1;
    --x: 150%;
    --y: 150%;
  }

  &:nth-of-type(2) {
    --i: 2;
    --x: 50%;
    --y: 150%;
  }

  &:nth-of-type(3) {
    --i: 3;
    --x: -50%;
    --y: 150%;
  }

  &:nth-of-type(4) {
    --i: 4;
    --x: 150%;
    --y: 50%;
  }

  &:nth-of-type(5) {
    --i: 5;
  }

  &:nth-of-type(6) {
    --i: 6;
    --x: -50%;
    --y: 50%;
  }

  &:nth-of-type(7) {
    --i: 7;
    --x: 150%;
    --y: -50%;
  }

  &:nth-of-type(8) {
    --i: 8;
    --x: 50%;
    --y: -50%;
  }

  &:nth-of-type(9) {
    --i: 9;
    --x: -50%;
    --y: -50%;
  }
`;

export const StyledTitle = styled.h1`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);   
`;

export const StyledMinorTitle = styled.h3`
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),
              0px 0px 10px rgba(0, 0, 0, 1),               
              0px 0px 10px rgba(0, 0, 0, 1);   
`;