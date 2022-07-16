import { useQuery } from "@apollo/client";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Posts } from "../../lib/type";
import { DateTimeFormat } from "../../lib/format/format";
import { POSTS } from "../../lib/graphql/graphq";
import HeaderNavigator from "../nav/header";

const Dashboard = () => {
  const router = useRouter();
  let limit = 11;
  const { onOpen, onToggle } = useDisclosure({ id: "asd" });

  const { data, fetchMore, networkStatus } = useQuery(POSTS, {
    variables: { limit: limit, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  if (!data) {
    return <div>Loading.....</div>;
  }

  return (
    <Box>
      <HeaderNavigator></HeaderNavigator>
      <Container maxW={1500} pt={5}>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>title</Th>
                <Th>description</Th>
                <Th>Image</Th>
                <Th>author</Th>
                <Th>email</Th>
                <Th>created_at</Th>
                <Th isNumeric>action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.posts.map((post: Posts, index: number) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{post.title}</Td>
                  <Td>{`${post.description.slice(0, 50)} ....`}</Td>
                  <Td>
                    <Popover>
                      <PopoverTrigger>
                        <Button colorScheme="gray" size="xs" mr={1}>
                          Image
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent maxW={200}>
                        {/* <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader> */}
                        <PopoverBody maxW={200}>
                          <Image
                            width={200}
                            height="100"
                            src={post.imageUrl}
                            alt={post.publicId}
                          ></Image>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                  <Td>{post.user.name}</Td>
                  <Td>{post.user.email}</Td>
                  <Td>{DateTimeFormat(post.created_at)}</Td>
                  <Td isNumeric>
                    <Button colorScheme="teal" size="xs" mr={1}>
                      View
                    </Button>

                    <Button colorScheme="red" size="xs">
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th onClick={onToggle}>id</Th>
                <Th>title</Th>
                <Th>description</Th>
                <Th>Image</Th>
                <Th>author</Th>
                <Th>email</Th>
                <Th>created_at</Th>
                <Th isNumeric>action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Container>
      <div>{JSON.stringify(onOpen)}</div>
    </Box>
  );
};

export default Dashboard;
