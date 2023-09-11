import React, { useState } from 'react';
import visible from '../images/icons8-eye-24.png';
import invisible from '../images/icons8-invisible-24.png';
import countryNames from '../constants/countryNames';
import loginSymbol from '../images/icons8-right-arrow-30.png';



const Signupform = ({ dark }) => {

  

  const [form, formHandler] = useState({
    firstName: "",
    lastName: "",
    autherName: "",
    email: "",
    password: "",
    job: "",
    country: "",
  });

  

  const changeHandler = (event) => {
    const { name, value } = event.target;
    formHandler((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    console.log(form)
  };

  const submitform = async(event) => {
    event.preventDefault();
    localStorage.setItem('form', JSON.stringify(form));

    
    window.location.href = '/otp-generate';

  };

  const [isVisiblle, visibilityHandler] = useState(false);

  const handler = () => {
    visibilityHandler(!isVisiblle);
  };

  return (
    <div>
     
     <form
      onSubmit={submitform}
      className="flex flex-col scale-75  gap-5 w-[300px] px-4 sm:w-[400px] items-center m-auto"
    >
       <div className='flex flex-row gap-[15px] '>
        <input type="text" onChange={changeHandler} name="firstName" placeholder='Enter your first name' className='rounded-sm w-[150px] text-xs sm:w-[200px] h-[40px] border p-3'></input>
        <input type="text" onChange={changeHandler} name="lastName" placeholder='Enter your last name' className='rounded-sm w-[150px] text-xs sm:w-[200px] h-[40px] p-3 border'></input>
     </div>
     <input type="text" onChange={changeHandler} name="autherName" placeholder='Enter a pseudonym' className='rounded-sm text-xs w-[300px] sm:w-[400px] h-[40px] border p-3'></input>
     
     <input type="email" onChange={changeHandler} name="email" placeholder='Enter your email' className='rounded-sm text-xs w-[300px] sm:w-[400px] h-[40px] border p-3'></input>

    <div>
    <div className='flex flex-row items-center m-auto'>
          <input
            type={isVisiblle ? 'text' : 'password'}
            placeholder='Password'
            name="password"
            onChange={changeHandler}
            value={form.password}
            className='h-[50px] w-[200px] text-xs sm:w-[300px] border rounded-md box-border px-3' 
          />
          <div className='w-[20px]'></div>
          <img
            src={isVisiblle ? visible : invisible}
            alt='visibility icon'
            className={dark?'w-[20px] h-[20px] invert hover:cursor-pointer ':'w-[20px] h-[20px] hover:cursor-pointer '}
            onClick={handler}
          />
        </div>


       

    </div>

    <input type="text" onChange={changeHandler} name="job" value={form.job} placeholder='Enter your job description here' className='text-xs border h-[100px] w-[300px] sm:w-[400px] px-3 rounded-md'></input>

    <div className="flex flex-row gap-2 items-center w-full ">
        <label
          htmlFor="countries"
          className={`${
            dark ? 'text-white' : ''
          } whitespace-nowrap pr-2 flex-shrink-0 text-white`}
        >
          Choose your country:
        </label>
        <select
          id="countries"
          name="country"
          onChange={changeHandler}
          className="h-[40px] text-xs px-1 sm:px-3 rounded-md w-full border text-slate-400 hover:cursor-pointer"
        >
          <option value="">Select a country</option>
          {countryNames.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="flex flex-row gap-2 w-6/12 sm:w-[150px] m-auto h-[40px] items-center rounded-md text-white justify-center bg-gradient-to-r from-cyan-600 to-blue-500 hover:cursor-pointer hover:shadow-lg duration-700 hover:scale-105" >
        <div>Sign Up</div>
        <img
          src={loginSymbol}
          className="w-6 invert"
          alt="Sign Up icon"
        />
      </button>
    </form>

     

    </div>
  );
};

export default Signupform;
