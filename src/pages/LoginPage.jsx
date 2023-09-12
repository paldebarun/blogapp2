import React from 'react'

import  LoginForm  from '../components/LoginForm';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-home-48.png'
import logo from '../images/CU blogs-logos_black.png'
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';


 const LoginPage = () => {

  const [dark,setDark]=useState(false);
  const [isLoading,setLoading]=useState(false);
  
  

  const brightness = () => {
    setDark(false);
  }

  const darkness = () => {
    setDark(true);
  }
  
  return (
   <div>
{isLoading ? <div className='bg-white h-screen w-screen flex justify-center items-center'>

<Spinner />

 

</div>:
 <div className='flex flex-col gap-[50px]'>

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
 
 <div className='flex flex-col items-center'>
 <div className='w-'>
 <NavLink to='/home'> <img src={logo} className='animate-spin  w-[200px] h-auto hover:shadow-xl rounded-full' /> </NavLink>
 </div>
 

<div className='w-full'>
<h1 className='text-center font-bold text-3xl text-slate-400'>Login to CU Blogs</h1>
<LoginForm setLoading={setLoading} dark={dark}/>
 <p className={dark?'text-center text-white ':'text-center text-black'}>If not registered ! 
 <NavLink to='/signup' className='text-blue-600 '> SignUp</NavLink></p>
</div>


 </div>

<Footer />
</div>


}

   </div>
  )
}

export default LoginPage;
