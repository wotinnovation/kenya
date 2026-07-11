"use client";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/graphql/client";
import type { ReactNode } from "react";

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
