import React, { useState } from 'react';
import Heading from '../components/Heading';
import Signupform from '../components/Signupform';
import Footer from '../components/Footer';
import logo from '../images/CUBlogs.png'
import { NavLink } from 'react-router-dom';
import bgimage from '../images/pencils-762555_640.jpg'

const SignupPage = () => {
  const [dark, setDark] = useState(false);
  const [isLoggedIn,setLogin]=useState(false);
  const backgroundStyles = {
    backgroundImage: `url(${bgimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
  };

  return (
    <div className="flex flex-col items-center">
     

      <div className='h-[70px]'></div>
      
      <div className='flex sm:scale-90 lg:scale-100  gap-[10px] rounded-3xl shadow-2xl shadow-slate-600  h-auto '>
      <div className='rounded-3xl hidden  md:text-sm lg:text-lg md:w-[400px] lg:w-[500px] font-mono text-black md:flex justify-center items-center opacity-70 ' style={backgroundStyles} >
      Blog On the Go, Wherever You Flow!

      

      </div>

      <div className='flex flex-col items-center'>
       <img src={logo} className=' w-[200px] h-auto  ' />
      

      <h1 className="font-mono text-md sm:text-3xl font-bold text-center text-slate-400">
        Join CU Blogs today
      </h1>
      <div className="h-[10px] sm:h-[20px]"></div>
      <Signupform dark={dark} />

      </div>
      </div>
     
      <div className='h-[70px]'></div>

    
    </div>
  );
};

export default SignupPage;
