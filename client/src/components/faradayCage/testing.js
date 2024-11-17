import { exp, sin, cos, matrix, size, log, abs, multiply, divide, complex, max, round, add, subtract, im, re, pow, pinv, pi } from "mathjs";

const uu = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

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

const {Dx, Dy} = gradient(uu, uu[0][1] - uu[0][0], uu[1][0] - uu[0][0]);
const magnitudeGradient = [];
for (let i = 0; i < Dx.length; i++) {
  magnitudeGradient.push([]);
  for (let j = 0; j < Dx[0].length; j++) {
    magnitudeGradient[i].push(pow((pow(Dx[i][j], 2) + pow(Dy[i][j], 2)), 1/2));
  }
}
const centerGradient = getCenterAverage(magnitudeGradient);
console.log(centerGradient);

