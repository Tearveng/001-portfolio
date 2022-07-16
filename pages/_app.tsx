import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import {client} from "../lib/apollo-client";
import { useEffect, useState } from "react";
import { setToken } from "../lib/token/getToken";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // https://arcane-scrubland-91249.herokuapp.com/graphql
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loding ...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
