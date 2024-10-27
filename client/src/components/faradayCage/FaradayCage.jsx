import React, { useState, useContext } from "react";
import styled from "styled-components";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import HeatmapModule from 'highcharts/modules/heatmap';
import HighchartsContour from 'highcharts-contour';
import { exp, pi, multiply, divide, complex } from "mathjs";

import { ThemeContext } from "../../context/ThemeContext";

import { Faraday } from "./faraday.js";

const StyledFlexboxContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FaradayCage(props) {
  const n = 12; // Number of disks
  const r = 0.1; // Radius of disks
  const sides = 360; // Number of sides for cage
  
  const { xx, yy, uu } = Faraday(n, r, sides);

  // Initialize the 3D module
  HeatmapModule(Highcharts);

  // Generate heatmap data from xx, yy, uu
  let heatmapData = [];

  for (let i = 0; i < 120; i++) {
    for (let j = 0; j < 120; j++) {
      heatmapData.push([xx[i][j], yy[i][j], uu[i][j]]);
    }
  }

  // Generate z values for disks
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
        enabled: false,
      },
      plotBorderWidth: 1,
    },
    title: {
      text: 'Faraday Cage',
      style: { textShadow: "none"}
    },
    xAxis: {
      min: -1.4,
      max: 1.8,
    },
    yAxis: {
      min: -2.2,
      max: 2.2,
    },
    colorAxis: {
      stops: [
        [0, '#000'],
        [0.5, '#aaa'],
        [1, '#fff'],
      ],
      min: -2,
      max: 2,
    },
    series: [
      {
        name: 'Heatmap',
        borderWidth: 0,
        data: heatmapData,
        colormap: 'black',
        pointPadding: 0.01
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