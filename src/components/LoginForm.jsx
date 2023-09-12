import React, { useState } from 'react';
import visible from '../images/icons8-eye-24.png';
import invisible from '../images/icons8-invisible-24.png';
import loginSymbol from '../images/icons8-right-arrow-30.png';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const LoginForm = ({ dark }) => {
  const [isVisible, setVisibility] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(form);
  };

  const submitForm = async (event) => {
    event.preventDefault();
   
    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', form);
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.user.token);
        // toast.success('Login successful!', {
        //   duration: 2000,
          
        // });
       
        window.location.href = '/home';
        toast.success("Logged in succesfully")
      } else {
        toast.error('Login failed. Please try again.', {
          duration: 2000,
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error in logging in', error);
      // toast.error('An error occurred while logging in. Please try again later.', {
      //   duration: 2000,
      //   position: 'top-right',
      // });

      window.location.href='/errorlogin'
    }
  };

  const toggleVisibility = () => {
    setVisibility(!isVisible);
  };

  return (
    <div className='flex flex-col items-center scale-90 sm:scale-100'>
      <form
        onSubmit={submitForm}
        className={`flex flex-col gap-[50px] w-[250px] sm:w-[400px] m-auto h-auto p-4 rounded-lg ${
          dark ? '' : ''
        }`}
      >
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={changeHandler}
          value={form.email}
          className="h-[50px] border rounded-md hover:shadow-xl px-3 text-center "
        />

        <div className="flex flex-row items-center ">
          <input 
            type={isVisible ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            onChange={changeHandler}
            value={form.password}
            className="h-[50px] w-[150px] sm:w-[300px] hover:shadow-xl text-center  mx-auto border rounded-md box-border px-3"
          />
          <div className="w-[20px]"></div>
          <img
            src={isVisible ? visible : invisible}
            alt="visibility icon"
            className="w-[20px] h-[20px] hover:cursor-pointer "
            onClick={toggleVisibility}
          />
        </div>

        <button
          type="submit"
          className="flex flex-row gap-2 sm:gap-5 w-6/12 m-auto h-[40px] items-center rounded-md text-white justify-center bg-gradient-to-r from-cyan-600 to-blue-500 hover:cursor-pointer hover:scale-105 hover:shadow-lg duration-700"
        >
          <div>Login</div>
          <img src={loginSymbol} className="w-6 invert" alt="Login icon" />
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
