import React from 'react'

import  LoginForm  from '../components/LoginForm';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import image1 from '../images/pexels-antoni-shkraba-4348078.jpg'
import image2 from '../images/pexels-pixabay-159618.jpg'
import image3 from '../images/pexels-tirachard-kumtanom-733856.jpg'
import logo from '../images/CUBlogs.png'
import 'react-toastify/dist/ReactToastify.css';
import {CgSpinner} from 'react-icons/cg'


 const LoginPage = () => {

  const [dark,setDark]=useState(false);
  const [isLoading,setLoading]=useState(true);

  useState(()=>{
    const startfunction=()=>{

       setTimeout(() => {
        setLoading(false);
       }, 1000);
     

    }

    startfunction();
  },[])
  
  // useState(()=>{

  //   if(isLoading){
  //   toast("loading please wait ...");}
    
  // },[isLoading])

  const brightness = () => {
    setDark(false);
  }

  const darkness = () => {
    setDark(true);
  }
  
  return (
   <div className='p-4'>
{isLoading ? 
<div className='w-screen h-screen flex justify-center items-center'>
 
<CgSpinner className='animate-spin w-[30px] h-[30px] ' />

</div>
 

:


 <div className='flex flex-col  lg:w-[500px]  m-auto gap-[50px] '>
 
 <div className='flex flex-col items-center'>
 <div className='w-'>
  <img src={logo} className='  w-[200px] h-auto ' />
 </div>
 

<div className='w-auto   p-[50px] flex  gap-[30px]    justify-center items-center shadow-2xl'>

<div className='w-[500px] h-auto hidden lg:flex flex-col gap-[10px] '>
 <div className='w-full h-auto pl-[100px] flex '>
  <img src={image1}  className='w-[150px] shadow-2xl shadow-slate-700 h-[150px] rounded-3xl  '/>
 </div>

 <div className='w-full h-auto flex justify-end pr-[20px]'>
  <img src={image2} className='w-[150px] shadow-2xl shadow-slate-700 h-[150px] rounded-3xl  ' />
 </div>

 <div className='w-full h-auto flex justify-center pr-[50px] '>
  <img src={image3} className='w-[150px] shadow-2xl shadow-slate-700  h-[150px] rounded-3xl ' />
 </div>




</div>



<div className='w-full '>

<LoginForm setLoading={setLoading} dark={dark}/>

  <div className=' w-[200px] sm:w-[350px] m-auto    bg-slate-200 p-3 rounded-xl'>

  <p className='text-center text-xs sm:text-sm text-black font-mono'>Don't have an account ! 
 <NavLink to='/signup' className='text-blue-600 font-mono '> SignUp</NavLink></p>

  </div>

 

</div>

</div>

<div className='w-full h-[100px]'></div>

 </div>


</div>


}

   </div>
  )
}

export default LoginPage;
