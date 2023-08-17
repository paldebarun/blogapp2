import React from 'react'
import Sidebarlinks from '../constants/Sidebarlinks';
import { useLocation } from 'react-router-dom';
import SignOutButton from './SignOutButton';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import SignInbutton from './SignInbutton';

 const Bottombar = ({dark}) => {
  
  const [isLoggedIn,logInhanlder]=useState(false);

  const signInHandler=()=>{
    logInhanlder(true);
  }

  const signOutHandler=()=>{
    logInhanlder(false);
  }

    const location = useLocation();
  return (
    <div className={dark?' flex flex-row w-screen  h-auto items-center justify-around bg-black gap-3 px-5 py-5 sm:hidden':' flex flex-row w-screen  h-auto items-center justify-around bg-white  gap-3 px-5 py-5 sm:hidden border-solid border-2 border-gray-300 hover:border-dashed'}>
        {Sidebarlinks.map((element, index) => {
          const isActive =
            location.pathname.includes(element.route) ||
            (element.route.length > 1 && location.pathname === element.route);

          return (
            <div key={index}>
              <NavLink
                to={element.route}
                className={
                  isActive
                    ? (dark?'flex gap-2 items-center text-black bg-slate-500 rounded-md p-2':'flex gap-2 items-center text-gray-600 bg-slate-300 rounded-md p-2')
                    : (dark?'flex gap-2 items-center text-white p-2 hover:bg-slate-100 rounded-md group':'flex gap-2 items-center text-black p-2  hover:bg-slate-100 rounded-md')
                }
              >
                <img src={element.imageUrl} alt={element.label} className={isActive?(dark?'w-6 h-6 ':'w-6 h-6 invert-[.25]'):(dark?'w-6 h-6 invert group-hover:invert-0':'w-6 h-6 invert-0')} />
                
              </NavLink>
            </div>
          );
        })}
        {
          isLoggedIn?<SignOutButton dark={dark} onClick={signOutHandler} />:<SignInbutton dark={dark} onClick={signInHandler} />

        }

        
      </div>
  )
}

export default Bottombar;
