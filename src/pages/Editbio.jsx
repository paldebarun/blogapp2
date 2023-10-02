import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import sessionlogintimer from '../images/../images/5228679.jpg'
import imageplaceholder from '../images/icons8-test-account-64.png';
import { useEffect } from 'react';
import countryNames from '../constants/countryNames'
import Footer from '../components/Footer';
import axios from 'axios'
import save from '../images/icons8-save-50.png'
import Heading from '../components/Heading';
import { BsFilterRight } from 'react-icons/bs'
import { GrFormClose } from 'react-icons/gr'
import { GoHome } from 'react-icons/go';
import { BsPlusSquare } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { IoIosLogOut } from 'react-icons/io'
import { IoIosLogIn } from 'react-icons/io'
import { CgSpinner } from 'react-icons/cg'



const Editbio = () => {
  const [dark, setDark] = useState(false);
  const [isLoggedIn,setLogin]=useState(false);
  const [isloading,setLoading]=useState(false);
  const [imgurl,setimgulr]=useState('');
  const [increateblog, setincreateblog] = useState(false);
  const [openfilterbox, setfilterbox] = useState(false);
   
  const loginfunctionality = () => {
    if (isLoggedIn) {
      setLogin(false);
      localStorage.removeItem('token');

    }

    else {

      window.location.href = '/login'
    }

  }

  const submitHandler= async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('https://blogserver3.onrender.com/api/v1/updateProfile', formdata);
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

        const response = await axios.get('https://blogserver3.onrender.com/api/v1/auth', { headers });

        if(response.data.success){
          const imgresponse=await axios.get(`https://blogserver3.onrender.com/api/v1/fetchprofile/${response.data.payload.email}`);

          console.log("this is img response ",imgresponse);

          setimgulr(imgresponse.data.profile.imageurl);
          console.log("this is img url : ",imgurl);
          setLogin(true);
        }
        


        const payload = response.data.payload;
 

        const url = `https://blogserver3.onrender.com/api/v1/fetchprofile/${payload.email}`;
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
      const response = await axios.post('https://blog-server-gbxk.onrender.com/api/v1/uploadPhoto', formData);
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
              <CgSpinner className='animate-spin w-[50px] h-[50px]' />
              <div className=' text-slate-500 sm:text-md  text-sm font-mono text-center'>Please wait ... </div>
            </div>
             ):(
              <div className='w-screen relative flex flex-col justify-start gap-[50px]' >

             
                <BsFilterRight onClick={() => { setfilterbox(!openfilterbox) }} className='w-[30px] top-[20px] h-[30px] absolute md:hidden right-[5px] sm:top-[25px] hover:cursor-pointer ' />
                {
                  openfilterbox && (
                    <div className='flex w-[120px] rounded-xl top-[-3px]  bg-white z-20 flex-col absolute gap-[10px] justify-center items-center sm:right-[5px] shadow-xl right-[2px] border sm:w-[190px] h-auto  p-5'>
                      <GrFormClose className='absolute right-[10px] top-[3px] hover:cursor-pointer' onClick={() => {

                        setfilterbox(!openfilterbox)


                      }} />


                      <div className='md:hidden gap-[20px] lg:gap-[20px] flex flex-col justify-center items-center'>

                        <NavLink to='/home' >
                          <GoHome className='sm:w-[28px] w-[20px] h-[20px] sm:h-[28px] lg:w-[33px] hover:cursor-pointer  lg:h-[33px] hover:scale-110 duration-150' />
                        </NavLink>

                        <NavLink to='/add'  >
                          <BsPlusSquare className='sm:w-[21px] sm:h-[21px] hover:cursor-pointer lg:w-[26px] lg:h-[26px] hover:scale-110 duration-150' />
                        </NavLink>

                        <NavLink to='/dashboard' className='flex group flex-col justify-center items-center' >
                          {imgurl ?
                            <img src={imgurl} className='sm:w-[25px] w-[20px] h-[20px] sm:h-[25px] rounded-full lg:w-[30px] lg:h-[30px] hover:scale-110 duration-150' />
                            :
                            <CgProfile className='sm:w-[25px] w-[25px] h-[20px] sm:h-[20px] lg:w-[30px] lg:h-[30px] hover:scale-110 duration-150' />}

                          <AiOutlineCaretDown className='hidden group-hover:inline opacity-25 w-[20px] transition-all duration-200' />

                        </NavLink>

                        <div className='flex gap-[20px]'>
                          {

                            isLoggedIn ? <IoIosLogOut onClick={loginfunctionality} className='hover:cursor-pointer w-[20px] h-[20px] sm:w-[27px] sm:h-[27px] lg:w-[32px] lg:h-[32px] hover:scale-110 duration-150 ' /> : <IoIosLogIn onClick={loginfunctionality} className='hover:cursor-pointer w-[20px] h-[20px] sm:w-[27px] sm:h-[27px] lg:w-[32px] lg:h-[32px] hover:scale-110 duration-150' />

                          }
                        </div>

                      </div>
                    </div>
                  )
                }
            






          <Heading imgurl={imgurl} increateblog={true} dark={dark} setDark={setDark} isLoggedIn={isLoggedIn} setLogin={setLogin} />
      
      <div className='p-4 w-full flex flex-col gap-[20px]'>
        <div className='edit-image flex flex-col gap-[20px] w-full items-center'>
          <img
            src={formdata.url? formdata.url  : (imageUrlPreview ? imageUrlPreview : imageplaceholder)}
            alt="Image Preview"
            className="w-[100px] object-cover h-[100px] outline-none sm:w-[200px] sm:h-[200px] lg:w-[200px] lg:h-[200px] rounded-full"
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
          <input type="text" placeholder="Add User Name" name="username" onChange={editbiohandler} value={formdata.username} className='w-full text-xs outline-none sm:text-lg h-auto p-4 overflow-scroll  border rounded-lg hover:shadow-lg text-center' />
        </div>

        <div className='pseudonym w-[200px] sm:w-[300px] h-[50px] hover:cursor-pointer mx-auto'>
          <input type="text" placeholder="Add your pseudonym" name="pseudonym" onChange={editbiohandler} value={formdata.pseudonym} className='w-full outline-none text-xs sm:text-lg h-auto p-4 overflow-scroll  border rounded-lg hover:shadow-lg text-center' />
        </div>

        <div className='job w-[200px] sm:w-[300px] h-[50px] hover:cursor-pointer mx-auto'>
          <input type="text" placeholder="Add your job " name="job" onChange={editbiohandler} value={formdata.job} className='w-full h-auto p-4 outline-none overflow-scroll text-xs sm:text-lg  border rounded-lg hover:shadow-lg text-center' />
        </div>

        <div className='country w-full flex justify-center  '>
          <select name="country" className='text-center w-[200px] text-xs sm:text-lg sm:w-[300px] h-[50px]   border rounded-lg hover:shadow-lg outline-none hover:cursor-pointer' value={formdata.country} onChange={editbiohandler}>
            {countryNames.map((element, index) => (
              <option key={index} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>

        <div className='email w-[200px] sm:w-[300px] h-[50px] hover:cursor-pointer mx-auto'>
          <input type="email" placeholder="Add your email " name="email" onChange={editbiohandler} value={formdata.email} className='w-full outline-none h-auto p-4 overflow-scroll text-xs sm:text-lg  border rounded-lg hover:shadow-lg text-center' />
        </div>

        <div className='bio w-[300px] sm:w-[500px] lg:w-[800px] h-auto hover:cursor-pointer mx-auto'>
          <textarea type="message" placeholder="Add your bio " name="bio" onChange={editbiohandler} value={formdata.bio} className='w-full  p-4 outline-none overflow-auto break-words  text-xs sm:text-lg flex  border h-[300px] rounded-lg hover:shadow-lg text-center' />
        </div>

      </div>

      <form onSubmit={submitHandler}>
        <button type="submit" className='flex justify-center  hover:shadow-xl hover:scale-105 duration-200 bg-slate-300 m-4 text-slate-500 hover:text-white  hover:bg-slate-500 transition-all  px-3 py-3 rounded-[50px] mx-auto w-[100px]  items-center'>
          
          <p className='text-white font-mono'>Save</p>
        </button>

        <div className='h-[50px] sm:h-[100px]'></div>
      </form>





      
      
      </div>
             )

          ):(
      
        <div className='w-screen h-screen flex flex-col justify-center gap-[30px] items-center'>
        {/* <Heading setDark={setDark} dark={dark} /> */}

        
        
       <div className=' card flex flex-col gap-[20px] w-auto h-auto py-7 px-10 justify-center rounded-tl-3xl rounded-tr-md rounded-br-3xl rounded-bl-md items-center  shadow-2xl scale-75 sm:scale-100 '>
       <img src={sessionlogintimer} className='w-[300px] h-[300px] rounded-full  ' />

       <p className='text-slate-400 text-sm  sm:text-md font-mono'>Your Session Has Expired</p>

       <p className='text-slate-400  text-center  text-md font-mono'>Kindly Login to experience CU blog</p>

       
        <NavLink to='/login' >
        <button className='w-[100px] h-[50px] text-slate-200 bg-blue-900 rounded-3xl hover:shadow-cyan-850 hover:shadow-2xl hover:scale-110 duration-150'>
         
         Login

        </button>
        </NavLink>
        
         
       </div>

      
    </div>



      )
        






      }

      

    </div>
  )
}

export default Editbio;
