import {
  Avatar,
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Waypoint } from "react-waypoint";
import { Posts } from "../lib/posts/posts";
import client from "./apollo-client";
import { DateTimeFormat } from "../lib/format/format";
import { ALL_POSTS_CACHE, POSTS } from "../lib/graphql/graphq";
import HeaderNavigator from "./nav/header";
import Search from "./nav/search";
import { useEffect } from "react";
import Footer from "./nav/footer";
import Head from "next/head";

export interface POSTS {
  __typename: string;
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  publicId: string;
  created_at: Date;
  user: {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    publicId: string;
  };
}

const Home: NextPage = ({ posts }: any) => {
  var limit = 5;
  const color1 = useColorModeValue("white", "gray.900");
  const color2 = useColorModeValue("gray.700", "white");
  const { data, loading, fetchMore, networkStatus } = Posts(limit);

  useEffect(() => {
    history.scrollRestoration = 'manual'
  }, []);

  console.log("render");

  if (!data || !data.posts) {
    return <div>Loading....</div>;
  }

  return (
    // <div>{JSON.stringify(data)}</div>
    data && (
      <>
      
      <Box>
      
        <HeaderNavigator />
        <Search getData={posts.postCache} />

        <Container maxW={1500} pt={5}>
          <Flex>
            <Grid
              templateColumns={{
                base: "repeat(5, 1fr)",
                xl: "repeat(5, 1fr)",
                lg: "repeat(4, 1fr)",
                md: "repeat(3, 1fr)",
                sm: "repeat(2, 1fr)",
              }}
              gap={6}
            >
              {data.posts.map((post: any, index: number) => (
                <div key={index}>
                  <Link
                    href={{
                      pathname: `./detail/${post.id}`,
                      query: { id: post.id },
                    }}
                  >
                    <Box
                      width={{
                        xl: 270,
                        lg: 270,
                        md: 270,
                        sm: 220,
                      }}
                      bg={color1}
                      boxShadow={"2xl"}
                      rounded={"md"}
                      p={6}
                      overflow={"hidden"}
                    >
                      <Box
                        h={{
                          xl: 160,
                          lg: 160,
                          md: 160,
                          sm: 120,
                        }}
                        bg={"gray.100"}
                        mt={-6}
                        mx={-6}
                        mb={2}
                        pos={"relative"}
                      >
                        <Image
                          src={post.imageUrl}
                          layout={"fill"}
                          alt="image"
                        />
                      </Box>
                      <Stack>
                        <Text
                          color={"green.500"}
                          textTransform={"uppercase"}
                          fontWeight={800}
                          fontSize={"sm"}
                          letterSpacing={1.1}
                        >
                          blog
                        </Text>
                        <Heading
                          color={color2}
                          fontSize={"1xl"}
                          fontFamily={"body"}
                        >
                          {post.title}
                        </Heading>
                        <Text color={"gray.500"} fontSize={"14"}>
                          {post.description.slice(0, 130) + "......"}
                        </Text>
                      </Stack>
                      <Stack
                        mt={1}
                        mb={-3}
                        direction={"row"}
                        spacing={4}
                        align={"center"}
                      >
                        <Avatar
                          src={
                            post.user === null
                              ? "https://avatars0.githubusercontent.com/u/1164541?v=4"
                              : post.user.imageUrl
                          }
                          w={7}
                          h={7}
                        />
                        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                          <Text fontWeight={600} fontSize={"10"}>
                            {post.user === null
                              ? "Achim Rolle"
                              : post.user.name.toUpperCase()}
                          </Text>
                          <Text color={"gray.500"} fontSize={"10"}>
                            {post === null
                              ? "Feb 08, 2021 · 6min reade"
                              : DateTimeFormat(post.created_at)}
                          </Text>
                        </Stack>
                      </Stack>
                    </Box>
                  </Link>
                  {index == data.posts.length - 2 && (
                    <Waypoint
                      onEnter={() =>
                        fetchMore({
                          variables: {
                            limit: limit,
                            offset: data.posts.length,
                          },
                          updateQuery: (prv, { fetchMoreResult }) => {
                            if (!fetchMoreResult) {
                              return prv;
                            }

                            return {
                              posts: [...prv.posts, ...fetchMoreResult.posts],
                            };
                          },
                        })
                      }
                    ></Waypoint>
                  )}
                </div>
              ))}
            </Grid>
          </Flex>
          <br></br>
          <Center>{networkStatus === 3 ? <Spinner /> : "No Load More"}</Center>
          {/* <Button onClick={toggleColorMode}> Toggle {colorMode === "light" ? "Dark" : "Light"}</Button> */}
        </Container>
        <br></br>
        
      </Box>
      <Footer/>
      </>

      
    )
  );
};

export default Home;

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_POSTS_CACHE,
    // fetchPolicy: "cache-first",
    // fetchPolicy: "network-only",
  });
  // console.log("data", data.postCache);

  return {
    props: {
      posts: data,
    },
  };
}
