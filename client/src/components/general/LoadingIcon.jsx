import React, { useContext } from "react";
import styled from 'styled-components';

import { ThemeContext } from "../../context/ThemeContext";

import { spinAnimation, SpinnerContainer, SpinnerItem } from './General.styles';

function LoadingIcon({ src, toggleWordcloud }) {
  const { theme } = useContext(ThemeContext);

  return (
    <SpinnerContainer>
      {Array.from({ length: 12 }).map((_, i) => (
        <SpinnerItem key={i} $index={i} />
      ))}
    </SpinnerContainer>
  )
}

export default LoadingIcon