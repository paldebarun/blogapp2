import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageplaceholder from '../images/icons8-test-account-64.png';
import job from '../images/icons8-job-49.png'
import country from '../images/icons8-country-64.png'
import mail from '../images/icons8-mail-50.png'
import like from '../images/icons8-heart-100.png'
import { NavLink } from 'react-router-dom';
import edit from '../images/icons8-edit-30.png'

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
    <div className='flex flex-col h-auto items-start gap-[20px] p-7  '>

      <div className='image-username w-[280px] sm:w-[400px] lg:w-[500px] border h-auto flex flex-col items-center gap-[5px] sm:gap-[20px]  '>
        <img src={profile.imageurl ? profile.imageurl : imageplaceholder} className='w-[100px] h-[100px]  sm:w-[150px] sm:h-[150px] rounded-full object-cover' />


        <div className='flex flex-col  items-start'>
          <div className='flex justify-start gap-[10px] items-center'>

            <div className='w-auto  text-slate-600 text-sm sm:text-lg '>
              {
                profile.username ? profile.username : ""

              }

            </div>

            <NavLink to='/editbio' className='flex justify-center items-center hover:shadow-md hover:scale-105 duration-150 bg-slate-300 w-[60px] h-[30px] rounded-[10px]' >

              <p className='text-slate-500 text-sm font-mono'>Edit</p>

            </NavLink>

          </div>

          <div className='pseudonym  text-slate-400 text-sm sm:text-lg font-sheriff'>

            {
              profile.pseudonym ? profile.pseudonym : ""
            }

          </div>

        </div>


        <div className='bio-section  h-auto w-[200px]  mx-auto rounded-md  text-slate-500 flex flex-wrap justify-start'>
        {
          profile.bio ? profile.bio : ""
        }

      </div>
     <div className='flex justify-center gap-[10px] w-full'>
     
        
        <div className=' text-slate-500 w-auto  text-xs flex items-center justify-center '>
        job : 
          {
            profile.job ? (profile.job.length > 12 ? profile.job.slice(0, 12) : profile.job) : "job"
          }
        </div>
      

    
        <div className='border rounded-md hover:shadow-lg   text-slate-500 w-auto  flex items-center justify-center text-xs'>

        country :
          {
            profile.country ? profile.country : ""
          }
        </div>

      
      </div>



      </div>
      

      

      

      <div className='mail-section w-[80%] mx-auto flex gap-[10px] '>
        <img src={mail} className='w-[60px] h-[60px] rounded-full hover:-translate-y-1 hover:cursor-pointer' />
        <div className='border rounded-md hover:shadow-lg   break-words  text-slate-500 w-[200px] sm:w-[40%] h-auto flex items-center justify-center'>
          {
            profile.email ? (profile.email.length > 12 ? `${profile.email.slice(0, 12)}...` : (profile.email)) : "email"
          }
        </div>

      </div>

      <div className='likes flex items-center sm:mx-auto w-[200px] sm:w-[80%] mx-auto'>
        <img src={like} className='w-[50px] h-[50px] hover:-translate-y-1 hover:cursor-pointer' />
        <p className='w-auto '>{profile.likesCount.length}</p>
      </div>

      <div className='h-[100px]'></div>

      <NavLink to='/userblogs' className='border rounded-lg p-3 hover:scale-105 duration-150 hover:shadow-lg bg-gradient-to-r from-sky-300 to bg-sky-200 text-blue-700' >
        See your uploaded blogs
      </NavLink>





    </div>

  );
};

export default Profilesection;
