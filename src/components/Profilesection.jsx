import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageplaceholder from '../images/icons8-test-account-64.png';
import {BsFilterRight} from 'react-icons/bs'
import { NavLink } from 'react-router-dom';
import { GrFormClose } from 'react-icons/gr'
import comment_icon from '../images/icons8-comment-48.png'
import {BsPatchCheckFill} from 'react-icons/bs'
import { formatDistanceToNow, parseISO } from 'date-fns';
import {AiOutlineDelete} from 'react-icons/ai'
import { FcLike } from 'react-icons/fc'
import {GoHome} from 'react-icons/go'
import {IoIosLogOut} from 'react-icons/io'
import {IoIosLogIn} from 'react-icons/io'
import {CgProfile} from "react-icons/cg";
import {BsPlusSquare} from 'react-icons/bs'
import {AiOutlineCaretDown} from 'react-icons/ai'
import {CgSpinner} from 'react-icons/cg'


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
 
  const [isLoggedIn,setLogin]=useState(false);
  const [emailboxopen,setemailbox]=useState(false);
  const [blogs,setblogs]=useState([]);
  const [likescount,setlikecount]=useState({});
const [commentloading, setcommentloading] = useState(false);
const [commentBoxOpen, setCommentBoxOpen] = useState({});
const [blogComments, setBlogComments] = useState({});
const [openfilterbox,setfilterbox]=useState(false);
const [imgurl,setimgulr]=useState('');


const loginfunctionality=()=>{
  if(isLoggedIn){
  setLogin(false);
  localStorage.removeItem('token');

  }

  else{
    
    window.location.href='/login'
  }

}

  const emailboxhandler=()=>{
    
    setemailbox(!emailboxopen);

  }

  const fetchLikeCount = async (blogId) => {
    try {
      const response = await axios.post('https://blogserver3.onrender.com/api/v1/fetchlikesauthernames', { blog_id: blogId });
      if (response.data.success) {
        return response.data.authorNames.length; 
      }
      return 0; 
    } catch (error) {
      console.error(error);
      return 0; 
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      if (payload) {
        try {
          console.log("this is payload", payload);
          console.log("profile section initiated");
          const url = `https://blogserver3.onrender.com/api/v1/fetchprofile/${payload.email}`;
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

  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
       
        const response = await axios.get('https://blogserver3.onrender.com/api/v1/auth', { headers });
        if (response.data.success) {
          const payload = response.data.payload;
          const url = `https://blogserver3.onrender.com/api/v1/userblogs/${payload.email}`;
          const response_second = await axios.get(url);
          setblogs(response_second.data.blogs);

          const imgresponse=await axios.get(`https://blogserver3.onrender.com/api/v1/fetchprofile/${response.data.payload.email}`);

          console.log("this is img response ",imgresponse);

          setimgulr(imgresponse.data.profile.imageurl);
          console.log("this is img url : ",imgurl);
          
          // Fetch and update like counts for each blog
          const likeCountsData = {};
          for (const blog of response_second.data.blogs) {
            const likeCount = await fetchLikeCount(blog._id);
            likeCountsData[blog._id] = likeCount;
          }
          setlikecount(likeCountsData);
          
          console.log("this is likecount", likeCountsData);
        }
        
      }
    };
    fetchData();
  }, []);
  
  
  
  
  const deleteBlog = async (_id) => {
  
    try {
  
      const obj={
        id:_id
      }
      
      const response = await axios.post(`https://blogserver3.onrender.com/api/v1/deleteBlog`,obj);
    
      console.log("delete response: ", response);
      window.location.reload();
    } catch (error) {
      console.error("delete error: ", error);
    }
  }
  
  
  useEffect(() => {
    
    const fetchData= async ()=>{
     
      const token=localStorage.getItem('token');
  
      console.log("token : ",token);
  
      if (token) {
  
        const headers = {
          Authorization: `Bearer ${token}`,
        };
       
        const response = await axios.get('https://blogserver3.onrender.com/api/v1/auth', { headers });
       console.log("response : ",response);
        if(response.data.success){
          console.log("this is it");
          
        }
  
        
       
        const payload = response.data.payload;
        console.log("payload : ",payload);
        
        const url = `https://blogserver3.onrender.com/api/v1/userblogs/${payload.email}`;
        const response_second = await axios.get(url);
       
  
       
        
        setblogs(response_second.data.blogs);
  
      
  
       console.log("blogs : ",blogs);
      
  
  
  
    }
    };
    fetchData();
  
    
  }, []);
  
  const commentsectionhandler = async (blogId) => {
  
    try {
  
      if (!blogComments[blogId]) {
        setcommentloading(true);
        const response = await axios.post(`https://blogserver3.onrender.com/api/v1/fetchcomments`, { blog_id: blogId });
        console.log(response);
        if (response.data.success) {
          setBlogComments((prevComments) => ({
            ...prevComments,
            [blogId]: response.data.comments,
          }));
        }
  
        setcommentloading(false);
      }
  
      setCommentBoxOpen((prevState) => ({
        ...prevState,
        [blogId]: !prevState[blogId],
      }));
  
      console.log(blogComments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex relative flex-col h-auto items-start gap-[10px]   '>
<div className='md:hidden'>
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

      <div className='image-username w-screen  h-auto gap-[10px] flex-col sm:flex-row  sm:gap-[100px] flex items-start px-[20px] sm:px-[100px] justify-start   '>


        <img src={profile.imageurl ? profile.imageurl : imageplaceholder} className='w-[120px] md:w-[150px] md:h-[150px] h-[120px] hover:scale-90 transition-all hover:shadow-2xl duration-150 hover:cursor-pointer  lg:w-[200px] lg:h-[200px] rounded-full object-cover' />


       


        

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
      

      

    

      <div className='md:h-[100px] sm:h-[50px] h-[20px] '></div>
      <div className='h-[1px] w-[95%] mx-auto bg-slate-300'></div>

      <div className='flex flex-col w-full gap-[20px] items-center' >
           
           {blogs.length>0 ? ( 
            <div className='flex flex-row gap-[20px] sm:gap-[10px]  flex-wrap  w-[90%]  '>
           
         {blogs.map((blog) => (
            <div className='p-7 relative sm:scale-90 lg:scale-100  shadow-xl border rounded-lg h-auto flex flex-col items-start  w-[400px] gap-[10px]  sm:w-[450px] lg:mx-0 mx-auto lg:w-[30%]  break-words  text-2xl' key={blog._id} >

            <div className='flex w-full h-auto absolute left-[10px] gap-[5px] items-center top-[5px] '>
            <div className='text-md  text-slate-500 text-sm md:text-md'>{blog.auther}</div>

            <BsPatchCheckFill className='w-[10px] h-[10px]'/>

            <div className='text-slate-500 text-xs sm:text-sm md:text-md '>
                    {formatDistanceToNow(parseISO(blog.date), { addSuffix: true })}
                  </div>
            </div>
            
              <div className='w-full flex justify-center'><h3 className='font-bold text-slate-500 text-sm sm:text-md'>{blog.heading}</h3></div>
              
              <div className=' flex flex-col md:flex-row gap-[7px]'>
             
              
              
              
              </div>
              <div className='flex w-full flex-col gap-[10px] sm:flex-row  '>
               
                <div className='border lg:w-[1200px] sm:w-[700px] overflow-y-scroll p-4 text-center h-[200px] rounded-lg text-sm sm:text-md text-slate-500'>{blog.content}</div>
              </div>
              <div className='flex   gap-[10px]'>
             <div className='text-slate-500 text-xs sm:text-md'>category : </div>
              <div className='text-slate-500 text-xs sm:text-md'> {blog.category}</div>

              </div>
  

              <div className='flex gap-[10px] items-center justify-center'>
                <FcLike />
                <div className='likecount text-sm'>{likescount[blog._id]}</div>
                <div>
                  
                </div>
               </div>

               <div>
                  <img
                    src={comment_icon}
                    className="hover:cursor-pointer w-[20px] h-[20px]"
                    onClick={() => commentsectionhandler(blog._id)}
                  />
                </div>

                {commentBoxOpen[blog._id] && (
                  <div className={commentBoxOpen[blog._id] ? 'flex absolute bottom-[0px] bg-white w-full left-0 flex-col gap-[5px] h-auto overflow-y-scroll p-3 transition-all duration-175    border rounded-lg ' : 'flex absolute bottom-[0px] bg-white w-full left-0 flex-col gap-[5px] h-0 overflow-y-scroll     border rounded-lg transition-all duration-175'}>
                  <div className='w-full h-[20px] flex  justify-center'>
                    <div className='sm:w-[50px]  w-[30px] h-[5px] rounded-2xl bg-slate-400'></div>
                  </div>
                  <GrFormClose className='hover:cursor-pointer absolute w-[15px] h-[15px]' onClick={() => commentsectionhandler(blog._id)} />
                    <p className='text-sm p-3'>Comments :</p>
                    <div className='flex flex-col'>
                     
                      {blogComments[blog._id] && !commentloading ? (
                        blogComments[blog._id].map((comment, commentIndex) => (
                          <div key={commentIndex} className="comment flex items-center gap-[5px]">
                            <p className="text-black text-sm p-3">{comment.autherName ? comment.autherName : 'Unknown Author'}</p>
                            <p className="text-slate-500 text-sm p-3">{comment.comment_body ? comment.comment_body : "this is body "}</p>
                             
                              
                            
                          </div>
                        ))
                      ) : (
                        <div className='w-full h-full flex justify-center items-center'>
                          
                          <CgSpinner className='animate-spin w-[30px] h-[30px]' />

                        </div>
                      )}

                    </div>

                  </div>
                )}

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
              <AiOutlineDelete onClick={() => deleteBlog(blog._id)} className='hover:cursor-pointer w-[20px] h-[20px]' />
               

            </div>
          ))}

          <div className='w-screen h-[70px] sm:h-[100px]'></div>


          </div>):(

            <div className='w-screen  h-auto p-5 flex flex-col     justify-center items-center gap-[20px]'>
              
             
              <div className='sm:text-xl  text-slate-400 font-mono'>No blogs to show !</div>

             
     
            </div>

            
          )}
          

        

        </div>

    





    </div>

  );
};

export default Profilesection;
