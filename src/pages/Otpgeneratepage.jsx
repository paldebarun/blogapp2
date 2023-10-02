import React from 'react'
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-homepage-48.png'
import { useState,useEffect } from 'react';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import otp_image from '../images/icons8-mail-64.png'
import axios from 'axios'
import Spinner from '../components/Spinner';

const Otpgeneratepage = () => {
    const [isloading,setloading]=useState(false);
    
    const [mail,setemail]=useState({});
    const [form, setForm] = useState({});
    const [emailvalue,setemailvalue]=useState('');
    


    useEffect(() => {
       const fetchdata=()=>{
        setForm(form);
        const storedFormData = localStorage.getItem('form');
        if (storedFormData) {
          
          const parsedFormData = JSON.parse(storedFormData);
         setemail(
            {
                email:parsedFormData.email}
                
                );
         console.log(mail);
         setemailvalue(parsedFormData.email);
         console.log("the email value is ",emailvalue);

        }

       }

       fetchdata();
      }, []);

    const optgenerator=async ()=>{
     
        try{

          setloading(true);
         
           const response=await axios.post('https://blogserver3.onrender.com/api/v1/sendOtp',mail);
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
    <div className='w-screen h-screen flex items-center justify-center flex-col gap-[30px]'>

 
    
   <img src={otp_image} className='sm:w-[100px] sm:h-[100px]' />
   <div className='w-auto h-[70px] border flex justify-center items-center bg-slate-300 rounded-lg px-3 text-slate-500' >{emailvalue}</div>
    <button onClick={optgenerator} className='bg-slate-400 hover:shadow-2xl hover:scale-90 transition-all duration-200 p-3 text-lg rounded-lg text-slate-100 shadow-2xl font-mono'  > Send Otp</button>
      </div>


    
   
   

    }
    </div>
  )
}


export default Otpgeneratepage;