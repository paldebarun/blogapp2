import React, { useState } from 'react';
import Heading from '../components/Heading';
import Signupform from '../components/Signupform';
import Footer from '../components/Footer';
import logo from '../images/CUBlogs.png'
import { NavLink } from 'react-router-dom';

const SignupPage = () => {
  const [dark, setDark] = useState(false);
  const [isLoggedIn,setLogin]=useState(false);

  return (
    <div className="flex flex-col items-center">
      <Heading dark={dark} setDark={setDark} setLogin={setLogin} isLoggedIn={isLoggedIn} />

      <div className='h-[50px]'></div>
      
      <div className='flex flex-col items-center'>
      <NavLink to='/home'> <img src={logo} className=' animate-spin w-[200px] h-auto hover:shadow-xl rounded-full' /> </NavLink>
      

      <h1 className=" text-md sm:text-3xl font-bold text-center text-slate-400">
        Create an account to CU Blogs
      </h1>
      <div className="h-[10px] sm:h-[20px]"></div>
      <Signupform dark={dark} />

      </div>

      <div className='w-full h-[30px]'></div>
      <Footer />
    </div>
  );
};

export default SignupPage;
