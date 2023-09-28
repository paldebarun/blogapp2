import React, { useState,useEffect } from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import sessionlogintimer from '../images/../images/5228679.jpg'
import Footer from '../components/Footer';
import Heading from '../components/Heading'
import Createblogcontent from '../components/Createblogcontent';
import loading from '../images/loading.png'
import {BsFilterRight} from 'react-icons/bs'
import { GrFormClose } from 'react-icons/gr'
import { GoHome } from 'react-icons/go';
import { BsPlusSquare } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineCaretDown } from 'react-icons/ai';
import {IoIosLogOut} from 'react-icons/io'
import {IoIosLogIn} from 'react-icons/io'

const CreateBlog = () => {
const [isloading,setloading]=useState(false);
const [isLoggedIn,setLogin]=useState(false);
const [dark,setDark]=useState(false);
const [payload, setPayload] = useState({});
const [inhome,setinhome]=useState(false);
const [imgurl,setimgulr]=useState('');
const [increateblog,setincreateblog]=useState(false);
const [openfilterbox,setfilterbox]=useState(false);


const loginfunctionality=()=>{
  if(isLoggedIn){
  setLogin(false);
  localStorage.removeItem('token');

  }

  else{
    
    window.location.href='/login'
  }

}

useEffect(() => {

    const fetchData = async () => {
      const token = localStorage.getItem('token');
    
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        try {
          setloading(true);
          const response = await axios.get('https://blogserver3.onrender.com/api/v1/auth', { headers });
         
          if (response.data.success) {
            
            setLogin(true);
            setPayload( response.data.payload ); // Set payload on first render
            if(window.location.pathname==='/home'){setinhome(true)
          
            }
  
             
  
             else if(window.location.pathname==='/add')setincreateblog(true);
            

             const imgresponse=await axios.get(`https://blogserver3.onrender.com/api/v1/fetchprofile/${response.data.payload.email}`);

          console.log("this is img response ",imgresponse);

          setimgulr(imgresponse.data.profile.imageurl);
          console.log("this is img url : ",imgurl);
          }

          setloading(false);
        } catch (error) {
          
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

   
   <div>
   {isLoggedIn?(

     isloading ? (
      <div className='w-screen h-screen flex justify-center items-center flex-col'>
                <img src={loading} className=' w-[100px] h-[100px] animate-spin' />
                <div className='font-bold text-slate-400 font-mono text-center'> Loading please wait ... </div>
              </div>

     ):(
      <div className='flex relative flex-col gap-[30px]'>
         
      <div className='md:hidden '>
<BsFilterRight onClick={()=>{setfilterbox(!openfilterbox)}} className='w-[24px] h-[24px] sm:w-[35px] sm:h-[35px] absolute right-[5px] hover:cursor-pointer '/>
      {
        openfilterbox && (
          <div className='flex w-[120px] rounded-xl top-[-3px]  bg-white z-20 flex-col absolute gap-[10px] justify-center items-center sm:right-[5px] shadow-xl right-[2px] border sm:w-[190px] h-auto  p-5'> 
         <GrFormClose className='absolute right-[10px] top-[3px] hover:cursor-pointer' onClick={()=>{
        
        setfilterbox(!openfilterbox)
          

         }}/>
         

          <div className='md:hidden gap-[20px] lg:gap-[20px] flex flex-col justify-center items-center'>
          
          <NavLink to='/home' >
          <GoHome className='sm:w-[28px] w-[20px] h-[20px] sm:h-[28px] lg:w-[33px] hover:cursor-pointer  lg:h-[33px] hover:scale-110 duration-150' />
          </NavLink>

          <NavLink to='/add'  >
          <BsPlusSquare className='sm:w-[21px] sm:h-[21px] hover:cursor-pointer lg:w-[26px] lg:h-[26px] hover:scale-110 duration-150'/>
          </NavLink>
          
          <NavLink to='/dashboard' className='flex group flex-col justify-center items-center' >
          {imgurl ?
            <img src={imgurl} className='sm:w-[25px] w-[20px] h-[20px] sm:h-[25px] rounded-full lg:w-[30px] lg:h-[30px] hover:scale-110 duration-150'/>
            :
          <CgProfile className='sm:w-[25px] w-[25px] h-[20px] sm:h-[20px] lg:w-[30px] lg:h-[30px] hover:scale-110 duration-150'/>}

          <AiOutlineCaretDown className='hidden group-hover:inline opacity-25 w-[20px] transition-all duration-200'  />
          
          </NavLink>

          <div className='flex gap-[20px]'>
          {
          
        isLoggedIn? <IoIosLogOut onClick={loginfunctionality} className='hover:cursor-pointer w-[20px] h-[20px] sm:w-[27px] sm:h-[27px] lg:w-[32px] lg:h-[32px] hover:scale-110 duration-150 '  />: <IoIosLogIn onClick={loginfunctionality} className='hover:cursor-pointer w-[20px] h-[20px] sm:w-[27px] sm:h-[27px] lg:w-[32px] lg:h-[32px] hover:scale-110 duration-150'   /> 

          }
          </div>
          
          </div>
      </div>
        )
      }
      </div>
          <Heading imgurl={imgurl} increateblog={increateblog} setDark={setDark} setLogin={setLogin} isLoggedIn={isLoggedIn}/>
           
           <Createblogcontent payload={payload} isLoggedIn={isLoggedIn} setLogin={setLogin} />
           
           <Footer/>
     


   </div>
     )
       
     ) :
     (<div className='w-full flex flex-col gap-[30px] items-center'>
       

        
        
       <div className=' card flex flex-col gap-[20px] w-auto h-auto py-7 px-10 justify-center rounded-tl-3xl rounded-tr-md rounded-br-3xl rounded-bl-md items-center  '>
       <img src={sessionlogintimer} className='w-[300px] h-[300px] rounded-full  ' />

       <p className='text-slate-200 text-sm  sm:text-md font-mono'>Your Session Has Expired</p>

       <p className='text-slate-200  text-center  text-md font-mono'>Kindly Login to experience CU blog</p>

       
        <NavLink to='/login' >
        <button className='w-[100px] h-[50px] text-slate-200 bg-blue-900 rounded-3xl hover:shadow-cyan-850 hover:shadow-2xl hover:scale-110 duration-150'>
         
         Login

        </button>
        </NavLink>
        
         
       </div>

       <Footer />
    </div>
 )

  }</div>
   
   
   

</div>
  )
}


export  default CreateBlog;
