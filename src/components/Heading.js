import React from 'react'
import {NavLink} from 'react-router-dom'
import image from '../images/CU blogs-logos_black.png'
// import { useState } from 'react'
import sun from '../images/icons8-sun-30.png'
import moon from '../images/icons8-crescent-moon-50.png'
 const Heading = ({dark,setDark}) => {
  
  const themehandler=()=>{

    setDark(!dark);
  }
  

  return (
    <div className="w-full">
    <nav className={dark?'flex flex-row justify-between pr-[30px] sm:pr-[90px] items-center bg-black':'flex flex-row justify-between  items-center bg-white pr-[30px] sm:pr-[90px]'}>
    <NavLink to='/' className={dark?'flex flex-row gap-4 bg-black text-white px-10 py-4 items-center':'flex flex-row gap-4 bg-white text-black px-10 py-4 items-center'} >

    <img src={image}  alt='logo'  className={dark?'w-20 rounded-full lg:w-20 sm:w-20 hover:shadow-md hover:shadow-slate-600  ':'w-20 lg:w-20 sm:w-20 rounded-full hover:shadow-xl '}></img>
    <p className='hidden sm:block lg:text-sm sm:text-xs '>Get interesting blogs here</p>


    </NavLink>
    
    <div className={dark?'w-6 bg-black ':'w-6 bg-white'}>
      <img onClick={themehandler} src={dark? moon :sun} alt="theme "  className={dark?'invert hover:cursor-pointer':'hover:cursor-pointer scale-125'} ></img>

    </div>
       
    </nav>
    </div>
  )
}

export default Heading;
