import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'
import blogicon from '../images/blog.png'

import nodatafoundimage from '../images/9214777.jpg'
import loading from '../images/loading.png'

const ContentPage = ({burgermenu}) => {

  const [dark, setDark] = useState(false);
  const [blogs,setblogs]=useState([]);
  const [isloading,setLoading]=useState(false);

  useEffect(() => {
  
    const fetchData= async ()=>{
     
      const token=localStorage.getItem('token');
  
      console.log("token : ",token);
  
      if (token) {
  
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/v1/auth', { headers });
       console.log("response : ",response);
        if(response.data.success){

          console.log("this is it");
          
        }

        setLoading(false);
       
        const payload = response.data.payload;
        console.log("payload : ",payload);
         
        setLoading(true);
        const url = `http://localhost:4000/api/v1/fetchallblogs`;
        const response_second = await axios.get(url);
  
       
        setLoading(false);
        setblogs(response_second.data.blogs);
  
       console.log("blogs : ",blogs);
      
  
  
  
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
    
      
      <div className={burgermenu? 'flex flex-col  gap-[60px] w-full  duration-150':'flex flex-col gap-[60px] w-full mr-[40px] opacity-30 duration-150'} >
           
           {blogs.length>0 ? ( 
            isloading? (
              <div className='w-full h-full flex justify-center items-center flex-col'>
                <img src={loading} className=' w-[50px] h-[50px] animate-spin' />
                <div className='font-bold text-slate-400 font-mono text-center'> Loading please wait ... </div>
              </div>
            ):(<div className='flex flex-col w-full  gap-[10px]   md:gap-[20px]'>
           <img src={blogicon} className='sm:w-[100px] w-[70px] h-[70px] sm:h-[100px] mx-auto animate-pulse' />
         {blogs.map((blog) => (
            <div className='p-7 sm:scale-90 lg:scale-100 shadow-xl border rounded-lg h-auto flex flex-col items-start gap-[20px]   w-[50%] break-words mx-auto text-2xl' key={blog._id} >
              <h3 className='font-bold text-blue-900 text-sm sm:text-md'>{blog.heading}</h3>
              <div className=' flex flex-col md:flex-row gap-[10px]'>
              <div className='text-red-700 font-mono text-sm sm:text-md'>Author:</div> 
              <div className='text-md text-slate-500 text-sm sm:text-md'>{blog.auther}</div>
              
              
              </div>
              <div className='flex w-full flex-col gap-[10px] sm:flex-row  '>
                <div className='text-red-700 font-mono text-sm sm:text-md'> Content </div>
                <textarea className='border lg:w-[1200px] sm:w-[700px] text-center h-[200px] rounded-lg text-sm sm:text-md text-slate-500'>{blog.content}</textarea>
              </div>
              <div className='flex flex-col md:flex-row gap-[10px]'>
              <div className='text-red-700 text-xs sm:text-md'>Category : </div>
              <div className='text-slate-500 text-sm sm:text-md'> {blog.category}</div>

              </div>
              
              <div className='flex flex-col md:flex-row gap-[10px]'>

              <div className='text-red-700 text-sm sm:text-md'>Date : </div>

              <div className='text-slate-500 text-sm sm:text-md'> {new Date(blog.date).toLocaleDateString()}</div>

              </div>

              <div className="tags  flex-wrap  sm:w-[200px] wrap flex-row gap-[2px]  ">
                {blog.tags.map((tag, index) => (
                  <div className='flex gap-[5px] w-full items-center'>
                   <span className='text-blue-500 text-xs sm:text-sm'>#</span>
                  <span key={index} className="tag text-xs break-words sm:text-md text-blue-500">
                    {tag}
                  </span>

                  </div>
                  
                ))}
              </div>
              

            </div>
          ))}
          </div>)):(

            <div className='w-screen  h-auto p-5 flex flex-col     justify-center items-center gap-[20px]'>
              
              <div className='w-full h-full '> <img src={nodatafoundimage} className=' mx-auto sm:w-[300px] md:w-[500px] w-[200px] h-[200px] sm:h-[300px] rounded-xl shadow-xl md:h-[500px]'/></div>
              <div className='sm:text-3xl  text-red-500 font-bold font-mono'>No blogs to show !</div>

            </div>
          )}

    
    </div>
  )
}

export default ContentPage;
