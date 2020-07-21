import React, { useEffect } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import {
  Provider as AuthProvider,
  getSession,
  setOptions,
} from "next-auth/client";

import { useApollo } from "../lib/apolloClient";
import theme from "../assets/theme";
import GlobalStyle from "../assets/GlobalStyle";
import { wrapper } from "../module";

import App, { AppContext } from "next/app";

import getCookie from "../lib/getCookie";

import "animate.css";

setOptions({ site: "http://localhost:3000" });

const _App: any = ({ Component, pageProps, session, accessToken }: any) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    if (!!accessToken) {
      localStorage.accessToken = accessToken;
    }
  }, [accessToken]);

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
  const req = context.ctx.req;

  let accessToken = null;
  if (typeof window === "undefined") {
    const cookies = getCookie(req.headers.cookie);

    accessToken = cookies["next-auth.session-token"];
  }

  return {
    ...appProps,
    session,
    accessToken,
  };
};

export default wrapper.withRedux(_App);
