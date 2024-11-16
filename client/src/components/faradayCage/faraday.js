import { exp, sin, cos, matrix, size, log, abs, multiply, divide, complex, max, round, add, subtract, im, re, pow, pinv, pi } from "mathjs";

function Faraday(n, r, sides) {
  const c = [];
  const diskXValues = [];
  const diskYValues = [];
  const yr = [];
  if (sides === 360) {
    // Calculate disk centers (CHT Paper Approach)
    // Used for circle case
    for (let i = 1; i <= n; i++) {
      const angle = 2 * pi * (i / n);
      const complexExp = exp(complex(0, angle));
      c.push(complexExp);
    }

    for (let i = 0; i < c.length; i++) {
      diskXValues.push(c[i].re);
      diskYValues.push(c[i].im);
    }
  } else {
    // Calculate disk centers for a polyon with the specified number of sides
    // Creates linear space (also used to produce uu)
    function linspace(start, end, num) {
      if (num === 1) {
        return [start];
      }
    
      const arr = [];
      const step = (end - start) / (num - 1);
    
      for (let i = 0; i < num; i++) {
        arr.push(start + step * i);
      }
    
      return arr;
    }

    // Produces x and y coordinates for the vertices of a polygon with the specified number of sides
    function poly(sides) {
      const degrees = linspace(0, 2 * pi, 361);
      const p = []; // Cosine values
      const s = []; // Sin values
      for (let i = 0; i < degrees.length; i++) {
        p.push(cos(degrees[i]));
        s.push(sin(degrees[i]));
      }
      const step = 360 / sides;
      const x1 = [];
      const y1 = [];
      for (let i = 0; i < 360; i += step) {
        x1.push(p[i]);
        y1.push(s[i]);
      }

      return { x1, y1 }
    }

    // Produces disk coordinates for disks placed along edge of polygon
    function divisor(x1, y1, n) {
      // Calculate total distance needed to traverse polygon edges
      let cumulativeDistance = [0];
      for (let i = 1; i < x1.length; i++) {
        const dx = x1[i] - x1[i - 1];
        const dy = y1[i] - y1[i - 1];
        const distance = pow(add(pow(dx, 2), pow(dy, 2)), 0.5);
        cumulativeDistance.push(add(cumulativeDistance[i - 1], distance));
      }

      // Calculate distance needed to place each disk for even spacing
      function interp1(x, y, xi) {
        // Loop through each interval in x to find where xi fits
        for (let i = 0; i < x.length - 1; i++) {
            if (xi >= x[i] && xi <= x[i + 1]) {
                // Calculate the interpolation factor 't'
                const t = (xi - x[i]) / (x[i + 1] - x[i]);
                // Interpolate the corresponding y value
                return y[i] * (1 - t) + y[i + 1] * t;
            }
        }
        return NaN; // Return NaN if xi is out of bounds of x array
      }

      const markerDistance = divide(cumulativeDistance[cumulativeDistance.length - 1], n);
      const markerLocations = [];
      for (let i = 1; i <= n; i ++) {
        markerLocations.push(markerDistance * i);
      }

      const markerIndices = markerLocations.map(loc =>
        interp1(cumulativeDistance, Array.from({ length: cumulativeDistance.length }, (_, i) => i), loc)
      );

      // Calculate base indices and interpolation weights
      const markerBasePos = markerIndices.map(index => Math.floor(index));
      const weightSecond = markerIndices.map((index, i) => index - markerBasePos[i]);

      // Interpolate x and y values based on weights
      const mask = markerBasePos.map(index => index < cumulativeDistance.length - 1);
      const xr = [];
      const yr = [];
      for (let i = 0; i < mask.length; i++) {
          if (mask[i]) {
              const base = markerBasePos[i];
              xr.push(
                  x1[base] * (1 - weightSecond[i]) + x1[base + 1] * weightSecond[i]
              );
              yr.push(
                  y1[base] * (1 - weightSecond[i]) + y1[base + 1] * weightSecond[i]
              );
          }
      }

      // Handle potential final marker if the shape isn't closed
      const final_x = x1[x1.length - 1];
      const final_y = y1[y1.length - 1];
      const final_marker = !mask[mask.length - 1] && (x1[0] !== final_x || y1[0] !== final_y);

      xr.unshift(x1[0]);
      yr.unshift(y1[0]);

      if (final_marker) {
          xr.push(final_x);
          yr.push(final_y);
      }

      return { xr, yr };
    }

    // Create c the array of disk coordinates
    const { x1, y1 } = poly(sides);
    const scale_factor = {3: 0.64305, 4: 0.7979, 5: 1, 6: 1, 7: 1, 8: 1, 360: 1};
    const con = scale_factor[sides];
    x1.forEach((num, i) => x1[i] = num / con);
    y1.forEach((num, i) => y1[i] = num / con);
    // Add first disk to end of poly to account for returning to first disk in path
    x1.push(x1[0]);
    y1.push(y1[0]);
    const {xr, yr} = divisor(x1, y1, n);

    diskXValues.push(...xr);
    diskYValues.push(...yr);
    // Smoothing out floating point errors for plot hovering
    diskXValues.forEach((disk, i) => diskXValues[i] = diskXValues[i].toFixed(5));
    diskYValues.forEach((disk, i) => diskYValues[i] = diskYValues[i].toFixed(5));

    for (let i = 0; i < xr.length; i++) {
      c.push(complex(xr[i], yr[i]));
    }
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
  let A = [[0]];
  for (let i = 0; i < size(z); i++) {A.push([-1]);}
  const zs = complex(2, 0); // Location of source emitter

  // Populating constant term matrix
  for (let i = 0; i < n; i++) {
    // Logarithmic terms
    A[0].push(1);
    for (let j = 0; j < size(z); j++) {
      const logTerm = log(abs(subtract(complex(z[j]), c[i])));
      A[j + 1].push(logTerm);
    }

    // Algebraic terms
    for (let j = 1; j <= N; j++) {
      A[0].push(0);
      A[0].push(0);
      for (let k = 0; k < z.length; k++) {
        const zck = pow(subtract(complex(z[k]), c[i]), -j);
        A[k + 1].push(re(zck));
        A[k + 1].push(im(zck));
      }
    }
  }

  // Populating right-hand side matrix
  let rhs = [[0]];
  for (let j = 0; j < size(z); j++) {
    const term = -log(abs(subtract(complex(z[j]), zs)));
    rhs.push([term]);
  }
  
  // Solving least-squares problem
  A = matrix(A);
  rhs = matrix(rhs);
  const A_pinv = pinv(A);
  let X = multiply(A_pinv, rhs);

  const e = X._data[0][0]; // Constant potential on wires
  X = X._data.slice(1);

  let d = []; // Coefficients of log terms
  for (let i = 0; i < X.length; i += (2 * N + 1)) {
      d.push(X[i]);
  }
  X = X.filter((_, i) => (i % (2 * N + 1) !== 0));

  let a = []; // Coefficients of algebraic terms
  let b = []; 
  for (let i = 0; i < X.length; i += 2) {
      a.push(X[i]);
      b.push(X[i + 1]);
  }

  // Data for plotting results
  function linspace(start, end, num) {
    if (num === 1) {
      return [start];
    }
  
    const arr = [];
    const step = (end - start) / (num - 1);
  
    for (let i = 0; i < num; i++) {
      arr.push(start + step * i);
    }
  
    return arr;
  }

  const x = linspace(-1.4, 2.2, 120);
  const y = linspace(-1.8, 1.8, 120);

  // Creating meshgrid
  function meshgrid(x, y) {
    let xx = [];
    let yy = [];
  
    for (let i = 0; i < y.length; i++) {
      xx[i] = [];
      yy[i] = [];
      for (let j = 0; j < x.length; j++) {
        xx[i][j] = x[j];
        yy[i][j] = y[i];
      }
    }
  
    return [xx, yy];
  }
  
  const [xx, yy] = meshgrid(x, y);
  let zz = [];
  for (let i = 0; i < xx.length; i++) {
    zz[i] = [];
    for (let j = 0; j < xx[i].length; j++) {
      zz[i][j] = complex(xx[i][j], yy[i][j]);
    }
  }

  // Forming potential function matrix - uu
  let uu = [];
  const zck = [];
  for (let i = 0; i < zz.length; i++) {
    uu[i] = [];
    zck.push([]);
    for (let j = 0; j < zz[i].length; j++) {
      let zTerm = log(abs(subtract(zz[i][j], zs)));
      uu[i][j] = zTerm;
      zck[i].push(0);
    }
  }

  for (let j = 0; j < n; j++) {
    for (let row = 0; row < uu.length; row++) {
      for (let col = 0; col < uu[0].length; col++) {
        const term = add(uu[row][col], multiply(d[j], log(abs(subtract(zz[row][col], c[j])))));
        uu[row][col] = term[0];
      }
    }
  }

  let kk = 0;
  for (let j = 0; j < n; j++) {
    for (let aa = 1; aa <= N; aa++) {
      for (let row = 0; row < uu.length; row++) {
        for (let col = 0; col < uu[0].length; col++) {
          zck[row][col] = pow(subtract(zz[row][col], c[j]), -aa);
          kk = aa + (j * N) - 1;
          const term = add(uu[row][col], add(multiply(a[kk], re(zck[row][col])), multiply(b[kk], im(zck[row][col]))));
          uu[row][col] = term[0];
        }
      }
    }
  }

  // Masking points inside boundary
  for (let j = 0; j < n; j++) {
    for (let row = 0; row < uu.length; row++) {
      for (let col = 0; col < uu[0].length; col++) {
        if (abs(subtract(zz[row][col], c[j])) < rr[j]) {uu[row][col] = null} // CHT paper uses NaN for new values
      }
    }
  }

  // Creating data with interpolation of masked disk areas for cleaner heat map visualisation
    // Removes blank areas under disks
  const uu_heat = structuredClone(uu);
  for (let i = 0; i < uu_heat.length; i++) {
    for (let j = 0; j < uu_heat[i].length; j++) {
      if (uu_heat[i][j] === null) {
        // Gather neighboring values that aren't null
        const neighbors = [];
        if (i > 0 && uu_heat[i - 1][j] !== null) neighbors.push(uu_heat[i - 1][j]);
        if (i < uu_heat.length - 1 && uu_heat[i + 1][j] !== null) neighbors.push(uu_heat[i + 1][j]);
        if (j > 0 && uu_heat[i][j - 1] !== null) neighbors.push(uu_heat[i][j - 1]);
        if (j < uu_heat[i].length - 1 && uu_heat[i][j + 1] !== null) neighbors.push(uu_heat[i][j + 1]);

        // Calculate the average of neighboring values and set
        if (neighbors.length > 0) {
          uu_heat[i][j] = neighbors.reduce((sum, val) => sum + val, 0) / neighbors.length;
        }
      }
    }
  }

  // Calculating gradient at center 

  return { uu: uu, uu_heat : uu_heat, diskXValues : diskXValues, diskYValues : diskYValues }
}

export { Faraday }