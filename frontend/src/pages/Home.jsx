
import { useEffect, useState ,useRef} from 'react';
import axios from 'axios';
import { Avatar, Box, Grid,Flex, Input, Spinner, Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import { Button,SimpleGrid, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text, Image } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useToast,useDisclosure } from '@chakra-ui/react'

const Home = () => {
  const toast = useToast()
  const [data,setData] = useState([]);
  const [keyword,setKeyword] = useState("")
  const [loding,setLoding] = useState(false)
  const [page,setPage] = useState(1);
  const [totalpage,setTotalpage] = useState(1);
  const [skill,setSkill] = useState("")
  const navigate = useNavigate()
  const [delLodong,setDelLoding] = useState(false)
  const [delid,setDelid] = useState("")
  const [update,setUpdate] = useState({
    name:"",
    skill:"",
    gender:"",
    contact:""
  })
  const {name,gender,contact} = update

  const getData = () => {
    
    setLoding(true)
    axios.get(`https://digi-asc-lmgc.onrender.com/users?page=${page}&q=${keyword}`)
    .then(res => {
      setLoding(false)
      setTotalpage(res.data.totalPages)
      setData(res.data.data)
    })
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(()=>{
    getData();
  },[page])

  const handleLogout = () => {
    localStorage.setItem("digi-asc","")
    navigate("/signup")
    toast({
      title: 'Logout successfully.',
      description: "We've Logout your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
      colorScheme:'red',
      position:"top"
    })
  }

  let {current:wait} = useRef();

 useEffect(()=>{
  clearTimeout(wait)
  wait = setTimeout(()=>{
    setLoding(true)
    axios.get(`https://digi-asc-lmgc.onrender.com/users?page=${page}&q=${keyword}`)
    .then(res => {
      setTotalpage(res.data.totalPages)
      setData(res.data.data)
      setLoding(false)
    })
  },1000)
 },[keyword])

 useEffect(()=>{
  if(skill==""){
    return;
  }else{
    setLoding(true)
    axios.get(`https://digi-asc-lmgc.onrender.com/users?page=${page}&q=${keyword}`)
    .then(res => {
      setTotalpage(res.data.totalPages)
      setData(res.data.data)
      setLoding(false)
      const filteredvalue = res.data.data.filter(item=>item.skill===skill)
      setData(filteredvalue)
    },[skill])
  }

 },[skill])

 const handleDelete = (id) => {
  setDelid(id)
  setDelLoding(true)
  console.log(id)
  axios.delete(`https://digi-asc-lmgc.onrender.com/users/${id}`)
  .then(res => {
    getData();
    toast({
      title: 'User Deleted successfully.',
      description: "We've Delete your account for you.",
      status: 'success',
      duration: 6000,
      isClosable: true,
      colorScheme:'red',
      position:"top"
    })
  })
 }

 const handleUpdate = (e) => {
  setUpdate({...update,[e.target.name]:e.target.value})
 
}

const submitupdate = (id) => {
  onClose()
  //  axios.patch(`https://digi-asc-lmgc.onrender.com/users/${id}`,update)
  //  .then(res => getData())
  // axios.delete()
  getData()
 }
 

  return (
    <div style={{width:"80%",margin:"auto"}}>
     <div style={{width:"60%",margin:'auto',minWidth:"250px",marginTop:'8px',marginBottom:"8px",display:'flex',justifyContent:'space-evenly'}}>
     <Input width={'40%'} value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder='search by user name'/>
     <Select width={'40%'} onChange={(e)=>setSkill(e.target.value)} placeholder='Select option'>
        <option value='full stack Developer'>Full stack developer</option>
        <option value='frontend Developer'>Frontend developer</option>
        <option value='backend Developer'>Backend developer</option>
        <option value='Node js Developer'>Node js developer</option>
     </Select>
     <Button colorScheme='red' onClick={handleLogout}>Logout</Button>
     </div>
      {
        loding?<Spinner />:""
      }

      <div>
        <SimpleGrid columns={[1,2,3]} spacing='10px'>
        {
          data.map(item => 
            <Center py={'20px'}>
            <Box
              maxW={'270px'}
              w={'full'}
              bg={'white'}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}>
              <Image
                h={'120px'}
                w={'full'}
                src={
                  'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                }
                objectFit={'cover'}
              />
              <Flex justify={'center'} mt={-12}>
                <Avatar
                  size={'xl'}
                  src={
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                  }
                  alt={'Author'}
                  css={{
                    border: '2px solid white',
                  }}
                />
              </Flex>
      
              <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                  <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                    {item.name}
                  </Heading>
                  <Text color={'gray.500'}>{item.skill}</Text>
                </Stack>
      
                <Stack direction={'row'} justify={'center'} spacing={6}>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      Followers
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>23k</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                      Followers
                    </Text>
                  </Stack>
                </Stack>
      
               <div style={{display:'flex',justifyContent:'space-evenly',gap:'20px'}}>
               <>
               <Button
               onClick={()=>onOpen()}
                  w={'full'}
                  mt={8}
                  bg={'blue.900'}
                  color={'white'}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}>
                  Edit
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update the User <Text>All input mendatery</Text></ModalHeader>
          
          <ModalCloseButton />
          <ModalBody>
            
           <Input margin={'6px'} name='name' value={name} onChange={handleUpdate}  placeholder='enter user name'/>
           <Input margin={'6px'}  name='gender' value={gender} onChange={handleUpdate} placeholder='enter gender'/>
           <Input margin={'6px'} name='contact' value={contact} onChange={handleUpdate}  placeholder='ecter contact number'/>
           <Select margin={'6px'} name='skill' value={update.skill} onChange={handleUpdate}  placeholder='Select option'>
             <option value='full stack Developer'>Full stack developer</option>
             <option value='frontend Developer'>Frontend developer</option>
             <option value='backend Developer'>Backend developer</option>
             <option value='Node js Developer'>Node js developer</option>
           </Select>
          </ModalBody>

          <ModalFooter>
            <Button  colorScheme='blue' mr={3} onClick={()=>submitupdate(item._id)}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
               </>
                <Button
                onClick={()=>{
                  handleDelete(item._id)
                  onOpen();
                }}
                  w={'full'}
                  mt={8}
                  bg={'red.900'}
                  color={'white'}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}>
                  {delid===item.id?<Spinner/>:"Delete"}
                </Button>
               </div>
              </Box>
            </Box>
          </Center>
            )
        }
        </SimpleGrid>
      </div>

      <div style={{width:'20%',margin:'auto',display:'flex',justifyContent:'space-evenly',marginBottom:'25px'}}>
        <Button isDisabled={page===1} onClick={()=>setPage(page-1)} colorScheme='teal'>PREV</Button>
        <Button isDisabled={true} colorScheme='teal'>{page}</Button>
        <Button isDisabled={page===totalpage} onClick={()=>setPage(page+1)} colorScheme='teal'>NEXT</Button>
      </div>
    </div>
  )
}

export default Home