import {
  VStack,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
//import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios"

const Login = () => {
  
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading,setloading] =useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast=useToast();
  const history=useHistory();

  const submithandler = async() => {
    setloading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
       
      console.log("logged in");
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      //setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  };

  return (
    <VStack
      maxW={"85%"}
      alignItems={"center"}
      display={"flex"}
      justifyContent={"center"}
      mx={"auto"}
    >
    
      <Input
        mt={"1em"}
        p={"1.1em"}
        border={"2px solid black"}
        borderRadius={"5px"}
        _placeholder={{ color: "gray.500" }}
        placeholder="email"
        fontSize={14}
        type="email"
        size={"sm"}
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <InputGroup>
        <Input
          mt={"0.6em"}
          border={"2px solid black"}
          borderRadius={"5px"}
          _placeholder={{ color: "gray.500" }}
          placeholder="Password"
          fontSize={14}
          type={!showPassword ? "text" : "password"}
          value={password}
          size={"sm"}
          onChange={(e) => setpassword(e.target.value)}
        />
        <InputRightElement h="full">
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Show" : "Hide"}
          </Button>
        </InputRightElement>
      </InputGroup>

      <Button
        mt={"1.5em"}
        w={"full"}
        colorScheme="blackAlpha"
        size={"md"}
        fontSize={14}
        onClick={submithandler}
        isLoading={loading}
      >
        Log in
      </Button>
      <Button
        variant="solid"
        colorScheme="blackAlpha"
        width="100%"
        onClick={() => {
          setemail("guest@example.com");
          setpassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
