import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import HeaderNavigator from "../nav/header";
import { motion } from "framer-motion";
import { works } from "../../lib/api/api";
import { experiences } from "../../lib/api/api";
import Experience from "./experience/experince";
import Works from "./works/works";
import ModalContact from "./modal/modalContact";

const Main: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <HeaderNavigator />
      <Container maxW={1500} pt={5}>
        <Stack
          //   borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "1450px" }}
          height={{ sm: "552px", md: "40rem" }}
          direction={{ base: "column", md: "row" }}
          //   bg={useColorModeValue("white", "gray.900")}
          //   boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image
              // borderRadius="20"
              alt="portfolio"
              objectFit="cover"
              boxSize="100%"
              src={
                "https://res.cloudinary.com/ddphybme7/image/upload/v1642475922/portfolio/IMAGE_2022-01-18_10_16_55.jpg"
              }
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              Tear Veng
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              @veng____
            </Text>
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              Say No To Drugs
              {/* <Link href={"#"} color={"blue.400"}>
                #tag
              </Link>
              me in your posts */}
            </Text>
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #art
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #challenge
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                #coding
              </Badge>
            </Stack>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                _focus={{
                  bg: "gray.200",
                }}
                onClick={onOpen}
              >
                Message
              </Button>
              <ModalContact isOpen={isOpen} onClose={onClose} />
              {/* <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
              >
                Follow
              </Button> */}
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Container maxW={{ sm: "400", md: "800", lg: "1000", xl: "1450" }}>
        <Stack>
          <Text fontWeight={800} fontSize="2xl" textTransform="uppercase">
            Works
          </Text>
          <Grid
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={6}
          >
            {works.map((value, index) => (
              <GridItem key={index}>
                <Works value={value} />
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Container>
      <br></br>
      <Container maxW={{ sm: "400", md: "800", lg: "1000", xl: "1450" }}>
        <Stack>
          <Text fontWeight={800} fontSize="2xl" textTransform="uppercase">
            Experiences
          </Text>
          <Grid
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={6}
          >
            {experiences.map((value, index) => (
              <GridItem key={index}>
                <Experience value={value}></Experience>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Main;
