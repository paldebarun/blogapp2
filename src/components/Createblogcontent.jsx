import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import Footer from '../components/Footer';
import save from '../images/icons8-save-50.png'
import sessionlogintimer from '../images/../images/5228679.jpg'
import { NavLink } from 'react-router-dom';
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-home-48.png'
import note from '../images/icons8-note-64.png'

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
          const response = await axios.post('http://localhost:4000/api/v1/createblog', formdata);
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
    {
      isLoggedIn ? 
      
      (
       <div className='w-full h-auto p-4 flex justify-center'>
        <form  onSubmit={submitForm} className='flex flex-col gap-[20px] w-[500px] p-3 items-center '>
          <p className=' text-md md:text-3xl text-center text-slate-400 font-mono'>Create your blog here </p>
         
         <div className='flex gap-[10px] items-center'>
         <img  src={note} className='w-[30px] h-[30px]'/>
         <textarea type="text" placeholder='blog name' className='text-center md:w-[500px] p-2 border rounded-lg' name="name" value={formdata.name} onChange={changeHandler}>
            
            </textarea></div>


        <div className='flex gap-[10px] items-center'>
        <img  src={note} className='w-[30px] h-[30px]'/>
        <textarea type="text" placeholder="heading of the blog" onChange={changeHandler}
          className='text-center p-2 border rounded-lg md:w-[500px]' name="heading" value={formdata.heading} ></textarea>
        </div>

         

         <div className='flex gap-[10px] items-center'>
         <img  src={note} className='w-[30px] h-[30px]'/>
         <textarea type="text" placeholder="auther of the blog" onChange={changeHandler}
          className='text-center p-2 border rounded-lg md:w-[500px]' name="auther" value={formdata.auther} ></textarea>
         </div>
      
         
      <div className='flex gap-[10px] items-center'>
        <img  src={note} className='w-[30px] h-[30px]'/>

        <textarea type="text" placeholder="content of the blog" onChange={changeHandler}
          className='text-center p-2 border rounded-lg md:w-[500px]' name="content" value={formdata.content} ></textarea>

      </div>


      <div className='flex gap-[10px] items-center'>
         <img  src={note} className='w-[30px] h-[30px]'/>
         <textarea type="text" placeholder="category of the blog" onChange={changeHandler}
          className='text-center p-2 border rounded-lg md:w-[500px]' name="category" value={formdata.category} ></textarea>
         </div>

         <div className='flex gap-[10px] items-center'>
         <img src={note} className='w-[30px] h-[30px]' />
        <input
    type='text'
    placeholder='tags (comma-separated)'
    className='text-center p-2 border rounded-lg md:w-[500px]'
    name='tags'
    value={formdata.tags.join(', ')}
    onChange={changeHandler}
  />
</div>

      
        <button onSubmit={submitForm} type="submit" className='flex gap-[10px] hover:shadow-xl hover:scale-105 duration-150 bg-emerald-400 px-8 py-4 rounded-[50px] mx-auto w-[200px]  items-center'>
          <img src={save} />
          <p className='text-white font-mono'>Save</p>
        </button>
      


        </form>



        

       </div>


      )

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
    </div>

      




    }
    
    </div>
  )
}

export default Createblogcontent;
