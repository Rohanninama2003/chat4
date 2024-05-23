import {
  VStack,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
//import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import React, { useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
const Signup = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [pic, setpic] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setloading] =useState(false);
  const toast=useToast();
  const history=useHistory();
  const postDetails = (pics) =>{
    setloading(true);
    console.log("hello");
    if(pics===undefined){     
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      console.log("hello");
      
      console.log(pics);
      if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chatty-web");
        data.append("cloud_name", "dtusqbli0");
        fetch("https://api.cloudinary.com/v1_1/dtusqbli0/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setpic(data.url.toString());
            console.log(data.url.toString());
            setloading(false);
          })
          .catch((err) => {
            console.log(err);
            setloading(false);
          });
      } else {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setloading(false);
        return;
      }
    }
  


  const submithandler =async () => {
    setloading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
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
        placeholder="Name"
        fontSize={14}
        type="text"
        size={"sm"}
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <Input
        mt={"0.6em"}
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
      <Input
        mt={"0.6em"}
        p={"1.1em"}
        border={"2px solid black"}
        borderRadius={"5px"}
        _placeholder={{ color: "gray.500" }}
        placeholder="confirm password"
        fontSize={14}
        type="password"
        size={"sm"}
        value={confirmpassword}
        onChange={(e) => setconfirmpassword(e.target.value)}
      />
      <Input
        pt={"2px"}
        mt={"0.6em"}
        border={"2px solid black"}
        borderRadius={"5px"}
        _placeholder={{ color: "black" }}
        placeholder="profilepic"
        fontSize={14}
        type="file"
        accept="images/*"
        size={"sm"}
       
        onChange={(e) => postDetails(e.target.files[0])}
      />
      <Button
        mt={"1.5em"}
        w={"full"}
        colorScheme="blackAlpha"
        size={"md"}
        fontSize={14}
        onClick={submithandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    
    </VStack>
  );
};

export default Signup;
