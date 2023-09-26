import React, { useState, useEffect } from 'react';
import Profilesection from '../components/Profilesection';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import Heading from '../components/Heading'
import sessionlogintimer from '../images/blogexpitredimage.jpeg'
import {CgSpinner} from 'react-icons/cg'

const Dashboard = () => {
  const [dark, setDark] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);
  const [payload, setPayload] = useState({});
  const [isloading,setloading]=useState(false);
  const [imgurl,setimgulr]=useState('');

  useEffect(() => {

    const fetchData = async () => {
      const token = localStorage.getItem('token');
    
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        try {
          setloading(true);
          const response = await axios.get('https://blog-server-gbxk.onrender.com/api/v1/auth', { headers });
          setloading(false);
          if (response.data.success) {
            
            setLogin(true);
            setPayload( response.data.payload ); // Set payload on first render
            console.log("payload : ",payload);

            const imgresponse=await axios.get(`http://localhost:4000/api/v1/fetchprofile/${response.data.payload.email}`);

          console.log("this is img response ",imgresponse);

          setimgulr(imgresponse.data.profile.imageurl);
          console.log("this is img url : ",imgurl);
            
          }
        } catch (error) {
          setloading(true);
          console.error('Error verifying token:', error);
          // Error occurred, loading is complete
        }
      }
    };

    fetchData();
  }, []); 

  const brightness = () => {
    setDark(false);
  }

  const darkness = () => {
    setDark(true);
  }
  
  
 





  
  return (
   <div className='w-screen h-auto relative '>

   {isloading ? <div className='w-screen h-screen flex justify-center items-center '>

   <CgSpinner className='w-[50px] animate-spin h-[50px]' />

   </div> :
   <>
   {isLoggedIn?(
     <div className='flex flex-col gap-[30px]'>

          <Heading imgurl={imgurl} setDark={setDark} setLogin={setLogin} isLoggedIn={isLoggedIn}/>
          <Profilesection payload={payload}/>
           
           
     


   </div>
       
     ) :
     (<div className='w-screen flex h-screen justify-center flex-col gap-[30px] items-center'>
       

        
        
       <div className=' card flex flex-col gap-[20px] w-auto h-auto py-7 px-10 justify-center rounded-tl-3xl rounded-tr-md rounded-br-3xl rounded-bl-md items-center  shadow-2xl scale-75 sm:scale-100 '>
       <img src={sessionlogintimer} className='w-[200px] h-[200px] rounded-full  ' />

       <p className='text-slate-500 text-sm  sm:text-md font-mono'>Your Session Has Expired</p>

       <p className='text-slate-500  text-center  text-md font-mono'>Kindly Login to experience CU blog</p>

       
        <NavLink to='/login' >
        <button className='w-[100px] h-[50px] text-slate-200 bg-blue-900 rounded-3xl hover:shadow-cyan-850 hover:shadow-2xl hover:scale-110 duration-150'>
         
         Login

        </button>
        </NavLink>
        
         
       </div>

      
    </div>
 )

  }</>
   
   }
   

</div>
)
  }

export default Dashboard