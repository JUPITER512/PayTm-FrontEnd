import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import Headings from '../../components/Headings'
import Subheading from '../../components/Subheading'
import Inputbox from '../../components/Inputbox'
import Button from '../../components/Button'
import BottomSuggestion from '../../components/BottomSuggestion'
import {useRecoilValue } from 'recoil'
import {usernameState,passwordState } from '../../store/formAtoms'



const Signin = () => {
  const navigate=useNavigate()
  const username=useRecoilValue(usernameState)
  const password=useRecoilValue(passwordState)
  return (
    <Card>
    <Headings label={"Sign In"}/>
    <Subheading label={"Enter Your Info to create account"}/>
    <Inputbox stateAtom={usernameState} label={"Email"}  placeholder={"abc@example.com"}/>
    <Inputbox stateAtom={passwordState} label={"Password"} placeholder={"******"}/>
    <div className=' pt-4'>
      <Button onClick={async ()=>{
      const response=await axios.post("http://glittering-lebkuchen-ca7945/api/v1/user/signin",{
          username,
          password
        })

      if (response.status==200){
        const token= response.data.token
        localStorage.setItem("token",token)
        localStorage.setItem("user",username)
        navigate('/dashboard')
      }
      }} label={"Sign in"}         />
    </div>
    <BottomSuggestion
    label={"Don't Have An Account?"}
    Linktext={"Sign in"}
    to={"/signup"}
    />
  </Card>
  )
}

export default Signin
