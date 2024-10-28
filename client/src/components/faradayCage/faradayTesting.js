import { exp, matrix, size, log, abs, multiply, divide, complex, max, round, add, subtract, im, re, pow, pinv, pi } from "mathjs";
import ExcelJS from "exceljs";
import fs from "fs";

function Faraday(n, r, sides) {
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
        if (abs(subtract(zz[row][col], c[j])) < rr[j]) {uu[row][col] = 0} // CHT paper uses NaN instead of zeros
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
  
      disk[j].push(complexAdd);
    }
  }

  // Export to excel sheet - Testing
  const worksheet3 = workbook.addWorksheet("uu");
  const worksheet4 = workbook.addWorksheet("zck");
  const worksheet5 = workbook.addWorksheet("zDisk");
  const worksheet6 = workbook.addWorksheet("disk");

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

  workbook.xlsx.writeFile('output.xlsx')
  .then(() => {
    console.log('Spreadsheet successfully created');
  })
  .catch((err) => {
    console.log('Error writing spreadsheet:', err);
  });

  return {xx: xx, yy: yy, uu: uu, disk}
}

export { Faraday }

Faraday(4,0.1,360);
