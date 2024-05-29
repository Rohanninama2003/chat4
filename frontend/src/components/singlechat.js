import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar, Image, useDisclosure } from "@chakra-ui/react";
import "./styles.css";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/Chatlogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./chatcomponents/profilrModel";
import ScrollableChat from "./scrollablechat";
//  import Lottie from "react-lottie";
//  import animationData from "../animations/typing.json";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import io from "socket.io-client";
import UpdateGroupChatModal from "./misc/updateGroupchatModel";
import { ChatState } from "../Context/Chatprovider";
const ENDPOINT = "https://chattty-xoi1.onrender.com"; 
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();
  // const imgString=getSenderFull(user, selectedChat.users).pic;

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stoptyping", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stoptyping", selectedChat._id);
      console.log("room id is", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        console.log(data);

        socket.emit("new message", data);
        console.log("ninama");
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessage) => {
      console.log("inner");
      if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat) {
        if (!notification.includes(newMessage)) {
          setNotification([newMessage, ...notification]);
          console.log("noificarion----------------------------")
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessage]);
      }
    });
  });

  const [clicked, setClicked] = useState(false);
  const clickHandler = () => {
    setClicked(!clicked);
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stoptyping", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={2}
            px={2}
            width="100%"
            fontFamily="cursive"
            display="flex"
            justifyContent={{ base: "space-between", md: "none" }}
            alignItems="center"
            color={"white"}
            background={"gray.900"}
            borderTopRadius={"lg"}
            margin={"0"}
          >
            <Box paddingRight={"10px"} mt={"4px"}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />
              <Avatar
                display={{ base: "none", md: "flex" }}
                size={{ base: "sm", md: "md" }}
                cursor="pointer"
                onClick={onOpen}
                src={getSenderFull(user, selectedChat.users).pic}
              />
              {console.log(getSenderFull.pic)}
            </Box>

            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  <Flex mr={"auto"} flexDir={"column"}  maxHeight={"100%"}>
                    <Box flex={1} >{getSender(user, selectedChat.users)}</Box>
                    <Box flex={1} color={"white"} mt={"-1"} >
                      {istyping ? (
                         <Text color={"#c900ff"} fontSize={"small"} fontFamily={"cursive"} fontWeight={"xl"}>typing...</Text>
                      ) : (
                        <Text color={"#c900ff"} fontSize={"small"} fontFamily={"cursive"} fontWeight={"xl"} >{getSenderFull(user, selectedChat.users).email}...</Text>
                      )}
                      
                    </Box>
                  </Flex>
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            padding={3}
            bg="gray.800"
            width="100%"
            height="100%"
            borderBottomRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              
              <Input
                variant="outline"
                bg="gray.700"
                fontFamily={"cursive"}
                placeholder="Enter a message.."
                color={"white"}
                value={newMessage}
                borderColor={clicked ? "#5d0076" : "#5d0076"} // Change border color conditionally
                onClick={clickHandler}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          w="100%"
          background={"gray.700"}
          borderRadius={"lg"}
        >
          <Text fontSize="3xl" pb={3} fontFamily="cursive" color={"white"}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}

      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background={"gray.800"} color={"white"}>
          <ModalHeader fontFamily={"cursive"}>Profile Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
               
              <Image src={imgString}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default SingleChat;
