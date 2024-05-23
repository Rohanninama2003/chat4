import React from "react";
import { Tooltip, Button, Text, Box, Input, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import UserListItem from "./userAvatar/UserListItem";
import ChatLoading from "./chatLoading";
import { ChatState } from "../Context/Chatprovider";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { getSender } from "../config/Chatlogics";
import { Avatar } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { useState } from "react";
import GroupChatModal from "./misc/groupchatModel";
import { getSenderFull } from "../config/Chatlogics"

const Mychats = ({fetchAgain}) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

   // console.log(user);  
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
   // console.log(userId);
    console.log("in the accesschat")
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      console.log("in the mychats",data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const fetchChats = async () => {
   // console.log(user);
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log(data);
      setChats(data);
    } catch (error) {
   //   console.error(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <>
      <Flex
        flexDir={"column"}
        width={{ base: "100%", md: "31%" }}
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        bg={"gray.900"}
        alignItems="center"
        p={3}
        borderRadius="lg"
        borderWidth="0.5 px"
      >  
        <Flex display={"flex"} width={"100%"} justifyContent={"space-between"} >
          <Box flex={2} justifyContent={"center"} alignItems={"center"}>
            <Tooltip
              label="Search Users to chat"
              hasArrow
              placement="bottom-end"
            >
              <Button
                variant="outline"
                onClick={onOpen}
                bg={"gray.700"}
                _hover={{background:"gray.600"}}
                size={{ base: "md", md: "md" }}
                borderColor={"#5d0076"}
              >  
                 
                <Text
                  
                  d={{ base: "none", md: "flex" }}
                  px={4}
                  color={"white"}
                  mx={"3"}
                  fontFamily={"cursive"}
                >
                  <SearchIcon />
                 
                  Search User
                </Text>
              </Button>
            </Tooltip>
          </Box>
          <Box
            flex={2}
            pb={{ base: "1.5", md: "3" }}
            px={{ base: "1.5", md: "3" }}
            fontSize={{ base: "1em", md: "30px" }}
            fontFamily="cursive"
            display="flex"
            alignItems="center"
            justifyContent={"center"}
          >
            <GroupChatModal>
            <Button
              display="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
              fontFamily={"cursive"}
              bg={"gray.800"}
                _hover={{background:"gray.700"}}
                color={"white"}
            >
                 Group
            </Button>
            </GroupChatModal>
          </Box>
          
        </Flex>

        <Box flexDir="column" w="100%" h="100%">
          <Box
            d="flex"
            flexDir="column"
            p={3}
            bg="gray.800"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {chats ? (
              <Stack overflowY="scroll">
                {chats.map((chat) => (
                  <Flex
                    onClick={() => setSelectedChat(chat)}
                    backdropFilter= "blur(5px) brightness(20%)"
                    cursor="pointer"
                    // bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                    bg={selectedChat === chat ?  "#5d0076" : "#424242" } 
                    // "#38B2AC" "aliceblue" "#424242""506690"
                    color={selectedChat === chat ? "white" : "white"}
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                    display={"flex"}
                    gap={"2"}
                  >


                 
{ !chat.isGroupChat
                          ? 
                            getSenderFull(loggedUser, chat.users)?.pic?
                            <Avatar
                            size={{base:"sm",md:"md"}}
                            cursor="pointer"
                            name={getSenderFull(loggedUser, chat.users)?.name}
                            src={getSenderFull(loggedUser, chat.users)?.pic}
                            /> :
                         
                            <Avatar
                            size={{base:"sm",md:"md"}}
                            cursor="pointer"
                            
                            />                         
                          :  <Avatar
                          size={{base:"sm",md:"md"}}
                          cursor="pointer"
                         
                        
                          
                          />

                }


                    <Flex display={"flex"} flexDir={"column"}>
                      <Text fontFamily={"cursive"}>
                        {!chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName}
                      </Text>
                      {chat.latestMessage && (
                        <Text fontSize="xs">
                          <b>{chat.latestMessage.sender.name} : </b>
                          {chat.latestMessage.content.length > 50
                            ? chat.latestMessage.content.substring(0, 51) +
                              "..."
                            : chat.latestMessage.content}
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                ))}
              </Stack>
            ) : (
              <ChatLoading />
            )}
          </Box>
        </Box>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor={"#5d0076"}
            bg={"gray.900"}
            color={"white"}
            fontFamily={"cursive"}
          >
            Search Users
          </DrawerHeader>
          <DrawerBody bg={"gray.900"}>
            <Flex d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                color={"white"}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch} _hover={{background:"#5d0076"}} >Go</Button>
            </Flex>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Mychats;
