import React, { useState, useContext } from "react";
import styled from "styled-components";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import HeatmapModule from 'highcharts/modules/heatmap';
import { exp, pi, multiply, divide, complex } from "mathjs";

import { ThemeContext } from "../../context/ThemeContext";

import { Faraday } from "./faraday.js";

const StyledFlexboxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: none;
`;

function FaradayCage(props) {
  const n = 4; // Number of disks
  const r = 0.1; // Radius of disks
  const sides = 360; // Number of sides for cage
  
  const { xx, yy, uu } = Faraday(n, r, sides);

  // Initialize the 3D module
  HeatmapModule(Highcharts);

  // Generate z values
  const z = [];
  for (let i = -50; i <= 50; i++) {
    const exponent = multiply(divide(multiply(complex(0, 1), i), 50), pi);
    z.push(exp(exponent));
  }

  // Chart options
  const options = {
    chart: {
      type: 'heatmap',
      options3d: {
        enabled: false, // Disabling 3D for a contour-like plot
      },
      plotBorderWidth: 1,
    },
    title: {
      text: 'Faraday Cage',
    },
    xAxis: {
      min: -1.4,
      max: 2.2,
    },
    yAxis: {
      min: -1.8,
      max: 1.8,
    },
    colorAxis: {
      stops: [
        [0, '#000'],
        [0.5, '#aaa'],
        [1, '#fff'],
      ],
      min: -2,
      max: 1.2,
    },
    series: [
      {
        name: 'Contour',
        borderWidth: 0,
        data: uu,
        colormap: 'black',
      }
    ],
  };

  return (
    <StyledFlexboxContainer>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </StyledFlexboxContainer>
  )
}

export default FaradayCage