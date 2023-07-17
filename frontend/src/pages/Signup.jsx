import React, { useState } from 'react';
import { Tabs,useToast, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';

const Signup = () => {

  const toast = useToast();
  const navigate = useNavigate();

  const [loding,setLoding] = useState(false)

  const [login,setLogin] = useState({
        email:"",
        password:""
    })

    const [signup,setSignup] = useState({
        email:"",
        password:""
    })

    const handleLogin = (e) => {
        setLogin({...login,[e.target.type]:e.target.value})
    }

    const handleSignup = (e) => {
        setSignup({...signup,[e.target.type]:e.target.value})
    }

    const submitLogin = (e) => {
      setLoding(true)
        axios.post('https://digi-asc-lmgc.onrender.com/login', login)
          .then(res => {
            console.log(res.data.token)
            localStorage.setItem("digi-asc",res.data.token)
            setLoding(false)
            
             setLogin({
                email:"",
                password:''
             })

             toast({
              title: res.data.msg,
              // description: "We've Login your account for you.",
              status: 'success',
              duration: 9000,
              isClosable: true,
              position:'top'
            })
             if(res.data.token){
              
              navigate("/")
             }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const submitSignup = () => {
      setLoding(true)
        axios.post('https://digi-asc-lmgc.onrender.com/signup', signup)
          .then(res => {
            toast({
              title: res.msg,
              description: "We've created your account for you. Please login !!",
              status: 'success',
              duration: 9000,
              isClosable: true,
              position:"top"
            })
            setSignup({
                email:"",
                password:''
             })
             setLoding(false)
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    // console.log(text)

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
        <Tabs variant='soft-rounded' colorScheme='blue'>

  <TabList  style={{margin:'auto'}}>
    <Tab >Login</Tab>
    <Tab >Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Heading style={{marginBottom:'15px'}}>Login Form</Heading>
      <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel >Email address</FormLabel>
              <Input value={login.email} onChange={handleLogin} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input value={login.password} onChange={handleLogin} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
              isDisabled={login.email===""||login.password===""}
              onClick={submitLogin}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                {loding?<Spinner/>:"Login"}
              </Button>
            </Stack>
          </Stack>
    </TabPanel>
    <TabPanel>
   <Heading style={{marginBottom:'15px'}}>Signup Form</Heading>
    <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input value={signup.email} onChange={handleSignup} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input value={signup.password} onChange={handleSignup} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
              isDisabled={signup.email===""||signup.password===""}
              onClick={submitSignup}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                {loding?<Spinner />:"Sign Up"}
              </Button>
            </Stack>
          </Stack>
    </TabPanel>
  </TabPanels>
</Tabs>

    </Flex>
  );
}
  


export default Signup