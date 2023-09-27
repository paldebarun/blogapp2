import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageplaceholder from '../images/icons8-test-account-64.png';

import { NavLink } from 'react-router-dom';
import { GrFormClose, GrSend } from 'react-icons/gr'

const Profilesection = ({ payload }) => {
  const [profile, setProfile] = useState({
    _id: "",
    imageUrl: "",
    username: "",
    pseudonym: "",
    job: "",
    country: "",
    email: "",
    likesCount: [],
    bio: ""
  });

  const [emailboxopen,setemailbox]=useState(false);

  const emailboxhandler=()=>{
    
    setemailbox(!emailboxopen);

  }



  useEffect(() => {
    const fetchData = async () => {
      if (payload) {
        try {
          console.log("this is payload", payload);
          console.log("profile section initiated");
          const url = `https://blog-server-gbxk.onrender.com/api/v1/fetchprofile/${payload.email}`;
          const response = await axios.get(url);
          console.log("this is response : ", response);
          const fetchedprofile = response.data.profile;
          console.log("this is profile ", fetchedprofile);


          setProfile(fetchedprofile);
          console.log("this is new profile : ", profile);
          console.log("image url : ", profile.imageurl);

        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className='flex flex-col h-auto items-start gap-[10px]   '>

      <div className='image-username w-screen  h-auto gap-[10px] flex-col sm:flex-row  sm:gap-[100px] flex items-start px-[20px] sm:px-[100px] justify-start   '>


        <img src={profile.imageurl ? profile.imageurl : imageplaceholder} className='w-[120px] md:w-[150px] md:h-[150px] h-[120px]  lg:w-[200px] lg:h-[200px] rounded-full object-cover' />


       


        

     <div className='flex flex-col sm:scale-100 scale-90 items-start md:justify-center gap-[10px]  relative h-auto w-[200px]'>
       
     <div className='flex flex-col  items-start'>
          <div className='flex w-[200px] justify-start gap-[10px] items-center'>

            <div className='w-auto  text-slate-600 text-sm sm:text-lg '>
              {
                profile.username ? profile.username : ""

              }

            </div>

            <NavLink to='/editbio' className='flex justify-center items-center hover:shadow-md hover:scale-105 duration-150 bg-slate-300 sm:scale-100 scale-90 w-[60px] h-[30px] rounded-[10px]' >

              <p className='text-slate-500 text-sm font-mono'>Edit</p>

            </NavLink>

          </div>

          <div className='pseudonym  text-slate-400 text-sm sm:text-lg font-sheriff'>

            {
              profile.pseudonym ? profile.pseudonym : ""
            }

          </div>

        </div>

        <div className='bio-section  h-auto w-[200px]  mx-auto   text-slate-500 flex flex-wrap justify-start'>
        {
          profile.bio ? profile.bio : ""
        }

      </div>
        
        <div className=' text-slate-500 w-auto  text-xs lg:text-sm flex items-center justify-center '>
        job : 
          {
            profile.job ? (profile.job.length > 12 ? profile.job.slice(0, 12) : profile.job) : "job"
          }
        </div>
      

    
        <div className='    lg:text-sm   text-slate-500 w-auto  flex items-center justify-center text-xs'>

        country :
          {
            profile.country ? profile.country : ""
          }
        </div>
        
       
        
        <div className={profile.email.length>12 ?'hover:cursor-pointer lg:text-sm   text-slate-500 w-auto  flex items-center justify-center text-xs':'lg:text-sm   text-slate-500 w-auto  flex items-center justify-center text-xs'} onClick={profile.email.length>12 ? emailboxhandler : ()=>{}}>
        email :
          {
            profile.email ?  (profile.email.length > 12 ? `${profile.email.slice(0, 12)}...` : (profile.email)) : "email"
          }
        </div>
       
       
<div className={emailboxopen ?'absolute text-sm bottom-[-20px] bg-slate-400 animate-bounce p-2 rounded-lg text-white':'hidden'}>
        <div className='w-full flex justify-end'>
        <GrFormClose onClick={emailboxhandler}  className='hover:cursor-pointer w-auto invert '/>
        </div>
        
        
        {
          profile.email ? (profile.email.length >12 ? (profile.email):"") : <div></div>
        }
       </div>

      
      
      </div>

      

      </div>
      

      



      <div className='h-[100px]'></div>

      <NavLink to='/userblogs' className='border rounded-lg p-3 hover:scale-105 duration-150 hover:shadow-lg bg-gradient-to-r from-sky-300 to bg-sky-200 text-blue-700' >
        See your uploaded blogs
      </NavLink>





    </div>

  );
};

export default Profilesection;
