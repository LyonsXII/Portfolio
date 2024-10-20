import React, { useState, useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "../../context/ThemeContext";

const StyledFlexboxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FaradayCage(props) {
  // Produces x and y coordinates for a polygon of the specified number of sides
  function poly(sides) {
    const degrees = Array.from({ length: 361 }, (_, i) => (i * 2 * Math.PI) / 360);
    const p = degrees.map(deg => Math.cos(deg)); // Store cosine values
    const s = degrees.map(deg => Math.sin(deg)); // Store sine values

    const step = Math.floor(360 / sides); // Calculate step size for plotting the polygon

    const x1 = []; // X coordinates
    const y1 = []; // Y coordinates
    for (let i = 0; i <= 360; i += step) {
        x1.push(p[i]);
        y1.push(s[i]);
    }

    return { x1, y1 };
  }

  function divisor(x1, y1, n) {

  }

  


  return (
    <StyledFlexboxContainer>
      <h4>Hey</h4>
    </StyledFlexboxContainer>
  )
}

export default FaradayCage