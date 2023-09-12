import React from 'react'
import { NavLink } from 'react-router-dom';
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-home-48.png'
import { useState,useEffect } from 'react';
import otplock from '../images/icons8-lock-64.png'
import Footer from '../components/Footer';
import loginSymbol from '../images/icons8-right-arrow-30.png';
import axios from 'axios'
import Spinner from '../components/Spinner';


 const Otpage = () => {
  const [isloading,setloading]=useState(false); 
  const [form, setForm] = useState({});
  const [otpformbody, setOtpForm] = useState({
    email: '', 
    otp: '',
  });
  const [timer, setTimer] = useState(60);
  
  useEffect(() => {
    
    const storedFormData = localStorage.getItem('form');
    if (storedFormData) {
      // Parse the stored data (assuming it's JSON)
      const parsedFormData = JSON.parse(storedFormData);

      setForm(parsedFormData);
      console.log("form : ",form );

      setOtpForm((prev) => ({
        ...prev,
        email: parsedFormData.email, // Set the email from parsed data
      }));

  
    }
  }, []);


  useEffect(() => {
   
    if (timer <= 0) {
      // Timer has reached 0, you can trigger actions here
      console.log('Timer expired');
      window.location.href='/otp-expired';
    } else {
      // Set a timeout to decrement the timer every second
      const timerId = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      // Clear the timeout when the component unmounts or when the timer reaches 0
      return () => clearTimeout(timerId);
    }
  }, [timer]);

    


    
    const changeHandler = (event) => {
      const { name, value } = event.target;
      setOtpForm((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log(otpformbody);
    };

    const submitotpform = async(event) => {
    
      event.preventDefault();

      try{
        
        setloading(true);
        const otpresponse=await axios.post('https://blog-server-gbxk.onrender.com/api/v1/checkotp',otpformbody);
        console.log("otp response : ",otpresponse);
        setloading(false);

        if(otpresponse.data.success){
            setloading(true);
          const response = await axios.post('https://blog-server-gbxk.onrender.com/api/v1/signup', form);
          setloading(false);
  
      if (response.status === 200) {
        console.log('Signup successful');
        localStorage.setItem("email",form.email);
        localStorage.removeItem('form');
        window.location.href = '/success';

     
      } 
      else if(response.status===409){
        localStorage.removeItem('form');
        console.log("conflict");
        window.location.href='/login'
        
      }
      else {
        localStorage.removeItem('form');
        console.log('Signup failed');
        window.location.href='/unsuccessful_signup'
       
      }
     
        }

       else{
        
        window.location.href='/otp-expired';

       }
        

      }
      catch(error){
       
       window.location.href='/unsuccessful_signup' 

        console.log("there was an error ",error);
      }





      
    

    }

    const [dark,setDark]=useState(false);
  
    const brightness = () => {
      setDark(false);
    }
  
    const darkness = () => {
      setDark(true);
    }




  return (
    <div className='w-screen h-auto flex flex-col gap-[200px] '>
    { isloading ?
      <div className='bg-white h-screen w-screen flex justify-center items-center'>

    <Spinner />

     

    </div>
     :
     <div>
     <div className='heading h-[100px] w-full flex justify-between  md:h-[120px] relative bg-gradient-to-r from-cyan-500 to-blue-500 px-4  items-center shadow-lg'>
    {
      dark ? (
        <div className='flex justify-between w-full'>
          <NavLink to='/home' ><img className='  hover:cursor-pointer w-[24px] h-[24px] sm:w-[50px] sm:h-[50px] hover:scale-110 duration-150' src={home} /></NavLink>

          
          <img src={sun} className=" w-[24px] h-[24px] sm:w-[50px] sm:h-[50px]  hover:cursor-pointer hover:scale-110 duration-150" onClick={brightness} />
          
          
          
          
          </div>

      ) : (
        <div className='flex justify-between w-full'>
          <NavLink to='/home' ><img className=' hover:cursor-pointer w-[24px] h-[24px] sm:w-[50px] sm:h-[50px] hover:scale-110 duration-150' src={home} /></NavLink>

         
          <img src={moon} className=" w-[24px] h-[24px] sm:w-[50px] sm:h-[50px]  hover:cursor-pointer hover:scale-110 duration-150" onClick={darkness} />
          
         
          
          </div>
      )

    }
        </div>

        <div className='w-full h-[400px] flex flex-col gap-[20px] justify-center items-center'>

        <img src={otplock} className='w-[150px] h-[150px] ' />
        <div className='font-bold text-3xl'>Verification</div>
        <div className='timer'>
          <p className='text-slate-400'>{timer} seconds</p>
        </div>
        <div className='w-full flex flex-col  items-center justify-center gap-[20px]'>
         
        <input  type="text" name="otp" onChange={changeHandler} maxLength='6' value={otpformbody.otp} className='border p-3 rounded-lg mx-auto  sm:w-[500px] text-center shadow-xl ' placeholder='enter otp'/>

        <button
         onClick={submitotpform} 
        className="flex flex-row gap-2 w-6/12 sm:w-[150px] m-auto h-[40px] items-center rounded-md text-white justify-center bg-gradient-to-r from-cyan-600 to-blue-500 hover:cursor-pointer hover:shadow-lg duration-700 hover:scale-105" >
        <div>Submit otp</div>
        <img
          src={loginSymbol}
          className="w-6 invert"
          alt="Sign Up icon"
        />
      </button>

        </div>


        </div>


        
        

        

        <Footer />

</div>

    }




    </div>
  )
}

export  default Otpage; 
