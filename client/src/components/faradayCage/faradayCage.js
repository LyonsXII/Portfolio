import { exp, matrix, size, ones, log, abs, concat, multiply, transpose, sqrt, complex, max, round, subtract, im, re, pow, pinv } from "mathjs";
import ExcelJS from "exceljs";
import fs from "fs";

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
  
  // Testing output / export to excel sheet
  const workbook = new ExcelJS.Workbook();
  const worksheet1 = workbook.addWorksheet("A");
  const worksheet2 = workbook.addWorksheet("rhs");

  A.forEach((row) => {
    worksheet1.addRow(row);
  });

  rhs.forEach((row) => {
    worksheet2.addRow(row);
  });

  workbook.xlsx.writeFile('output.xlsx')
  .then(() => {
    console.log('Spreadsheet successfully created');
  })
  .catch((err) => {
    console.log('Error writing spreadsheet:', err);
  });

  // Solving least-squares problem
  A = matrix(A);
  rhs = matrix(rhs);
  const A_pinv = pinv(A);
  const X = multiply(A_pinv, rhs);


    // for (let k = 1; k <= N; k++) {
    //   let realColumn = [[0]], imagColumn = [[0]];
    //   for (let i = 0; i < z.length; i++) {
    //       let zck = pow(subtract(complex(z[i]), c[j]), -k);
    //       realColumn.push([re(zck)]);
    //       imagColumn.push([im(zck)]);
    //   }
      // console.log("A", A);
      // console.log("realColumn", realColumn);
      // A = concat(A, realColumn);
      // A = concat(A, imagColumn);
      
      // A = A.map((row, index) => {
      //   console.log([imagColumn[index]]);
      // });
      // A = A.map((row, index) => row.concat(realColumn[index]).concat(imagColumn[index]));
  //   }
  // }


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

CHT(n, r, sides);
