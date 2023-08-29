// LeftSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebarlinks from '../constants/Sidebarlinks';

const LeftSidebar = () => {
  return (
    <div className='h-screen flex flex-col w-[200px] sm:w-[300px] border gap-[30px] p-5'>
      {Sidebarlinks.map((element, index) => (
        <NavLink to={element.route} key={index} className="flex w-[100px] sm:w-[200px]  sm:gap-[10px] items-center group hover:bg-slate-200 hover:rounded-lg hover:p-2 duration-100 hover:shadow-lg">
          <img src={element.imageUrl} alt={element.label}  className=' w-[20px] h-[20px] sm:w-[50px] sm:h-[50px]  items-center' />
          <p className='text-slate-400 group-hover:text-slate-600 sm:text-md '>{element.label}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default LeftSidebar;
