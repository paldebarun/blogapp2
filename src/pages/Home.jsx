import React, { useEffect, useState } from 'react'
import Heading from '../components/Heading';
import LeftSidebar from '../components/LeftSidebar';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-home-48.png'
import sessionlogintimer from '../images/../images/5228679.jpg'
import Footer from '../components/Footer';
import ContentPage from '../components/ContentPage';


const Home = () => {
  
  const [dark,setDark]=useState(false);
  const [isLoggedIn,setLogin]=useState(false);
 
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
          console.log("yes",response);
        }
      } catch (error) {
        console.error('Error verifying token:', error);

      }
    }}
  }, []); 

  const brightness = () => {
    setDark(false);
  }

  const darkness = () => {
    setDark(true);
  }


  return (
   
    <div >
    {isLoggedIn?
    <div className='flex flex-col overflow-y-hidden gap-[30px] w-screen'>
    <div><Heading dark={dark} setDark={setDark} isLoggedIn={isLoggedIn} setLogin={setLogin} /></div>
     
     <div className='flex gap-[10px]  w-screen h-auto'>
       
       <LeftSidebar />
      
      <ContentPage />
       

    

     </div>

  
    <Footer />
  
  </div>
  :
  <div className='w-full flex flex-col gap-[30px] items-center'>
        {/* <Heading setDark={setDark} dark={dark} /> */}

        <div className='heading h-[100px] w-full flex justify-between  md:h-[120px] relative bg-gradient-to-r from-cyan-500 to-blue-500 px-4  items-center shadow-lg'>
    {
      dark ? (
        <div className='flex justify-between w-full'>
          <NavLink to='/home' ><img className=' hover:cursor-pointer w-[24px] h-[24px] sm:w-[50px] sm:h-[50px] hover:scale-110 duration-150' src={home} /></NavLink>

          
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

       <Footer />
    </div>}
  </div>
  )
}

export default Home;