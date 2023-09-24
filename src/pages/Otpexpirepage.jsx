import React from 'react'
import { NavLink } from 'react-router-dom';
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-homepage-48.png'
import { useState } from 'react';
import timeouticon from '../images/out-of-time.png'
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
    <div className='w-screen h-auto flex items-center flex-col gap-[200px]'>
     <div className='heading h-[100px] w-full flex justify-between  md:h-[120px] relative bg-gradient-to-r from-cyan-500 to-blue-500 px-4  items-center shadow-lg'>
    {
      dark ? (
        <div className='flex justify-between w-full'>
          <NavLink to='/home' ><img className='  hover:cursor-pointer w-[24px] h-[24px] sm:w-[50px] sm:h-[50px] hover:scale-110 duration-150' src={home} /></NavLink>

          
          <img src={sun} className=" w-[24px] h-[24px] sm:w-[50px] sm:h-[50px]  hover:cursor-pointer hover:scale-110 duration-150" onClick={brightness} />
          
          
          
          
          </div>

      ) : (
        <div className='flex justify-between w-full'>
          <NavLink to='/home' ><img className=' hover:cursor-pointer w-[24px] h-[24px] sm:w-[50px] sm:h-[50px] hover:scale-110 duration-150' src={home} /></NavLink>

         
          <img src={moon} className=" w-[24px] h-[24px] sm:w-[50px] sm:h-[50px]  hover:cursor-pointer hover:scale-110 duration-150" onClick={darkness} />
          
         
          
          </div>
      )

    }
     </div>
       
       <img src={timeouticon} className='w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px]' />
       <div className='text-3xl sm:text-5xl text-center w-full text-red-500 font-bold'>Otp Expired !</div>
      <NavLink to='/otp-generate' className='text-sky-500' >send otp again</NavLink>
       <Footer />
    </div>
  )
}

export default Otpexpirepage;