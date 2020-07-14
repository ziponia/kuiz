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

    .action-btn {
        font-size: 2rem;
        cursor: pointer;
        box-shadow: 2px 2px 3px #000, -1px -1px 0 #000, 1px -1px 0 #000,
            -1px 1px 0 #000, 1px 1px 0 #000;
        border: 0;
        background-color: ${props => props.theme.colors.main}90;
        padding: 10px 20px;
        border-radius: 2px;
        font-family: ${props => props.theme.fonts.second};
        font-weight: 100;
        color: ${props => props.theme.colors.main}90;
        text-shadow: 2px 2px 3px #000, -1px -1px 0 #000, 1px -1px 0 #000,
            -1px 1px 0 #000, 1px 1px 0 #000;
    }
`;
