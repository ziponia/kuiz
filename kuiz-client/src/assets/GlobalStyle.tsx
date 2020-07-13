import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-family: ${props => props.theme.fonts.second};
        font-weight: 500;
        font-size: 32px;
    }

    a, button, select, input {
        &:focus {
            outline: none;
        }
    }

    li {
        list-style-type: none;
    }
`;
