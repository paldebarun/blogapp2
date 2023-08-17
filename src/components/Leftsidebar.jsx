import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebarlinks from '../constants/Sidebarlinks';
import { useLocation } from 'react-router-dom';
import SignOutButton from './SignOutButton';
import { useState } from 'react';
import SignInbutton from './SignInbutton';

const Leftsidebar = ({dark}) => {
  const location = useLocation();
  const [isLoggedIn,logInhanlder]=useState(false);

  const signInHandler=()=>{
    logInhanlder(true);
  }

  const signOutHandler=()=>{
    logInhanlder(false);
  }

  return (
    <div>
      <div className={dark?'hidden  sm:w-[150px] w-[100px] sm:flex flex-col h-screen bg-black gap-6 px-5 py-5':'hidden  sm:w-[150px] w-[100px] sm:flex flex-col h-screen bg-white gap-6 px-5 py-5  border-solid border-2 border-gray-300 hover:border-dashed'}>
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
                    ? (dark?'flex gap-2 items-center text-black bg-slate-500 rounded-md p-2 ':'flex gap-2 items-center text-gray-600 bg-slate-300 rounded-md p-2 ')
                    : (dark?'flex gap-2 items-center text-white  p-2 hover:bg-slate-100 group rounded-md ' :'flex gap-2 items-center text-black p-2  hover:bg-slate-100 rounded-md')
                }
              >
                <img src={element.imageUrl} alt={element.label} className={isActive?(dark?'w-6 h-6 ':'w-6 h-6 invert-[.25] hover:text-black'):(dark?'w-6 h-6  invert group-hover:invert-0':'w-6 h-6 invert-0')} />
                <p className={dark?'hidden text-xs sm:block group-hover:text-black md:text-sm':'hidden text-xs sm:block md:text-sm'}>{element.label}</p>
              </NavLink>
            </div>
          );
        })}
        {
          isLoggedIn?<SignOutButton dark={dark} onClick={signOutHandler} />:<SignInbutton dark={dark} onClick={signInHandler} />

        }
        

        
      </div>
    </div>
  );
};

export default Leftsidebar;
