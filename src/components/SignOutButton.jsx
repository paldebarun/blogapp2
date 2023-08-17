// SignOutButton.js
import React from 'react';
import signout from '../images/icons8-logout-30.png';

const SignOutButton = ({ onClick,dark }) => {
  return (
    <div className={dark?'flex flex-row items-center hover:cursor-pointer group hover:bg-slate-100 rounded-md':'flex flex-row items-center hover:cursor-pointer hover:bg-slate-100 rounded-md'} onClick={onClick}>
      <img src={signout} alt="logout" className={dark?'invert p-2 group-hover:invert-0':'invert-0 p-2'}></img>
      <p className={dark?'text-white hidden sm:block group-hover:text-black':'text-black hidden sm:block'}>Log out</p>
    </div>
  );
}

export default SignOutButton;
