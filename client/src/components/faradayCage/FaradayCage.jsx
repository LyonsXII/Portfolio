import React, { useState, useContext } from "react";
import styled from "styled-components";
import { exp, matrix, size, ones, log, abs, concat, multiply, transpose, sqrt, complex, max, round, lusolve } from "mathjs";

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

  function CHT(n, r, sides) {
    // Calculate disk centers
    const c = [];
    for (let i = 1; i <= n; i++) {
      c.push(exp(complex(0, 2 * Math.PI * i / n)));
    }
    
    const rr = new Array(c.length).fill(r); // Vector of Radii
    const N = max(0, round(4 + 0.5 * Math.log10(r))); // Number of terms in expansions
    const npts = (3 * N) + 2; // Number of sample points on circles

    // Roots of unity for collocation
    const circ = [];
    for (let i = 1; i <= npts; i++) {
      circ.push(exp(complex(0, 2 * Math.PI * i / npts)));
    }

    // Collocation points
    let z = [];
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < circ.length; k++) {
        z.push(c[j] + (rr[j] * circ));
      }
    }

    // Setup constant term matrix and right-hand side matrix
    const A = [0, ...new Array(z.length).fill(-1)];
    const zs = 2; // Position of source emitter
    const rhs = [0, ...z.map((val) => -log(abs(z[val] - zs)))]; //!!!!

    // Fill matrix A and right-hand side
    for (let i = 0; i < n; i++ ) {
      const logTerm = log(abs(z - c[i]));
      A.push([1, logTerm]);
    }

    for (let j = 0; j < N; j++) {
      const zck = (z - c[i])^(-k);
      A.push()
    }

    // const X = lusolve(A, rhs);

    console.log(A);
  }

  const n = 12; // Number of disks
  const r = 0.1; // Radius of disks
  const sides = 360; // Number of sides for cage

  CHT(n,r,sides);

  return (
    <StyledFlexboxContainer>
      <h4>Hey</h4>
    </StyledFlexboxContainer>
  )
}

export default FaradayCage