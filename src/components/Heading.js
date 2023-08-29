import React from 'react'
import {NavLink} from 'react-router-dom'
// import image from '../images/CU blogs-logos_black.png'
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-home-48.png'
import login from '../images/icons8-login-64.png'
import logout from '../images/icons8-logout-64.png'


 const Heading = ({dark,setDark,setLogin,isLoggedIn}) => {
  
  

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
    <div className='heading h-[100px] w-full flex justify-between  md:h-[120px] relative bg-gradient-to-r from-cyan-500 to-blue-500 px-4  items-center shadow-lg'>
    {
      dark ? (
        <div className='flex justify-between w-full'>
          <NavLink to='/home' ><img className=' hover:cursor-pointer w-[24px] h-[24px] sm:w-[50px] sm:h-[50px] hover:scale-110 duration-150' src={home} /></NavLink>

          <div className='flex gap-[20px]'>
          <img src={sun} className=" w-[24px] h-[24px] sm:w-[50px] sm:h-[50px]  hover:cursor-pointer hover:scale-110 duration-150" onClick={brightness} />
          
          {
          
           <img src={isLoggedIn? logout : login} onClick={loginfunctionality} className='hover:cursor-pointer w-[24px] h-[24px] sm:w-[50px] sm:h-[50px] hover:scale-110 duration-150' />

          }
          </div>
          
          </div>

      ) : (
        <div className='flex justify-between w-full'>
          <NavLink to='/home' ><img className=' hover:cursor-pointer w-[24px] h-[24px] sm:w-[50px] sm:h-[50px] hover:scale-110 duration-150' src={home} /></NavLink>

          <div className='flex gap-[20px]'>
          <img src={moon} className=" w-[24px] h-[24px] sm:w-[50px] sm:h-[50px]  hover:cursor-pointer hover:scale-110 duration-150" onClick={darkness} />
          
          {
          
           <img src={isLoggedIn? logout : login} onClick={loginfunctionality} className='hover:cursor-pointer w-[24px] h-[24px] sm:w-[50px] sm:h-[50px] hover:scale-110 duration-150' />

          }
          </div>
          
          </div>
      )

    }
  </div>
  )
}

export default Heading;
