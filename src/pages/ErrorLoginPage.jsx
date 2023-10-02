import React, { useState } from 'react'
import Heading from '../components/Heading';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

 const ErrorLoginPage = () => {
 useEffect(()=>{
  const firstfunction=()=>{
   
    alert('there was something error kindly relogin with correct credentials');

  }
  firstfunction();
 },[])
 const [dark,setDark]=useState(false);

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
   
     
      <p className='text-xs flex-col h-auto mt-[100px] sm:text-sm gap-[10px] sm:flex-row  md:text-md flex items-center w-full justify-center font-mono '> There was an error in the logging in please  <NavLink to='/login' className='text-blue-500'>re-login !</NavLink></p>
    </div>
  )
}

export default ErrorLoginPage;
