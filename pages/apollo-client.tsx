import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { getToken } from "./token/getToken";
import { setContext } from "@apollo/client/link/context";

const httplink = createHttpLink({
  // uri: "https://arcane-scrubland-91249.herokuapp.com/graphql",
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  // return the headers to the context so httpLink can read them
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  }
});

const client = new ApolloClient({
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            merge(existing = [], incoming: any[]) {
              return incoming;
            },
          },
        },
      },
    },

    // typePolicies: {
    //   Post: {
    //     fields: {
    //       title: {
    //         read(existing: string) {
    //           return existing.toLocaleLowerCase();
    //         },
    //       },
    //     },
    //   },
    // },
  }),
  link: authLink.concat(httplink),
});

export default client;
