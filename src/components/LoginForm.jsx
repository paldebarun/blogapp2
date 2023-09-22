import React, { useState } from 'react';
import visible from '../images/icons8-eye-24.png';
import invisible from '../images/icons8-invisible-24.png';

import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const LoginForm = ({ dark ,setLoading}) => {
  const [isVisible, setVisibility] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [passwordoesntmatch,setpassworddoesntmatch]=useState(false);
  const [userisnotregistered,setuserisnotregistered]=useState(false);


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

    let response;
  
    try {
      setLoading(true);
      response = await axios.post('http://localhost:4000/api/v1/login', form);
      
      
  
      if (response.status === 200) {
        localStorage.setItem('token', response.data.user.token);
        
        setTimeout(()=>{
          window.location.href = '/home';
        },1000)

        setLoading(false);
        
        
      } 
        
      
    } catch (error) {
      setLoading(false);


      console.log("response",error);
      if (error.message === "Request failed with status code 404") {

        setuserisnotregistered(true);
        setpassworddoesntmatch(false);
      } else if (error.message === "Request failed with status code 401") {
        setpassworddoesntmatch(true);
        setuserisnotregistered(false);
      } else if (error.message === "Request failed with status code 400") {
        // Handle other errors if needed
        window.location.href = '/errorlogin';
      }

      // Reset error messages and input fields after 2 seconds
      setTimeout(() => {
        setuserisnotregistered(false);
        setpassworddoesntmatch(false);
        setForm({ email: '', password: '' });
      }, 2000);
    }
  };
  
  

  const toggleVisibility = () => {
    setVisibility(!isVisible);
  };

  return (
    <div className='flex flex-col items-center scale-90 sm:scale-100'>



      <form
        onSubmit={submitForm}
        className={`flex flex-col items-center gap-[30px] w-[150px] sm:w-[400px] m-auto h-auto p-4 rounded-lg ${
          dark ? '' : ''
        }`}
      >
        <input
          type="email"
          placeholder=" email"
          name="email"
          onChange={changeHandler}
          value={form.email}
          className="h-[70px] w-[300px] outline-none  font-mono border rounded-md hover:shadow-xl px-3  "
        />

        {passwordoesntmatch ? <div className='text-red'>password doesn't match *</div> : <div className='hidden'></div>
          
        }

        <div className="flex flex-row w-[300px] items-center border hover:shadow-xl rounded-md box-border px-3 ">
          <input 
            type={isVisible ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            onChange={changeHandler}
            value={form.password}
            className="h-[70px] w-[150px] sm:w-[300px] outline-none    mx-auto "
          />
          <div className="w-[20px]"></div>
          <img
            src={isVisible ? visible : invisible}
            alt="visibility icon"
            className="w-[20px] h-[20px] hover:cursor-pointer "
            onClick={toggleVisibility}
          />
        </div>
        {
          userisnotregistered ? <div className='text-red'>user is not registered *</div> :<div className='hidden'></div>
        }

        
        <button
          type="submit"
          className="bg-slate-600 w-[100px] hover:scale-105 duration-150 hover:shadow-xl h-[50px] text-white text-xl font-mono rounded-xl"
        >
          <div>Login</div>
         
        </button>
      </form>

      
    </div>
  );
};

export default LoginForm;
