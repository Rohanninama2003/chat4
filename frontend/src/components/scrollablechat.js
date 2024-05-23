import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/Chatlogics";
import { Text } from "@chakra-ui/react";
import { ChatState } from "../Context/Chatprovider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                 fontFamily: "cursive",
                backgroundColor: `${
                  m.sender._id === user._id ? "#5d0076" : "#616161"
                }`,

                // color: `${
                //     m.sender._id === user._id ?"Black":"white" 
                //   }`,
                color:"white",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "10px",
                padding: "5px 15px",
                border:"1px solid black",
                backdropFilter: "blur(5px) brightness(20%)",
                maxWidth: "75%",
              }}
            >
              {m.content}             
            </span>
            <Text fontSize={{base:"10px",md:"15px"}} color={"white"}mt={"auto"} ml={"2px"}>
                  {
                   m.createdAt.substr(11, 5)                    
                  }
                 
              </Text>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;