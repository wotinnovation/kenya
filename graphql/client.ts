import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";
import { AUTH_TOKEN_COOKIE } from "@/graphql/authToken";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get(AUTH_TOKEN_COOKIE);
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const { message, path } of graphQLErrors) {
      console.error(`[GraphQL error]: Message: ${message}, Path: ${path}`);
    }
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Product: { keyFields: ["id"] },
      Category: { keyFields: ["id"] },
      Order: { keyFields: ["id"] },
    },
  }),
});
