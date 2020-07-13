import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    fonts: {
      main: string;
      second: string;
      korean: string;
    };

    colors: {
      main: string;
    };
    shadow: {
      type1: string;
      type2: string;
      textShaodw: string;
    };
  }
}
