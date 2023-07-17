import React, { useState } from 'react'
import { Button, Input,Select, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Adduser = () => {
    const [update,setUpdate] = useState({
        name:"",
        skill:"",
        gender:"",
        contact:""
    })

    const {name,skill,gender,contact} = update;

    const handleUpdate = (e) => {
        setUpdate({...update,[e.target.name]:e.target.value})
    }

    const navigate = useNavigate();
    const toast = useToast()

    console.log(update)

    const handleSubmit = () => {
        axios.post(`https://digi-asc-lmgc.onrender.com/users`,update)
        .then(res=>{
            setUpdate({
                name:"",
                skill:"",
                gender:"",
                contact:""
            })
            toast({
                title: 'User Added successfully.',
                description: "We've Added new user for you.",
                status: 'success',
                duration: 6000,
                isClosable: true,
                colorScheme:'blue',
                position:"top"
              })
        })
        setTimeout(()=>{
            navigate("/")
        },1000)
    }
  return (
    <div style={{width:'30%',margin:"auto",marginTop:"20px"}}>
           <Input margin={'6px'} name='name' value={name} onChange={handleUpdate}  placeholder='enter user name'/>
           <Input margin={'6px'}  name='gender' value={gender} onChange={handleUpdate} placeholder='enter gender'/>
           <Input margin={'6px'} name='contact' value={contact} onChange={handleUpdate}  placeholder='ecter contact number'/>
           <Select margin={'6px'} name='skill' value={skill} onChange={handleUpdate}  placeholder='Select option'>
             <option value='full stack Developer'>Full stack developer</option>
             <option value='frontend Developer'>Frontend developer</option>
             <option value='backend Developer'>Backend developer</option>
             <option value='Node js Developer'>Node js developer</option>
           </Select>
           <Button colorScheme='blue' onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default Adduser