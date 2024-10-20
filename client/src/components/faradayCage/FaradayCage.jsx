import React, { useState, useContext } from "react";
import styled from "styled-components";
import { exp, matrix, size, ones, log, abs, concat, multiply, transpose, sqrt, complex, max, round, subtract, im, re, pow } from "mathjs";

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
      const angle = 2 * Math.PI * (i / n);
      const complexExp = exp(complex(0, angle));
      c.push(complexExp);
    }
    
    const rr = new Array(c.length).fill(r); // Vector of Radii
    const N = max(0, round(4 + 0.5 * Math.log10(r))); // Number of terms in expansions
    const npts = (3 * N) + 2; // Number of sample points on circles

    // Roots of unity for collocation
    const circ = [];
    for (let i = 1; i <= npts; i++) {
      circ.push(exp(complex(0, 2 * Math.PI * i / npts)));
    }

    // Calculating collocation points
    let z = [];
    for (let j = 0; j < n; j++) {
      let cj = c[j];
    
      circ.forEach((point) => {
        // Complex multiplication
        let scaledCirc = {
          re: rr[j] * point.re,
          im: rr[j] * point.im
        };

        // Complex addition
        let zj = {
          re: c[j].re + scaledCirc.re,
          im: c[j].im + scaledCirc.im
        };

        z.push(zj);
      });
    }

    // Setup constant term matrix and right-hand side matrix
    let A = [0, ...new Array(z.length).fill(-1)];
    const zs = complex(2, 0); // Location of source emitter
    let rhs = concat([0], z.map(zi => {
      return -log(abs(subtract(complex(zi), zs)));
    }));

    for (let j = 0; j < n; j++) {
      const logTerm = concat([1], z.map((zi) => {
        return log(abs(subtract(complex(zi), c[j])));
      }));

      A = concat(A, logTerm, 1);
      console.log(A);

      for (let k = 1; k <= N; k++) {
        let realColumn = [[0]], imagColumn = [[0]];
        for (let i = 0; i < z.length; i++) {
            let zck = pow(subtract(complex(z[i]), c[j]), -k);
            realColumn.push([re(zck)]);
            imagColumn.push([im(zck)]);
        }
        // console.log("A", A);
        // console.log("realColumn", realColumn);
        // A = concat(A, realColumn);
        // A = concat(A, imagColumn);
        
        // A = A.map((row, index) => {
        //   console.log([imagColumn[index]]);
        // });
        // A = A.map((row, index) => row.concat(realColumn[index]).concat(imagColumn[index]));
      }
    }


    // Fill matrix A and right-hand side
    // for (let i = 0; i < n; i++ ) {
    //   const logTerm = log(abs(z - c[i]));
    //   A.push([1, logTerm]);
    // }

    // for (let j = 0; j < N; j++) {
    //   const zck = (z - c[i])^(-k);
    //   A.push()
    // }

    // const X = lusolve(A, rhs);
  }

  const n = 4; // Number of disks
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