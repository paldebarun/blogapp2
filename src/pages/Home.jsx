import React, { useEffect, useState } from 'react'
import Heading from '../components/Heading';
import {BsFilterRight} from 'react-icons/bs'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import sessionlogintimer from '../images/blogexpitredimage.jpeg'
import ContentPage from '../components/ContentPage';
import {CiSearch} from 'react-icons/ci'
import {GrFormClose} from 'react-icons/gr'
import {GoHome} from 'react-icons/go'
import {IoIosLogOut} from 'react-icons/io'
import {IoIosLogIn} from 'react-icons/io'
import {BsPlusSquare} from 'react-icons/bs'
import {AiOutlineCaretDown} from 'react-icons/ai'
import {CgProfile} from "react-icons/cg";
import {GoHomeFill} from 'react-icons/go'
import {AiFillPlusSquare} from 'react-icons/ai'


const Home = () => {
  
  const [dark,setDark]=useState(false);
  const [isLoggedIn,setLogin]=useState(false);
  const [burgermenu,setmenu]=useState(true);
  const [isloading,setloading]=useState(false);
  const [openfilterbox,setfilterbox]=useState(false);
  const [searchbytag,setsearchbytag]=useState(false);
  const [searchbycategory,setsearchbycategory]=useState(false);
  const [searchbyauther,setsearchbyauther]=useState(false);
  const [blogs, setBlogs] = useState([]);
  const [imgurl,setimgulr]=useState('');

  const [tagsInput, setTagsInput] = useState({
    tags:""
  });

  const [categoryInput,setcategoryinput]=useState({
    category:""
  });

  const [authername,setauthername]=useState({
    authername:""
  })

  const [inhome,setinhome]=useState(false);
 
  const [increateblog,setincreateblog]=useState(false);



  const changetagsinputhandler = (event) => {
    
    const { name, value } = event.target;
    setTagsInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(tagsInput);
  };

  const changecategoryinputhandler = (event) => {
    
    const { name, value } = event.target;
    setcategoryinput((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(categoryInput);
  };


  const changeautherinputhandler = (event) => {
    
    const { name, value } = event.target;
    setauthername((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(authername);
  };


 
const setsidebar= ()=>{
  setmenu(!burgermenu);
}

const loginfunctionality=()=>{
  if(isLoggedIn){
  setLogin(false);
  localStorage.removeItem('token');

  }

  else{
    
    window.location.href='/login'
  }

}

const searchByTags = async () => {
  try {
    const tags =tagsInput.tags;
   
    const response = await axios.post(
      'https://blogserver3.onrender.com/api/v1/search',
      { tags:tags }
    );

    if (response.data.success) {
     
      console.log('Blogs fetched by tags:', response.data.blogs);


      setBlogs(response.data.blogs);

      console.log("this is the updated blog , ",blogs);
    } else {
      // Handle the error case
      console.error('Error fetching blogs by tags:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching blogs by tags:', error);
  }
};

const searchbycategoryfunction = async () => {
  try {
    const category =categoryInput.category;
   
    const response = await axios.post(
      'https://blogserver3.onrender.com/api/v1/searchbycategory',
      { category:category }
    );
    
    if (response.data.success) {
     
      console.log('Blogs fetched by tags:', response.data.blogs);


      setBlogs(response.data.blogs);

      console.log("this is the updated blog , ",blogs);
    } else {
      // Handle the error case
      console.error('Error fetching blogs by category:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
  }
};

const searchbycAutherfunction = async () => {
  try {
    const autherName =authername.authername;
   
    const response = await axios.post(
      'https://blogserver3.onrender.com/api/v1/fetchbyauthername',
      { auther:autherName }
    );
    
    if (response.data.success) {
     
      console.log('Blogs fetched by auther name:', response.data.blogs);


      setBlogs(response.data.blogs);

      console.log("this is the updated blog , ",blogs);
    } else {
      // Handle the error case
      console.error('Error fetching blogs by authername:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching blogs by authername:', error);
  }
};


const fetchallblogs = async () => {
  try {
    
   
    const response = await axios.get(
      'https://blogserver3.onrender.com/api/v1/fetchallblogs',
     
    );
    
    if (response.data.success) {
     
      console.log('All blogs are fetched:', response.data.blogs);


      setBlogs(response.data.blogs);

      console.log("this is the updated blog , ",blogs);
    } else {
      // Handle the error case
      console.error('Error fetching all blogs :', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching all blogs :', error);
  }
};


  useEffect(()=> {
     
    const fetchdata=async()=>{
      const token=localStorage.getItem('token');
     console.log("the login token : ",token);
    if (token) {
       
      const headers = {
        Authorization: `Bearer ${token}`, 
      };
      
      try {
        
        const response = await axios.get('https://blogserver3.onrender.com/api/v1/auth', { headers });
        console.log("this is auth response : ",response);
         
        if (response.data.success) {
          
          setLogin(true);

          const imgresponse=await axios.get(`https://blogserver3.onrender.com/api/v1/fetchprofile/${response.data.payload.email}`);

          console.log("this is img response ",imgresponse);

          setimgulr(imgresponse.data.profile.imageurl);
          console.log("this is img url : ",imgurl);
          // console.log("yes",response);
          // console.log("this is logged in status ", true);
          
           if(window.location.pathname==='/home'){setinhome(true)
          
          }

           

           else if(window.location.pathname==='/add')setincreateblog(true);

        }
        


      

      } 
      catch (error) {
        console.error('Error verifying token:', error);

      }
    }}

    fetchdata();
  }, []); 

  const brightness = () => {
    setDark(false);
  }

  const darkness = () => {
    setDark(true);
  }


  return (
   
    <div >
    {isLoggedIn?
    <div className='flex relative  flex-col overflow-y-hidden gap-[30px]  w-screen'>

    <div><Heading inhome={inhome} increateblog={increateblog} imgurl={imgurl}  dark={dark} setDark={setDark} isLoggedIn={isLoggedIn} setLogin={setLogin} /></div>

    <div className='absolute  top-[24px] lg:top-[-20px] sm:top-[10px] md:relative p-4   sm:px-[10px] items-center  h-auto flex sm:justify-center w-full '>


    {searchbytag && !searchbyauther && !searchbycategory && (

<div className=' absolute top-[45px] items-center justify-start sm:justify-center md:bg-white  sm:scale-100  w-full h-auto  flex gap-[5px]'> 
  
  <input type="text" placeholder='enter tags' onChange={changetagsinputhandler} name="tags" className="outline-none w-[120px] text-sm sm:text-base sm:w-[200px] border-b-2 px-1 sm:px-3"/>
   <CiSearch className='hover:cursor-pointer' onClick={searchByTags}/>
   <GrFormClose className='hover:cursor-pointer' onClick={()=>{setsearchbytag(!searchbytag)}}/>

</div>
) 

}

{!searchbytag && !searchbyauther && searchbycategory && (

<div className='absolute top-[45px] items-center justify-start sm:justify-center sm:scale-100  w-full h-auto md:bg-white flex gap-[5px]'> 

<input type="text" onChange={changecategoryinputhandler} placeholder='enter category' name="category" className='outline-none w-[120px] text-sm sm:text-base sm:w-[200px] border-b-2 px-1 sm:px-3'/>

<CiSearch className='hover:cursor-pointer' onClick={searchbycategoryfunction}/>

<GrFormClose className='hover:cursor-pointer' onClick={()=>{setsearchbycategory(!searchbycategory)}}/>

</div>
) 

}

{!searchbytag && searchbyauther && !searchbycategory && (

<div className=' absolute top-[45px] items-center justify-start sm:justify-center   sm:scale-100  w-full h-auto md:bg-white flex gap-[5px]'> 

<input type="text" onChange={changeautherinputhandler} name="authername" placeholder='enter authername' className='outline-none w-[120px] text-xs sm:text-base sm:w-[200px] border-b-2 px-1 sm:px-3'/>
<CiSearch onClick={searchbycAutherfunction}/>
<GrFormClose className='hover:cursor-pointer' onClick={()=>{setsearchbyauther(!searchbyauther)}}/>

</div>
) 

}

<BsFilterRight onClick={()=>{setfilterbox(!openfilterbox)}} className='w-[24px] h-[24px] sm:w-[35px] sm:h-[35px] absolute right-[5px] hover:cursor-pointer '/>
      {
        openfilterbox && (
          <div className='flex w-[120px] rounded-xl top-[-3px]  bg-white z-20 flex-col absolute gap-[10px] justify-center items-center sm:right-[5px] shadow-xl right-[2px] border sm:w-[190px] h-auto  p-5'> 
         <GrFormClose className='absolute right-[10px] top-[3px] hover:cursor-pointer' onClick={()=>{
          setfilterbox(!openfilterbox)
           
          if(searchbycategory){
            setsearchbycategory(false);
          } 
          if(searchbyauther){
            setsearchbyauther(false);
          }
          if(searchbytag){
            setsearchbytag(false);
          }

         }}/>
         <div onClick={()=>{
          setsearchbytag(!searchbytag)
          if(searchbyauther){
            setsearchbyauther(false);
          }
          if(searchbycategory){
            setsearchbycategory(false);
          }
          }} className='hover:bg-slate-300 hover:cursor-pointer hover:translate-x-2 rounded-lg p-2 duration-150'>tags</div>

         <div className='hover:bg-slate-300 hover:cursor-pointer hover:translate-x-2 rounded-lg p-2 duration-150' onClick={()=>{
          setsearchbycategory(!searchbycategory);


          if(searchbyauther){
            setsearchbyauther(false);
          }
          if(searchbytag){
            setsearchbytag(false);
          }
         
         
         }}>category</div>

         <div className='hover:bg-slate-300 hover:cursor-pointer hover:translate-x-2 rounded-lg p-2 duration-150' onClick={()=>{
          
          setsearchbyauther(!searchbyauther)
          
          if(searchbytag){
            setsearchbytag(false);
          }

          if(searchbycategory){
            setsearchbycategory(false);
          }
          
          }}>auther</div>

          <div className='hover:bg-slate-300 hover:cursor-pointer hover:translate-x-2 rounded-lg p-2 duration-150' onClick={()=>{
            fetchallblogs();
            if(searchbytag){
            setsearchbytag(false);
          }

          if(searchbycategory){
            setsearchbycategory(false);
          }

          if(searchbyauther){
            setsearchbyauther(false);
          }



          }}> All</div>

          <div className='md:hidden gap-[20px] lg:gap-[20px] flex flex-col justify-center items-center'>
          
          <NavLink to='/home' >
          {inhome ?
           <GoHomeFill className='sm:w-[28px] w-[20px] h-[20px] sm:h-[28px] lg:w-[33px] hover:cursor-pointer  lg:h-[33px] hover:scale-110 duration-150'  /> :<GoHome className='sm:w-[28px] w-[20px] h-[20px] sm:h-[28px] lg:w-[33px] hover:cursor-pointer  lg:h-[33px] hover:scale-110 duration-150' />}
          
          </NavLink>

          <NavLink to='/add'  >
          {increateblog ?<AiFillPlusSquare className='sm:w-[21px] sm:h-[21px] hover:cursor-pointer lg:w-[26px] lg:h-[26px] hover:scale-110 duration-150'/>  :<BsPlusSquare className='sm:w-[21px] sm:h-[21px] hover:cursor-pointer lg:w-[26px] lg:h-[26px] hover:scale-110 duration-150'/>}
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
          
        isLoggedIn? <IoIosLogOut onClick={loginfunctionality} className='hover:cursor-pointer w-[20px] h-[20px] sm:w-[27px] sm:h-[27px] lg:w-[32px] lg:h-[32px] hover:scale-110 duration-150 '  />: <IoIosLogIn onClick={loginfunctionality} className='hover:cursor-pointer sm:w-[27px] sm:h-[27px] lg:w-[32px] lg:h-[32px] hover:scale-110 duration-150'   /> 

          }
          </div>
          
          </div>
      </div>
        )
      }



    </div>
    

    
     <div className='filterbox '>
      
     </div>
     <div className='flex  justify-evenly overflow-x-hidden  w-screen h-screen overflow-y-scroll '>
       
      
      <ContentPage  blogs={blogs} setBlogs={setBlogs}/>
       

    

     </div>

  
    {/* <Footer /> */}
  
  </div>
  :
  <div className='w-screen h-screen flex  justify-center  items-center'>
      

        
        
       <div className=' card flex flex-col gap-[20px] w-auto h-auto py-7 px-10 justify-center rounded-tl-3xl rounded-tr-md rounded-br-3xl rounded-bl-md items-center shadow-2xl scale-75 sm:scale-100 '>
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
    
    }
  </div>
  )
}

export default Home;
