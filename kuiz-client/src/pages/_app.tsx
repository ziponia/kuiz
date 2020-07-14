import React, { useContext } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import { ReactReduxContext } from "react-redux";

import { useApollo } from "../lib/apolloClient";
import theme from "../assets/theme";
import GlobalStyle from "../assets/GlobalStyle";
import { wrapper } from "../module";

import { AppContext } from "next/app";

import "animate.css";

const _App: any = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  // const redux = useContext(ReactReduxContext);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ThemeProvider>
    </ApolloProvider>
  );
};

_App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
      // Some custom thing for all pages
      appProp: ctx.pathname,
    },
  };
};

export default wrapper.withRedux(_App);
