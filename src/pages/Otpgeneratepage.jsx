import React from 'react'
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-home-48.png'
import { useState,useEffect } from 'react';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import otp_image from '../images/icons8-otp-96.png'
import axios from 'axios'
import Spinner from '../components/Spinner';

const Otpgeneratepage = () => {
    const [isloading,setloading]=useState(false);
    const [dark,setDark]=useState(false);
    const [mail,setemail]=useState({});
    const [form, setForm] = useState({});

    const brightness = () => {
      setDark(false);
    }
  
    const darkness = () => {
      setDark(true);
    }

    useEffect(() => {
        setForm(form);
        const storedFormData = localStorage.getItem('form');
        if (storedFormData) {
          // Parse the stored data (assuming it's JSON)
          const parsedFormData = JSON.parse(storedFormData);
         setemail(
            {
                email:parsedFormData.email}
                
                );
         console.log(mail);
        }
      }, []);

    const optgenerator=async ()=>{
     
        try{

          setloading(true);
         
           const response=await axios.post('http://localhost:4000/api/v1/sendOtp',mail);
           console.log("response : ",response);

           setloading(false);

           window.location.href='/otp-page'



        }
        catch(error){
            
            console.log("there was some error ",error);
            
        }


    }

  return (

   <div>
   {
    isloading ? 
    <div className='bg-white h-screen w-screen flex justify-center items-center'>

    <Spinner />

     

    </div>
    :
    <div className='w-screen h-auto flex items-center justify-between flex-col gap-[300px]'>

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
    <div className='flex flex-col gap-[40px]'>
   <img src={otp_image} className='sm:w-[250px] sm:h-[250px]' />

    <button onClick={optgenerator} className='bg-sky-400 p-3 text-2xl rounded-lg text-slate-100 shadow-2xl'  > Send Otp</button>
      </div>


    
   
     <Footer />

    </div>}
    </div>
  )
}


export default Otpgeneratepage;