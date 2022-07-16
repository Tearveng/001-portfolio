import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { POSTS } from "..";

const Search = ({ getData }: any) => {
  const [storeSearch, setStoreSearch] = useState("");
  const cancelRef = useRef<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const posts = getData.filter((e: POSTS) =>
    e.title.toLocaleLowerCase().includes(storeSearch.toLocaleLowerCase())
  );

  return (
    <Container maxW="1000" pt={5}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        <Input alignItems="center" placeholder="Search" onClick={onOpen} />
        <Modal
          finalFocusRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  value={storeSearch}
                  alignItems="center"
                  onChange={(e: any) => setStoreSearch(e.target.value)}
                  placeholder="Search"
                />
              </InputGroup>
            </ModalHeader>
            <ModalBody>
              {storeSearch &&
                posts.map((e: POSTS, index: any) => (
                  <div key={index}>
                    <Link
                      href={{
                        pathname: `./detail/${e.id}`,
                        query: { id: e.id },
                      }}
                    >
                      <Button
                        w="full"
                        justifyContent="flex-start"
                        colorScheme="gray"
                        variant="ghost"
                      >
                        {e.title}
                      </Button>
                    </Link>
                  </div>
                ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      </InputGroup>
    </Container>
  );
};

export default Search;
