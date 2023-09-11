import React from 'react'
import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import Heading from '../components/Heading';


const Unsuccessfullsignup = () => {

    const [dark,setDark]=useState(false);

  return (
    <div className='flex flex-col  gap-[50px] items-center'>
    <Heading dark={dark} setDark={setDark}/>
    <div className='flex flex-col gap-[20px] scale-75 sm:scale-100 h-[300px] justify-center items-center w-[300px]     bg-gradient-to-r from-slate-200 to-slate-300 shadow-2xl rounded-2xl py-4'>
      
       <p className='text-slate-600 font-mono font-bold '>Sign Up UnSuccessfull</p>
       <p className='font-normal text-slate-500'>kindly retry !</p>
      </div>
      
      <NavLink to='/signup' >
      <button className='bg-blue-900 w-[100px] h-[50px] text-slate-300 rounded-3xl hover:scale-110 duration-150 hover:shadow-xl'>
        retry
      </button>
        
      </NavLink>
     
     <Footer/>
    </div>
  )
}

export default Unsuccessfullsignup;
