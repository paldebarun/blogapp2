import React, { useEffect, useState } from 'react'
import Heading from '../components/Heading';
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import sessionlogintimer from '../images/5228679.jpg'
import Footer from '../components/Footer';

 const Basepage = () => {

    const [isLoggedIn,setLogin]=useState(false);
    const [dark,setDark]=useState(false);
    
    useEffect(()=> {
     
        return async()=>{const token=localStorage.getItem('token');
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`, 
          };
      
          try {
            const response = await axios.get('http://localhost:4000/api/v1/auth', { headers });
            if (response.data.success) {
              setLogin(true);
              window.location.href='/home'
              console.log("yes");
            }
          } catch (error) {
            console.error('Error verifying token:', error);
           
          }
        }}
      }, []); 
    


  return (
    <div className='flex flex-col gap-[70px]'>

{
    isLoggedIn?(
    <Heading/>
    

    ):( <div className='w-full flex flex-col gap-[30px] items-center'>
        <Heading setDark={setDark} dark={dark}/>
        
       <div className=' card flex flex-col gap-[20px] w-auto h-auto py-7 px-10 justify-center rounded-tl-3xl rounded-tr-md rounded-br-3xl rounded-bl-md items-center bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl scale-75 sm:scale-100 '>
       <img src={sessionlogintimer} className='w-[300px] h-[300px] rounded-full  ' />

       <p className='text-slate-200 text-sm  sm:text-md font-mono'>Your Session Has Expired</p>

       <p className='text-slate-200  text-center  text-md font-mono'>Kindly Login to experience CU blog</p>

       
        <NavLink to='/login' >
        <button className='w-[100px] h-[50px] text-slate-200 bg-blue-900 rounded-3xl hover:shadow-cyan-850 hover:shadow-2xl hover:scale-110 duration-150'>
         
         Login

        </button>
        </NavLink>
        

       </div>

    </div>)
}
<Footer />

    </div>
  )
}


export default Basepage;