import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    fonts: {
      main: string;
      second: string;
    };

    colors: {
      main: string;
    };
  }
}
