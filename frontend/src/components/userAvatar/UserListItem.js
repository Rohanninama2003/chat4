import { Avatar } from "@chakra-ui/avatar";
import { Box, Text,Flex } from "@chakra-ui/layout";
import { ChatState } from "../../Context/Chatprovider";

const UserListItem = ({ user,handleFunction }) => {
  

  return (
    <Flex
      onClick={handleFunction}
      cursor="pointer"
      bg="gray.700"
      _hover={{
        background: "#5d0076",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      fontFamily={"cursive"}
      color="white"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Flex>
  );
};

export default UserListItem;