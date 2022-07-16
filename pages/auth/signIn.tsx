import { Cache, gql, useMutation } from "@apollo/client";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { SignInForm } from "../../lib/authentication/auth";
import HeaderNavigator from "../nav/header";
import { ControllInput } from "../upload/input";

export default function SignIn() {
  const router = useRouter();
  const email = useRef("");
  const password = useRef("");

  const color1 = useColorModeValue("gray.50", "gray.800");
  const color2 = useColorModeValue("white", "gray.700");
  const [loginError, setErrorLogin] = useState({
    errorEmail: false,
    errorPassword: false,
  });

  const [newError, setNewError] = useState("");

  const { login, data, loading } = SignInForm();

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!email.current) {
      return setErrorLogin({ ...loginError, errorEmail: true });
    }
    if (!password.current) {
      return setErrorLogin({ ...loginError, errorPassword: true });
    }

    const data: any = await login({
      variables: { email: email.current, password: password.current },
    });
    const { error } = data.data.userLogin;
    if (error !== null) {
      setNewError(error);
    } else {
      router.push({ pathname: "/" });
    }
  };

  // if (data) {
  //   const { error } = data.userLogin;
  //   console.log(error);
  //   if (error) {
  //     receiveError = error;
  //   } else {
  //     router.push({ pathname: "/" });
  //   }
  // }
  // console.log(email.current);
  // console.log(password.current);

  return (
    <Box>
      <HeaderNavigator />
      <form>
        <Flex minH={"80vh"} align={"center"} justify={"center"} bg={color1}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in</Heading>
              <p style={{ marginBottom: "-20px", color: "red" }}>{newError}</p>
            </Stack>

            <Box rounded={"lg"} bg={color2} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl id="email" isInvalid={loginError.errorEmail}>
                  <FormLabel>Email address</FormLabel>
                  <ControllInput
                    title="Email"
                    type="text"
                    OnUpdate={(val: any) => {
                      email.current = val;
                    }}
                  />

                  {loginError.errorEmail && (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl id="password" isInvalid={loginError.errorPassword}>
                  <FormLabel>Password</FormLabel>
                  <ControllInput
                    title="Password"
                    type="password"
                    OnUpdate={(val: any) => {
                      password.current = val;
                    }}
                  />

                  {loginError.errorPassword && (
                    <FormErrorMessage>Password is required.</FormErrorMessage>
                  )}
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={"blue.400"}>Forgot password?</Link>
                  </Stack>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                    onClick={onFormSubmit}
                  >
                    {loading ? <Spinner size="lg" /> : "Sign in"}
                  </Button>
                </Stack>
                <Stack pt={3}>
                  <Text align={"center"}>
                    Not yet have an account?{" "}
                    <Link
                      color={"blue.400"}
                      onClick={() => router.push("/auth/signUp")}
                    >
                      SingUp
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
}
