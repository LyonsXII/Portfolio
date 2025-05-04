import { Faraday } from "./faraday.js";

self.onmessage = function (event) {
  const { n, r, sides } = event.data;
  const { uu, uu_heat, diskXValues, diskYValues, centerGradient } = Faraday(
    n,
    r,
    sides
  );

  self.postMessage({ uu, uu_heat, diskXValues, diskYValues, centerGradient });
};