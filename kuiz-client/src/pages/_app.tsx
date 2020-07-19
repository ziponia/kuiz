import React, { useContext } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import {
  Provider as AuthProvider,
  getSession,
  setOptions,
} from "next-auth/client";
import { ReactReduxContext } from "react-redux";

import { useApollo } from "../lib/apolloClient";
import theme from "../assets/theme";
import GlobalStyle from "../assets/GlobalStyle";
import { wrapper } from "../module";

import App, { AppContext } from "next/app";

import "animate.css";

setOptions({ site: "http://localhost:3000" });

const _App: any = ({ Component, pageProps, session }: any) => {
  console.log("session: ", session);
  const apolloClient = useApollo({ ...pageProps.initialApolloState, session });

  // const redux = useContext(ReactReduxContext);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider session={session}>
          <Component {...pageProps} />
          <GlobalStyle />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

_App.getInitialProps = async (context: AppContext) => {
  const session = await getSession(context.ctx);
  const appProps = await App.getInitialProps(context);
  return {
    ...appProps,
    session,
  };
};

export default wrapper.withRedux(_App);
