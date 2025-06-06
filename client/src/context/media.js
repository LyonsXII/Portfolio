import { css } from 'styled-components';

const sizes = {
  mobile: '768px',
  desktop: "769px"
};

export const media = {
  mobile: (...args) => css`
    @media (max-width: ${sizes.mobile}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${sizes.desktop}) {
      ${css(...args)}
    }
  `,
};
