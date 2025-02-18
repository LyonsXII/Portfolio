import styled from 'styled-components';

import { slideInTopAnimation, slideOutRightAnimation, bounceDownAnimation } from '../../context/Animations';

export const StyledFlexboxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;

  animation: ${({ $transition } ) => !$transition ? slideInTopAnimation : slideOutRightAnimation};
`;

export const StyledMainButton = styled.button`
  height: 200px;
  width: 200px;
  border: 6px solid #000;
  border-radius: 50%;
`

export const StyledTextField = styled.input`
  height: 200px;
  width: 800px;
  border: 6px solid #000;
  border-radius: 0px 50px 50px 0px;
`