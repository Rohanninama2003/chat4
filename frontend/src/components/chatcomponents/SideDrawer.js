import React from "react";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text, Flex } from "@chakra-ui/layout";
import ProfileModal from "./profilrModel";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import NotificationBadge from "react-notification-badge";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useState } from "react";
import { ChatState } from "../../Context/Chatprovider";
import { useHistory } from "react-router-dom";
import { getSender } from "../../config/Chatlogics";
import { Effect } from "react-notification-badge";

const SideDrawer = () => {
  const User = ChatState().user;
  const history = useHistory();
  console.log(User);
  console.log("hii")
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  return (
    <>
      <Flex
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.900"
        color={"white"}
        w="100%"
        ml={0}
        mt={0}
        p="5px 10px 12px 10px"
        borderBottomColor={"#5d0076"}
        borderBottomWidth={"1px"}
        maxH={"3em"}
      >
        <Text fontSize="3xl" fontFamily="cursive" ml={"5"}>
          Chatty
        </Text>
        
        <Box >
        <Menu  mr={"5"}>
          <MenuButton p={1}>
             
             {console.log("noti array",notification)}
             {notification.length!=0 && console.log("menu item",notification[0].chat)}
            <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
            <BellIcon fontSize="2xl" m={1} />
          </MenuButton>
          <MenuList pl={2} bg={"gray.800"}>

            
              {notification.length==0 && `No New Messages` }
              {notification.length!=0 && `you have new messages` }
              {/* {  notification.length!=0 && notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  { notification.length!=0 && notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : ( notification.length!=0  &&  `New Message from ${getSender(user, notif.chat) || 'Unknown Sender'}` )}
                </MenuItem>
              ))} */}
            </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            bg="gray.800"
            _hover={{bg:"gray.700"}}
            rightIcon={<ChevronDownIcon color={"white"} />}
          > 
           { console.log(User.pic)}
            <Avatar
              size="sm"
              cursor="pointer"
               src={User?.pic}
            />
           
          </MenuButton>
          <MenuList bg="gray.800">
            <ProfileModal user={User}>
              <MenuItem bg="gray.800">My Profile</MenuItem>{" "}
            </ProfileModal>
            <MenuDivider />
            <MenuItem bg="gray.800" onClick={logoutHandler}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
        </Box>
      </Flex>
     
    </>
  );
};

export default SideDrawer;
