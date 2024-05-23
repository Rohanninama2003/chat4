import SideDrawer from "../components/chatcomponents/SideDrawer";
import { Box, Flex } from "@chakra-ui/react";
import { ChatState } from "../Context/Chatprovider";
import Mychats from "../components/Mychats";
import Chatbox from "../components/Chatbox";
import { useState } from "react";
const Chatpage = () => {
  const user = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div  style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Flex  display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px" bgColor={"gray.800"}>
        {user && <Mychats  fetchAgain={fetchAgain}/>}
        {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />}
      </Flex>
    </div>
  );
};

export default Chatpage;
