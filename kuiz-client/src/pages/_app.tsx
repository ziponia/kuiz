import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";

import { useApollo } from "../lib/apolloClient";

import theme from "../assets/theme";
import GlobalStyle from "../assets/GlobalStyle";

import "animate.css";

const App = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
