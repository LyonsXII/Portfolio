import { exp, sin, cos, matrix, size, log, abs, multiply, divide, complex, max, round, add, subtract, im, re, pow, pinv, pi } from "mathjs";
import ExcelJS from "exceljs";
import fs from "fs";

function Faraday(n, r, sides) {
  // Calculate disk centers (CHT Paper Approach)
  // const c = [];
  // for (let i = 1; i <= n; i++) {
  //   const angle = 2 * pi * (i / n);
  //   const complexExp = exp(complex(0, angle));
  //   c.push(complexExp);
  // }

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

  const { x1, y1 } = poly(sides);
  // Add first disk to end of poly to account for returning to first disk in path
  x1.push(x1[0]);
  y1.push(y1[0]);
  const {xr, yr} = divisor(x1, y1, n);

  const c = [];
  for (let i = 0; i < xr.length; i++) {
    c.push(complex(xr[i], yr[i]));
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

  // Export to excel sheet - Testing
  const workbook = new ExcelJS.Workbook();
  const worksheet1 = workbook.addWorksheet("A");
  const worksheet2 = workbook.addWorksheet("rhs");

  A.forEach((row) => {
    worksheet1.addRow(row);
  });

  rhs.forEach((row) => {
    worksheet2.addRow(row);
  });
  
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

  // Creating linear spaces
  const x = linspace(-2, 2, 120);
  const y = linspace(-2, 2, 120);

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
        if (abs(subtract(zz[row][col], c[j])) < rr[j]) {uu[row][col] = null} // CHT paper uses NaN instead of zeros
      }
    }
  }

  // Generate z values for generating disks
  const zDisk = [];
  for (let i = -50; i <= 50; i++) {
    const exponent = multiply(divide(multiply(complex(0, 1), i), 50), pi);
    zDisk.push(exp(exponent));
  }

  // Generate data for plotting disks forming cage
  const disk = [];
  for (let j = 0; j < n; j++) {
    disk.push([]);
    for (let row = 0; row < zDisk.length; row++) {
      const complexMult = {
        re: rr[j] * zDisk[row].re,
        im: rr[j] * zDisk[row].im
      }
  
      const complexAdd =  {
        re: c[j].re + complexMult.re,
        im: c[j].im + complexMult.im
      }
  
      disk[j].push([complexAdd.re, complexAdd.im]);
    }
  }

  // Interpolation of masked disk areas for heat map visualisation
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

        // Calculate the average of neighboring values
        if (neighbors.length > 0) {
          uu_heat[i][j] = neighbors.reduce((sum, val) => sum + val, 0) / neighbors.length;
        }
      }
    }
  }

  // Calculating gradients
  function gradient(uu, dx, dy) {
    const rows = uu.length;
    const cols = uu[0].length;

    // Initialize gradients
    const Dx = Array.from({ length: rows }, () => Array(cols).fill(0));
    const Dy = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Compute gradients using finite differences
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Compute Dx (partial derivative along x)
            if (j === 0) {
                // Forward difference at left boundary
                Dx[i][j] = (uu[i][j + 1] - uu[i][j]) / dx;
            } else if (j === cols - 1) {
                // Backward difference at right boundary
                Dx[i][j] = (uu[i][j] - uu[i][j - 1]) / dx;
            } else {
                // Central difference for interior points
                Dx[i][j] = (uu[i][j + 1] - uu[i][j - 1]) / (2 * dx);
            }

            // Compute Dy (partial derivative along y)
            if (i === 0) {
                // Forward difference at top boundary
                Dy[i][j] = (uu[i + 1][j] - uu[i][j]) / dy;
            } else if (i === rows - 1) {
                // Backward difference at bottom boundary
                Dy[i][j] = (uu[i][j] - uu[i - 1][j]) / dy;
            } else {
                // Central difference for interior points
                Dy[i][j] = (uu[i + 1][j] - uu[i - 1][j]) / (2 * dy);
            }
        }
    }

    return { Dx, Dy };
  }

  function getCenterAverage(matrix) {
    // Get the dimensions of the matrix
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Check if the matrix is square
    if (rows !== cols) {
        throw new Error("Matrix must be square.");
    }

    let centerValues;

    // Determine the center indices
    if (rows % 2 === 1) {
        // Odd-dimension: Single center value
        const centerIdx = Math.floor(rows / 2); // Indexing starts at 0
        centerValues = [matrix[centerIdx][centerIdx]];
    } else {
        // Even-dimension: Four center values
        const centerIdx1 = rows / 2 - 1; // Convert MATLAB 1-based to 0-based indexing
        const centerIdx2 = centerIdx1 + 1;

        centerValues = [
            matrix[centerIdx1][centerIdx1],
            matrix[centerIdx1][centerIdx2],
            matrix[centerIdx2][centerIdx1],
            matrix[centerIdx2][centerIdx2],
        ];
    }

    // Compute the average of the center value(s)
    const centerAvg = centerValues.reduce((sum, value) => sum + value, 0) / centerValues.length;
    return centerAvg;
}

  const { Dx, Dy } = gradient(uu, x[1] - x[0], y[1] - y[0]);
  const magnitudeGradient = [];
  for (let i = 0; i < Dx.length; i++) {
    magnitudeGradient.push([]);
    for (let j = 0; j < Dx[0].length; j++) {
      magnitudeGradient[i].push(pow((pow(Dx[i][j], 2) + pow(Dy[i][j], 2)), 1/2));
    }
  }
  const centerGradient = getCenterAverage(magnitudeGradient);

  // Export to excel sheet - Testing
  const worksheet3 = workbook.addWorksheet("uu");
  const worksheet4 = workbook.addWorksheet("zck");
  const worksheet5 = workbook.addWorksheet("zDisk");
  const worksheet6 = workbook.addWorksheet("disk");
  const worksheet7 = workbook.addWorksheet("uu_heat");
  const worksheet8 = workbook.addWorksheet("magntiudeGradient");
  const worksheet9 = workbook.addWorksheet("initialPlot");

  uu.forEach((row) => {
    worksheet3.addRow(row);
  });

  zck.forEach((row) => {
    worksheet4.addRow(row);
  });

  zDisk.forEach((row) => {
    worksheet5.addRow([re(row), im(row)]);
  });

  disk.forEach((row) => {
    worksheet6.addRow(row);
  });

  
  uu_heat.forEach((row) => {
    worksheet7.addRow(row);
  });

  magnitudeGradient.forEach((row) => {
    worksheet8.addRow(row);
  });

  worksheet9.addRow(uu);
  worksheet9.addRow(uu_heat);

  workbook.xlsx.writeFile('output.xlsx')
  .then(() => {
    console.log('Spreadsheet successfully created');
  })
  .catch((err) => {
    console.log('Error writing spreadsheet:', err);
  });

  return { xx: xx, yy: yy, uu: uu }
}

export { Faraday }

Faraday(20,0.01,360);
