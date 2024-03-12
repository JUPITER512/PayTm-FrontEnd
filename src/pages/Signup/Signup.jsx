import React, { useState } from 'react'
import axios from 'axios'
import Card from '../../components/Card'
import Headings from '../../components/Headings'
import Subheading from '../../components/Subheading'
import Inputbox from '../../components/Inputbox'
import Button from '../../components/Button'
import BottomSuggestion from '../../components/BottomSuggestion'
import { useRecoilState, useRecoilValue } from 'recoil'
import { firstnameState,lastnameState,usernameState,passwordState } from '../../store/formAtoms'

const Signup = () => {
  // const [firstname,setFirstname]=useState()
  // const [lastname,setLastname]=useState()
  // const [username,setUsername]=useState()
  // const [password,setPassword]=useState()

  const firstname=useRecoilValue(firstnameState)
  const lastname=useRecoilValue(lastnameState)
  const username=useRecoilValue(usernameState)
  const password=useRecoilValue(passwordState)
  return (
    <Card>
    <Headings label={"Sign Up"}/>
    <Subheading label={"Enter Your Info to create account"}/>
    <Inputbox stateAtom={firstnameState} label={"First Name"} placeholder={"Ali"}/>
    <Inputbox stateAtom={lastnameState}    label={"Last Name"} placeholder={"Murtaza"}/>
    <Inputbox stateAtom={usernameState} label={"Email"}  placeholder={"abc@example.com"}/>
    <Inputbox stateAtom={passwordState} label={"Password"} placeholder={"******"}/>
    <div className=' pt-4'>
      <Button onClick={()=>{
        axios.post("http://glittering-lebkuchen-ca7945/api/v1/user/signup",{
          firstname,
          lastname,
          username,
          password
        })
      }} label={"Sign Up"}        />
    </div>
    <BottomSuggestion
    label={"Do Have An Account?"}
    Linktext={"Sign in"}
    to={"/signin"}
    />
  </Card>
  )
}

export default Signup
