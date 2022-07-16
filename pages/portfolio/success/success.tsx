import {
  Box,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Center,
  ModalFooter,
  ModalContent,
  Button,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import React from "react";
import { useRouter } from "next/router";

interface Props {
  isOpen: boolean;
  onClose(): void;
  onCloseFirstModal(): void;
}

const Success: React.FC<Props> = ({ isOpen, onClose, onCloseFirstModal }) => {
  const router = useRouter();

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Box textAlign="center" py={10} px={6}>
              <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
              <Heading as="h2" size="xl" mt={6} mb={2}>
                Message Sent
              </Heading>
              <Text color={"gray.500"}>Thank You for Contact Me 😘 😘.</Text>
            </Box>
          </Center>
          <Center>
            <Button bg="#0D74FF" mr={3} onClick={onCloseFirstModal}>
              Close
            </Button>
          </Center>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Success;
