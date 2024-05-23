import { ViewIcon ,DragHandleIcon,AtSignIcon} from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <> 
       
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<AtSignIcon />} onClick={onOpen} />
        
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered bg="gray" >
        <ModalOverlay  />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="2em"
            fontFamily="cursive"
            d="flex"
            justifyContent="center"
            textAlign="center"
            bg={"gray.900"}
            color={"white"}
          > 
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex" flexDir="column" alignItems="center" justifyContent="space-between"
            mx={"auto"}
            bg={"gray.900"}
            minW={"100%"}
          > 
          <Box  bg={"gray.900"}>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "1em", md: "1.5em" }}
              fontFamily="cursive"
              color={"white"}
            > 
              
              Email: {user.email}
            </Text>
            </Box>
          </ModalBody>
          <ModalFooter  bg={"gray.900"}>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;