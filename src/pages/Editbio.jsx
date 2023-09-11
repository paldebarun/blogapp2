import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-home-48.png'
import imageplaceholder from '../images/icons8-test-account-64.png';
import { useEffect } from 'react';
import countryNames from '../constants/countryNames'
import Footer from '../components/Footer';
import axios from 'axios'
import save from '../images/icons8-save-50.png'
import Heading from '../components/Heading';
import sessionlogintimer from '../images/../images/5228679.jpg'
import loading from '../images/loading.png'



const Editbio = () => {
  const [dark, setDark] = useState(false);
  const [isLoggedIn,setLogin]=useState(false);
  const [isloading,setLoading]=useState(false);
  

  const submitHandler= async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/api/v1/updateProfile', formdata);
      console.log("this is the response1", response);
       
      setLoading(false);

      // Redirect after successful submission
      window.location.href = '/dashboard';
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {

    const fetchData = async () => {

      const token = localStorage.getItem('token');

     setLoading(true);
      if (token) {

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get('http://localhost:4000/api/v1/auth', { headers });

        if(response.data.success){
          
          setLogin(true);
        }
        


        const payload = response.data.payload;
 

        const url = `http://localhost:4000/api/v1/fetchprofile/${payload.email}`;
        const response_second = await axios.get(url);


        setLoading(false);

        console.log("this is second-response : ",response_second);

        const profile = response_second.data.profile;
        console.log("this is profile : ", profile);

        const obj = {
          _id:profile._id,
          url:profile.imageurl,
          imageUrl:"",
          username: profile.username,
          pseudonym: profile.pseudonym,
          job: profile.job,
          country: profile.country,
          email: profile.email,
          bio: profile.bio


        }
    

        
        

        setformdata(obj);

       
       console.log("this is formdata at first render : ",formdata);

      }

    };

    fetchData();


  }, []);






  const [formdata, setformdata] = useState({
    _id:"",
    url:"",
    imageUrl: "",
    username: "",
    pseudonym: "",
    job: "",
    country: "",
    email: "",
    bio: ""
  })




  const [imageUrlPreview, setImageUrlPreview] = useState(null);




  useEffect(() => {
    if (formdata.imageUrl instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrlPreview(e.target.result);
      };
      reader.readAsDataURL(formdata.imageUrl);
    } else {
      setImageUrlPreview(formdata.imageUrl);
    }
  }, [formdata.imageUrl]);

  const editbiohandler = (event) => {
    const { name, value, files } = event.target;

    if (files && files[0]) {

      setformdata((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setformdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    console.log(formdata);
  };


  const brightness = () => {
    setDark(false);
  }

  const darkness = () => {
    setDark(true);
  }

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('imageFile', formdata.imageUrl); // Append the File object
       setLoading(true);
      const response = await axios.post('http://localhost:4000/api/v1/uploadPhoto', formData);
      setLoading(false);
      console.log('Image uploaded to Cloudinary:', response);
      const url = response.data.imageUrl;
      console.log("this is url  : ",url);
      setformdata((prev)=>({
        ...prev,
        url:url
      }));
      

      console.log(formdata);

     
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error cases here
    }
  };
  
  

 

  return (
     <div>
      {
        isLoggedIn ? (
             isloading ? (
              <div className='w-screen h-screen flex justify-center items-center flex-col'>
                <img src={loading} className=' w-[100px] h-[100px] animate-spin' />
                <div className='font-bold text-slate-400 font-mono text-center'> Loading please wait ... </div>
              </div>
             ):(
              <div className='w-screen flex flex-col gap-[50px]' >
          <Heading dark={dark} setDark={setDark} isLoggedIn={isLoggedIn} setLogin={setLogin} />
      
      <div className='p-4 flex flex-col gap-[20px]'>
        <div className='edit-image flex flex-col gap-[20px] w-full items-center'>
          <img
            src={formdata.url? formdata.url  : (imageUrlPreview ? imageUrlPreview : imageplaceholder)}
            alt="Image Preview"
            className="w-[100px] object-cover h-[100px] sm:w-[200px] sm:h-[200px] lg:w-[200px] lg:h-[200px] rounded-full"
          />
          <div className='w-full mx-auto flex flex-col gap-[20px] items-center'>
            <input
              type="file"
              placeholder='choose image'
              name="imageUrl"
              onChange={editbiohandler}
             
              className='hover:cursor-pointer text-sm w-[200px]'
            />

            <button  onClick={uploadFile} className='border  p-3 rounded-lg bg-slate-300 text-slate-500 hover:scale-110 duration-150 hover:shadow-lg '>
              Upload image
            </button>
          </div>
        </div>


        <div className='user-name w-[200px] sm:w-[300px] h-[50px] hover:cursor-pointer mx-auto'>
          <input type="text" placeholder="Add User Name" name="username" onChange={editbiohandler} value={formdata.username} className='w-full text-xs sm:text-lg h-auto p-4 overflow-scroll  border rounded-lg hover:shadow-lg text-center' />
        </div>

        <div className='pseudonym w-[200px] sm:w-[300px] h-[50px] hover:cursor-pointer mx-auto'>
          <input type="text" placeholder="Add your pseudonym" name="pseudonym" onChange={editbiohandler} value={formdata.pseudonym} className='w-full text-xs sm:text-lg h-auto p-4 overflow-scroll  border rounded-lg hover:shadow-lg text-center' />
        </div>

        <div className='job w-[200px] sm:w-[300px] h-[50px] hover:cursor-pointer mx-auto'>
          <input type="text" placeholder="Add your job " name="job" onChange={editbiohandler} value={formdata.job} className='w-full h-auto p-4 overflow-scroll text-xs sm:text-lg  border rounded-lg hover:shadow-lg text-center' />
        </div>

        <div className='country w-full flex justify-center  '>
          <select name="country" className='text-center w-[200px] text-xs sm:text-lg sm:w-[300px] h-[50px]   border rounded-lg hover:shadow-lg hover:cursor-pointer' value={formdata.country} onChange={editbiohandler}>
            {countryNames.map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>

        <div className='email w-[200px] sm:w-[300px] h-[50px] hover:cursor-pointer mx-auto'>
          <input type="email" placeholder="Add your email " name="email" onChange={editbiohandler} value={formdata.email} className='w-full h-auto p-4 overflow-scroll text-xs sm:text-lg  border rounded-lg hover:shadow-lg text-center' />
        </div>

        <div className='bio w-[200px] sm:w-[300px] h-auto hover:cursor-pointer mx-auto'>
          <textarea type="message" placeholder="Add your bio " name="bio" onChange={editbiohandler} value={formdata.bio} className='w-full h-auto p-4 overflow-auto break-words  text-xs sm:text-lg flex  border rounded-lg hover:shadow-lg text-center' />
        </div>

      </div>

      <form onSubmit={submitHandler}>
        <button type="submit" className='flex gap-[10px] hover:shadow-xl hover:scale-105 duration-150 bg-emerald-400 px-8 py-4 rounded-[50px] mx-auto w-[200px]  items-center'>
          <img src={save} />
          <p className='text-white font-mono'>Save</p>
        </button>
      </form>





      <Footer />
      
      </div>
             )

          ):(
      
        <div className='w-full flex flex-col gap-[30px] items-center'>
        {/* <Heading setDark={setDark} dark={dark} /> */}

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



      )
        






      }

      

    </div>
  )
}

export default Editbio;
