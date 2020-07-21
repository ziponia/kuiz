import { useMemo } from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { OperationDefinitionNode } from "graphql";

let apolloClient: ApolloClient<any>;

const GRAPHQL_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/graphql"
    : process.env.GRAPHQL_ENDPOINT;

/**
 * @see https://www.apollographql.com/docs/react/v2.5/recipes/authentication/
 */
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("accessToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

function createApolloClient() {
  const httpLink = createHttpLink({
    uri: GRAPHQL_URI,
    credentials: "same-origin",
  });

  let wsLink = null;

  if (process.browser) {
    const client = process.browser
      ? new SubscriptionClient(`ws://localhost:3001/graphql`, {
          reconnect: true,
        })
      : null;

    // Create a WebSocket link:
    wsLink = new WebSocketLink(client);
  }

  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(
        query
      ) as OperationDefinitionNode;
      return !(kind === "OperationDefinition" && operation === "subscription");
    },
    httpLink,

    process.browser && wsLink
  );

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(link),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
