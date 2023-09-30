import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import Footer from '../components/Footer';

import sessionlogintimer from '../images/../images/5228679.jpg'
import { NavLink } from 'react-router-dom';
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-homepage-48.png'


 const Createblogcontent = ({payload,isLoggedIn,setlogin}) => {

    console.log("this is payload : ",payload);
    const [dark,setDark]=useState(false);
    
    const [formdata,setformdata]=useState({

        email:payload.email,
        name:"",
        heading:"",
        auther:"",
        content:"",
        category:"",
        tags:[]
    });


    const brightness = () => {
        setDark(false);
      }
    
      const darkness = () => {
        setDark(true);
      }

    const submitForm= async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('https://blogserver3.onrender.com/api/v1/createblog', formdata);
          console.log("this is the response", response);
         
         
          window.location.href = '/home';
        } 
        catch (error) {
          console.error("An error occurred:", error);
        }
      };

      const changeHandler = (event) => {
        const { name, value } = event.target;

        if (name === 'tags') {
            // Split the input value by commas to create an array of tags
            const tagsArray = value.split(',').map(tag => tag.trim());
        
            setformdata((prev) => ({
              ...prev,
              [name]: tagsArray,
            }));
          }

          else{
        setformdata((prev) => ({
          ...prev,
          [name]: value,
        }));}

        console.log("this is formdata : ",formdata)
      };

  return (
    <div>
   
       <div className='w-screen h-auto p-4 flex justify-center'>

        <form  onSubmit={submitForm} className='flex flex-col gap-[15px] md:gap-[20px] lg:gap-[50px] w-full p-3 items-center '>
        <div className='lg:h-[100px] h-[70px] flex justify-center items-center '>

        <p className=' text-md md:text-xl text-center  text-slate-400 font-mono'>Create your blog here </p>
        </div>
          
         
         <div className='flex gap-[10px] items-center'>
         
         <textarea type="text" placeholder='blog name' className='text-center md:w-[300px] p-2 border rounded-lg outline-none' name="name" value={formdata.name} onChange={changeHandler}>
            
            </textarea></div>


        <div className='flex gap-[10px] items-center'>
        
        <textarea type="text" placeholder="heading of the blog" onChange={changeHandler}
          className='text-center p-2 border outline-none rounded-lg md:w-[300px]' name="heading" value={formdata.heading} ></textarea>
        </div>

         

         <div className='flex gap-[10px] items-center'>
         
         <textarea type="text" placeholder="auther of the blog" onChange={changeHandler}
          className='text-center p-2 border outline-none rounded-lg w-[300px]  md:w-[400px]' name="auther" value={formdata.auther} ></textarea>
         </div>
      
         
      <div className='flex gap-[10px] items-center'>
      

        <textarea type="text" placeholder="content of the blog" onChange={changeHandler}
          className='text-center p-2 border h-[400px] outline-none w-[300px] sm:w-[500px] rounded-lg md:w-[700px] lg:w-[1000px]' name="content" value={formdata.content} ></textarea>

      </div>


      <div className='flex gap-[10px] items-center'>
        
         <textarea type="text" placeholder="category of the blog" onChange={changeHandler}
          className='text-center p-2 border outline-none rounded-lg md:w-[300px]' name="category" value={formdata.category} ></textarea>
         </div>

         <div className='flex gap-[10px] items-center'>
         
        <input
    type='text'
    placeholder='tags (comma-separated)'
    className='text-center p-2 border outline-none rounded-lg md:w-[500px]'
    name='tags'
    value={formdata.tags.join(', ')}
    onChange={changeHandler}
  />
</div>

      
        <button onSubmit={submitForm} type="submit" className='flex justify-center  hover:shadow-xl hover:scale-105 duration-200 bg-slate-300 m-4 text-slate-500 hover:text-white  hover:bg-slate-500 transition-all  px-3 py-4 rounded-[50px] mx-auto w-[100px]  items-center'>
          
          <p className=' font-mono'>Save</p>
        </button>
      


        </form>



        

       </div>



    
    </div>
  )
}

export default Createblogcontent;
