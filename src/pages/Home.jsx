import React, { useEffect, useState } from 'react'
import Heading from '../components/Heading';
import LeftSidebar from '../components/LeftSidebar'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-home-48.png'
import sessionlogintimer from '../images/../images/5228679.jpg'
import Footer from '../components/Footer';
import ContentPage from '../components/ContentPage';
import menu from '../images/burger-menu.png'
import filtericon from '../images/icons8-filter-64.png'

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

  const [tagsInput, setTagsInput] = useState({
    tags:""
  });

  const [categoryInput,setcategoryinput]=useState({
    category:""
  });

  const [authername,setauthername]=useState({
    authername:""
  })


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

const searchByTags = async () => {
  try {
    const tags =tagsInput.tags;
   
    const response = await axios.post(
      'http://localhost:4000/api/v1/search',
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
      'http://localhost:4000/api/v1/searchbycategory',
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
      'http://localhost:4000/api/v1/fetchbyauthername',
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
      'https://blog-server-gbxk.onrender.com/api/v1/fetchallblogs',
     
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
        
        const response = await axios.get('http://localhost:4000/api/v1/auth', { headers });
        // console.log("this is login response : ",response);
         
        if (response.data.success) {
          
          setLogin(true);
          // console.log("yes",response);
          // console.log("this is logged in status ", true);
          
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
    
     {searchbytag && !searchbyauther && !searchbycategory && (

      <div className='absolute top-[200px] right-[50vw]  w-[500px] h-[30px] flex gap-[5px]'> 
        <div className='hover:cursor-pointer' onClick={()=>{setsearchbytag(!searchbytag)}}>X</div>
        <input type="text" onChange={changetagsinputhandler} name="tags" className='border'/>
        <button onClick={searchByTags}>Search by tags</button>

      </div>
     ) 

     }

     {!searchbytag && !searchbyauther && searchbycategory && (

<div className='absolute top-[200px] right-[50vw]  w-[500px] h-[30px] flex gap-[5px]'> 
  <div className='hover:cursor-pointer' onClick={()=>{setsearchbycategory(!searchbycategory)}}>X</div>
  <input type="text" onChange={changecategoryinputhandler} placeholder='enter any one category' name="category" className='border'/>
  <button onClick={searchbycategoryfunction}>Search by category</button>

</div>
) 

}

{!searchbytag && searchbyauther && !searchbycategory && (

<div className='absolute top-[200px] right-[50vw]  w-[500px] h-[30px] flex gap-[5px]'> 
  <div className='hover:cursor-pointer' onClick={()=>{setsearchbyauther(!searchbyauther)}}>X</div>
  <input type="text" onChange={changeautherinputhandler} name="authername" className='border'/>
  <button onClick={searchbycAutherfunction}>Search by auther</button>

</div>
) 

}




    <div><Heading dark={dark} setDark={setDark} isLoggedIn={isLoggedIn} setLogin={setLogin} /></div>
     <div className='filterbox relative'>
      <img src={filtericon} onClick={()=>{setfilterbox(!openfilterbox)}} className='w-auto absolute h-auto right-[5px] hover:cursor-pointer '/>
      {
        openfilterbox && (
          <div className='flex flex-col absolute gap-[10px] justify-center items-center right-[5px] border w-[200px] h-[200px] bg-white p-4'> 
         <div className='absolute right-[8px] top-[2px] hover:cursor-pointer' onClick={()=>{
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

         }}>X</div>
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

          <div className='hover:bg-slate-300 hover:cursor-pointer hover:translate-x-2 rounded-lg p-2 duration-150' onClick={fetchallblogs}> All</div>
      </div>
        )
      }
     </div>
     <div className='flex  justify-evenly overflow-x-hidden  w-screen h-screen overflow-y-scroll '>
       

       

       {
        burgermenu ? <img src={menu} onClick={setsidebar} className='   hover:cursor-pointer w-[50px] h-[50px] absolute left-[20px]'  />:<LeftSidebar setmenu={setmenu} /> 
       }
      
      <ContentPage burgermenu={burgermenu} blogs={blogs} setBlogs={setBlogs}/>
       

    

     </div>

  
    <Footer />
  
  </div>
  :
  <div className='w-full flex flex-col gap-[30px] items-center'>
      

        <div className='heading h-[100px] w-full flex justify-between  md:h-[120px] relative bg-gradient-to-r from-cyan-500 to-blue-500 px-4  items-center shadow-lg'>
    {
      dark ? (
        <div className='flex justify-between w-full'>
          <NavLink to='/home' ><img className=' hover:cursor-pointer w-[24px] h-[24px] sm:w-[50px] sm:h-[50px] hover:scale-110 duration-150' src={home} /></NavLink>

          
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
        
       <div className=' card flex flex-col gap-[20px] w-auto h-auto py-7 px-10 justify-center rounded-tl-3xl rounded-tr-md rounded-br-3xl rounded-bl-md items-center bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl scale-75 sm:scale-100 '>
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
    </div>}
  </div>
  )
}

export default Home;
