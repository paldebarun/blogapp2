import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import Heading from '../components/Heading';
import reward from '../images/olympics-159619_1280.png'

const SuccessSignupPage = () => {

    const [dark,setDark]=useState(false);
  return (
    <div className='flex flex-col  gap-[50px] items-center'>
    <Heading dark={dark} setDark={setDark}/>
    <div className='flex flex-col gap-[20px] scale-75 sm:scale-100 h-[300px] justify-center items-center w-[300px]     bg-gradient-to-r from-slate-200 to-slate-300 shadow-2xl rounded-2xl py-4'>
       <img src={reward}  className='w-[200px] h-[200px]'/>
       <p className='text-slate-600 font-mono font-bold '>Sign Up Successfull</p>
       <p className='font-normal text-slate-500'>Login to continue</p>
      </div>
      
      <NavLink to='/login' >
      <button className='bg-blue-900 w-[100px] h-[50px] text-slate-300 rounded-3xl hover:scale-110 duration-150 hover:shadow-xl'>
        login
      </button>
        
      </NavLink>
     
     <Footer/>
    </div>


    
  );
};

export default SuccessSignupPage;
