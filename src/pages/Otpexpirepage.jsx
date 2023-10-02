import React from 'react'
import { NavLink } from 'react-router-dom';
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-homepage-48.png'
import { useState } from 'react';
import timeouticon from '../images/icons8-time-out-64.png'
import Footer from '../components/Footer';

 const Otpexpirepage = () => {
    const [dark,setDark]=useState(false);
  
  
    const brightness = () => {
      setDark(false);
    }
  
    const darkness = () => {
      setDark(true);
    }

  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-[10px]'>
     
       
       <img src={timeouticon} className='w-[100px] h-[100px] ' />
       <div className='text-3xl sm:text-3xl text-center w-full text-red-500 font-bold'>Otp Expired !</div>
      <NavLink to='/otp-generate' className='text-sky-500' >send otp again</NavLink>
       
    </div>
  )
}

export default Otpexpirepage;