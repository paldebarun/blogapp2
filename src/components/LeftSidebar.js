// LeftSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebarlinks from '../constants/Sidebarlinks';
import close from '../images/icons8-close-64.png'

const LeftSidebar = ({setmenu}) => {

  const closehandler=()=>{
    setmenu(true);
  }

  return (
    <div className=' scale-95 sm:scale-100 bg-white z-20   h-screen absolute md:left-[100px] lg:left-[20px] flex flex-col items-end w-[300px] sm:w-[300px] border gap-[30px] p-5 shadow-2xl'>
      <img src={close} onClick={closehandler} className='hover:cursor-pointer w-[30px] h-[30px]  mr-[220px]' />
      {Sidebarlinks.map((element, index) => (
        <NavLink to={element.route} key={index} className="    flex w-[200px] sm:w-[200px]  sm:gap-[10px] items-center group hover:bg-slate-200 hover:rounded-lg hover:p-2 duration-100 hover:shadow-lg">
          <img src={element.imageUrl} alt={element.label}  className=' w-[50px] h-[50px] sm:w-[50px] sm:h-[50px]  items-center' />
          <p className=' text-slate-400 group-hover:text-slate-600 text-lg '>{element.label}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default LeftSidebar;
