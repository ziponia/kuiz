import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  fonts: {
    main: "'Nanum Gothic', sans-serif;",
    second: "'Modak', 'Jua', cursive;",
    korean: "'Jua', sans-serif",
  },
  borderRadius: "2px",
  colors: {
    main: "#ff6600",
  },
  shadow: {
    type1: `
    font-family: 'Modak', 'Jua', cursive;
    font-weight: 400;
    text-shadow: 2px 2px 3px #000, -1px -1px 0 #000, 1px -1px 0 #000,
      -1px 1px 0 #000, 1px 1px 0 #000;
    color: #ff660090;
    `,
    type2: `
    font-family: 'Modak', 'Jua', cursive;
    font-weight: 400;
    text-shadow: 2px 2px 3px #000, -1px -1px 0 #000, 1px -1px 0 #000,
      -1px 1px 0 #000, 1px 1px 0 #000;
    color: #ff660070;
    `,
    textShaodw: `text-shadow: 2px 2px 3px #000, -1px -1px 0 #000, 1px -1px 0 #000,
    -1px 1px 0 #000, 1px 1px 0 #000;`,
  },
};
export default theme;
