import { Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentification/Login";
import Signup from "../components/Authentification/Signup";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" backdropBlur={"xl"} bgColor={"gray.900"}>
    {/* //  <video src="https://videos.pexels.com/video-files/5680034/5680034-hd_1920_1080_24fps.mp4" autoPlay muted loop /> */}
      <Container
        maxW="container.md"
        centerContent
        background={"white"}
        maxH="xl"
        px={0}
      >
        <Flex width="100%" height="100%" >
          <Box
            background="black"
            color="white"
            alignItems="center"
            justifyContent={"center"}
            flex={2}
            minH={"70vh"}
            maxW={"50%"}
            height="100%"
            display={{ base: "none", md: "flex" }}
           
          >
            <Flex flexDir={"column"} >
              <Text fontSize="xx-large">Welcome to </Text>
              <Text fontSize="xxx-large">Chatty . . .</Text>
            </Flex>
          </Box>

          <Box background={"white"}  flex={2} >
            <Tabs colorScheme="gray" >
              <TabList mb={"1em"}>
                <Tab width={"50%"} >Login</Tab>
                <Tab width={"50%"}>Signup</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                   <Login/>
                </TabPanel>
                <TabPanel>
                  <Signup/>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};

// const TextAnimation = ({ text, fontSize }) => {
//   const [typedText, setTypedText] = React.useState("");

//   React.useEffect(() => {
//     let timer;
//     let i = 0;
//     const interval = 150; // Adjust typing speed

//     const type = () => {
//       timer = setTimeout(() => {
//         setTypedText((prevText) => prevText + text[i]);
//         i++;
//         if (i < text.length) {
//           type();
//         }
//       }, interval);
//     };

//     type();

//     return () => clearTimeout(timer);
//   }, [text]);

//   return <Text fontSize={fontSize}>{typedText}</Text>;
// };
export default Homepage;
