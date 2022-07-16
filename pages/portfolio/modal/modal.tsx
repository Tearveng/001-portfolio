import {
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Button,
  Modal,
  Center,
  Stack,
} from "@chakra-ui/react";
import { Works } from "../../../lib/api/api";
import Image from "next/image";
import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

interface Props {
  works: Works;
  isOpen: boolean;
  onClose(): void;
}

const ModalPoPUp: React.FC<Props> = ({ isOpen, onClose, works }) => {
  const { date, projectName, image, albums } = works;
  const [page, setPage] = useState(0);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={13}>
            Date: {date} <br />
            Title: {projectName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Image
                width="730px"
                height="420px"
                src={albums[page]}
                alt={projectName}
              />
            </Center>
            <br />
            <Center>
              <Stack direction="row" spacing={4}>
                <Button
                  disabled={page < 1 ? true : false}
                  rightIcon={<ArrowLeftIcon />}
                  colorScheme="blue"
                  variant="outline"
                  onClick={() =>
                    setPage((page) => (page > 0 ? page - 1 : page))
                  }
                >
                  Pre
                </Button>
                <Button
                  disabled={page === albums.length - 1 ? true : false}
                  rightIcon={<ArrowRightIcon />}
                  colorScheme="blue"
                  variant="outline"
                  onClick={() =>
                    setPage((page) =>
                      page === albums.length - 1 ? page : page + 1
                    )
                  }
                >
                  Next
                </Button>
              </Stack>
            </Center>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
            {/* <Button variant="ghost" onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPoPUp;
