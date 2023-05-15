import type { AppProps } from "next/app";
import "../globals.css";

import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/apollo-client";
import { Toaster } from "react-hot-toast";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <Toaster />
      </ApolloProvider>
    </SessionProvider>
  );
}
