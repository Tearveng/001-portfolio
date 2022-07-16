import {
  Box,
  Center,
  Image,
  Badge,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import ModalPoPUp from "../modal/modal";

const Works = ({ value }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <ModalPoPUp works={value} isOpen={isOpen} onClose={onClose} />
      <Badge colorScheme="green">
        {value.date} Year {value.year}:{" "}
      </Badge>
      <br />
      <br />
      <Center>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onOpen}
        >
          <Box>
            <Center>
              <Box borderWidth="1px" borderRadius="2xl" overflow="hidden">
                <Image
                  src={value.image}
                  w={{
                    sm: "330px",
                    md: "350px",
                    lg: "460px",
                    xl: "380px",
                  }}
                  h="170px"
                  alt={value.projectName}
                />
              </Box>
            </Center>
            <Center>
              <Box p="2">
                <p>
                  {value.projectType} Project: {value.projectName}
                </p>
              </Box>
            </Center>
          </Box>
        </motion.button>
      </Center>
    </Box>
  );
};

export default Works;
