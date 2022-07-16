import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Authentication, Logout } from "../../lib/authentication/auth";
import { client } from "../../lib/apollo-client";

interface Me {
  me: {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
  };
}

const Me: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading } = Authentication();
  const { logout } = Logout();
  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();

  if (loading) {
    return <div>Loading... </div>;
  }

  return (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={"flex-end"}
      alignItems="center"
      direction={"row"}
      spacing={6}
    >
      <Button onClick={toggleColorMode} colorScheme="gray" variant="ghost">
        <Icon
          as={colorMode === "light" ? MoonIcon : SunIcon}
          color={colorMode === "light" ? "gray.400" : "white"}
          alignItems="center"
          justifyItems="center"
          w={5}
          h={5}
        />
      </Button>

      {data.me === null ? (
        <Button
          // as={"a"}
          fontSize={"sm"}
          fontWeight={400}
          variant={"link"}
          onClick={() => router.push("/auth/signIn")}
        >
          Sign In
        </Button>
      ) : (
        <Flex alignItems="center">
          <Avatar
            alignItems="center"
            justifyItems="center"
            size={"sm"}
            src={data.me.imageUrl}
          />
        </Flex>
      )}

      {data.me === null ? (
        <Button
          // display={{ base: "none", md: "inline-flex" }}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"pink.400"}
          onClick={() => router.push("/auth/signUp")}
          _hover={{
            bg: "pink.300",
          }}
        >
          Sign Up
        </Button>
      ) : (
        <Menu>
          <MenuButton as={Button} colorScheme="pink">
            {data.me.name}
          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem>My Account</MenuItem>
              <MenuItem onClick={() => router.push("/dashboard/dashboard")}>
                Dashboard
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/upload/post");
                }}
              >
                Upload
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await logout();
                  client.resetStore();
                  router.reload();
                  router.push("/");
                }}
              >
                Logout{" "}
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      )}
    </Stack>
  );
};

export default Me;
