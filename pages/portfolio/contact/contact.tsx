import {
  Container,
  Flex,
  Box,
  Heading,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Center,
  FormErrorMessage,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import { useMutation } from "@apollo/client";
import { CONTACT_MESSAGE } from "../../../lib/graphql/graphq";
import { useRef, useState } from "react";
import Success from "../success/success";

interface Props {
  onCloseModal(): void;
}

const Contact: React.FC<Props> = ({ onCloseModal }) => {
  const [contact, {}] = useMutation(CONTACT_MESSAGE);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const username = useRef("");
  const email = useRef("");
  const message = useRef("");
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState({
    username: false,
    email: false,
    message: false,
  });

  const handleSubmit = async () => {
    console.log(username.current, email.current, message.current);

    if (username.current === "")
      return setInputError({ ...inputError, username: true });
    if (email.current === "")
      return setInputError({ ...inputError, email: true });
    if (message.current === "")
      return setInputError({ ...inputError, message: true });

    setLoading(true);

    return await contact({
      variables: {
        username: username.current,
        email: email.current,
        message: message.current,
      },
    }).then((result) => {
      const { successful } = result.data.contactMessage;
      if (successful) {
        (username.current = ""),
          (email.current = ""),
          (message.current = ""),
          setLoading(false);
        onOpen();
      }
    });
  };

  return (
    <Container maxW="full" mt={5} centerContent overflow="hidden">
      <Flex>
        <Box
          //   bg="#02054B"
          borderRadius="lg"
          //   m={{ sm: 4, md: 16, lg: 10 }}
          //   p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Center>
              <Heading>Contact</Heading>
            </Center>
            <br />
            <Center>
              <Box borderRadius="lg" w="lg">
                <Box m={8}>
                  <VStack spacing={5}>
                    <FormControl id="name" isInvalid={inputError.username}>
                      <FormLabel>Your Name</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <BsPerson />
                        </InputLeftElement>
                        <Input
                          type="text"
                          size="md"
                          placeholder="username"
                          onChange={(e: any) =>
                            (username.current = e.target.value)
                          }
                        />
                      </InputGroup>
                      {inputError.username ? (
                        <FormErrorMessage>
                          username is required
                        </FormErrorMessage>
                      ) : (
                        ""
                      )}
                    </FormControl>
                    <FormControl id="email" isInvalid={inputError.email}>
                      <FormLabel>Mail</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <MdOutlineEmail />
                        </InputLeftElement>
                        <Input
                          type="email"
                          size="md"
                          placeholder="email"
                          onChange={(e: any) =>
                            (email.current = e.target.value)
                          }
                        />
                      </InputGroup>
                      {inputError.email ? (
                        <FormErrorMessage>email is required</FormErrorMessage>
                      ) : (
                        ""
                      )}
                    </FormControl>
                    <FormControl id="message" isInvalid={inputError.message}>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        _hover={{
                          borderRadius: "gray.300",
                        }}
                        placeholder="message"
                        onChange={(e: any) =>
                          (message.current = e.target.value)
                        }
                      />
                      {inputError.message ? (
                        <FormErrorMessage>message is required</FormErrorMessage>
                      ) : (
                        ""
                      )}
                    </FormControl>
                    <FormControl id="submit" float="right">
                      <Button
                        variant="solid"
                        bg="#0D74FF"
                        color="white"
                        _hover={{}}
                        onClick={handleSubmit}
                      >
                        {loading && <Spinner />}
                        Send Message
                      </Button>
                    </FormControl>
                  </VStack>
                  <Success
                    isOpen={isOpen}
                    onClose={onClose}
                    onCloseFirstModal={onCloseModal}
                  />
                </Box>
              </Box>
            </Center>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Contact;
