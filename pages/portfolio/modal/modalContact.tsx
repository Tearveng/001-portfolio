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
import Contact from "../contact/contact";

interface Props {
  isOpen: boolean;
  onClose(): void;
}

const ModalContact: React.FC<Props> = ({ isOpen, onClose }) => {
  const [page, setPage] = useState(0);

  console.log(page);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader fontSize={13}>
            Date: {date} <br />
            Title: {projectName}
          </ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Contact onCloseModal={onClose}></Contact>
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

export default ModalContact;
