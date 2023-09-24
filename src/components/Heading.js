import React, { useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../images/CUBlogs.png'
import {CgProfile} from "react-icons/cg";

import login from '../images/icons8-login-64.png'
import logout from '../images/icons8-logout-64.png'
import {GoHome} from 'react-icons/go'
import {GoHomeFill}  from 'react-icons/go'
import {IoIosLogOut} from 'react-icons/io'
import {IoIosLogIn} from 'react-icons/io'
import {BsPlusSquare} from 'react-icons/bs'
import {BsPlusSquareFill} from 'react-icons/bs'


 const Heading = ({setDark,setLogin,isLoggedIn}) => {
  
  useEffect(()=>{
    const fetchdata=async ()=>{


    }
    fetchdata();
  },[]);
  

  const brightness = () => {
    setDark(false);
  }

  const darkness = () => {
    setDark(true);
  }
  
  const loginfunctionality=()=>{
    if(isLoggedIn){
    setLogin(false);
    localStorage.removeItem('token');

    }

    else{
      
      window.location.href='/login'
    }

  }

  return (
    <div className='heading   w-full flex justify-between  h-[100px]  bg-gradient-to-r   px-4   items-center shadow-lg'>
    
        <div className='flex justify-between w-full'>

        <div>
          <img src={logo} className='absolute left-[20px] top-0 sm:static w-[70px] h-[70px] md:w-[100px] md:h-[100px]' />
         </div>
          
          <div className='md:flex gap-[20px] lg:gap-[50px] hidden justify-center items-center'>
          
          <NavLink to='/home' >
          <GoHome className='sm:w-[28px] sm:h-[28px] lg:w-[33px] hover:cursor-pointer  lg:h-[33px] hover:scale-110 duration-150' />
          </NavLink>

          <NavLink to='/add'  >
          <BsPlusSquare className='sm:w-[21px] sm:h-[21px] hover:cursor-pointer lg:w-[26px] lg:h-[26px] hover:scale-110 duration-150'/>
          </NavLink>
          
          <NavLink to='/dashboard'  >
          <CgProfile className='sm:w-[25px] sm:h-[25px] lg:w-[30px] lg:h-[30px] hover:scale-110 duration-150'/>
          </NavLink>

          <div className='flex gap-[20px]'>
          {
          
        isLoggedIn? <IoIosLogOut onClick={loginfunctionality} className='hover:cursor-pointer sm:w-[27px] sm:h-[27px] lg:w-[32px] lg:h-[32px] hover:scale-110 duration-150 '  />: <IoIosLogIn onClick={loginfunctionality} className='hover:cursor-pointer sm:w-[27px] sm:h-[27px] lg:w-[32px] lg:h-[32px] hover:scale-110 duration-150'   /> 

          }
          </div>
          
          </div>
          

          
          
          </div>
      

    
  </div>
  )
}

export default Heading;
