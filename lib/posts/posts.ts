import { useQuery } from "@apollo/client";
import { POSTS } from "../graphql/graphq";

export const Posts = (limit: number) => {
  const { data, loading, fetchMore, networkStatus } = useQuery(POSTS, {
    variables: { limit: limit, offset: 0 },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  return { data, loading, fetchMore, networkStatus };
};
