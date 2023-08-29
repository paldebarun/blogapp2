import React from 'react'
import instagram from '../images/icons8-instagram-48.png'
import facebook from '../images/icons8-facebook-64.png'
import linkedin from '../images/icons8-linkedin-50.png'
import mail from '../images/icons8-gmail-48.png'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex flex-col gap-0 w-full '>
       <div className='font-extrabold  text-4xl sm:text-5xl  md:text-7xl text-blue-950 animate-bounce duration-300  hover:cursor-pointer'>CU Blogs</div>
       <div className='h-auto w-full bg-blue-950 p-10 flex flex-col gap-[30px]'>
        
        <div className='flex justify-center gap-[10px] items-center'>
           <NavLink to='https://www.instagram.com/debarun_27/' ><img  src={instagram} className='w-[50px] h-[50px] invert hover:-translate-y-1'/></NavLink>
           <NavLink to='' ><img  src={facebook} className='w-[50px] h-[50px] hover:-translate-y-1'/></NavLink>
           <NavLink to='www.linkedin.com/in/debarun-pal-3ba144216' ><img  src={linkedin} className='w-[50px] h-[50px] invert hover:-translate-y-1'/></NavLink>
           <NavLink to='' ><img  src={mail} className='w-[50px] h-[50px] hover:-translate-y-1'/></NavLink>

  
        </div>

        <div className='text-center text-slate-400'>Contact us for any query through the above mentioned medias</div>


       </div> 
    
    </div>
  )
}

export default Footer
