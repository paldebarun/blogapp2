import React, { useState,useEffect } from 'react'
import axios from 'axios'
import sessionlogintimer from '../images/../images/5228679.jpg'
import { NavLink } from 'react-router-dom'
import sun from '../images/icons8-light-on-48.png'
import moon from '../images/icons8-reflector-bulb-48.png'
import home from '../images/icons8-homepage-48.png'
import Footer from '../components/Footer'
import Heading from '../components/Heading'
import blogicon from '../images/blog.png'
import deleteicon from '../images/icons8-delete-64.png'
import nodatafoundimage from '../images/9214777.jpg'
import loading from '../images/loading.png'
import like from '../images/heart.png';
import comment_icon from '../images/icons8-comment-48.png'

 const Userblogs = () => {
  const [dark, setDark] = useState(false);
const [blogs,setblogs]=useState([]);
const [isLoggedin,setLogin]=useState(false);
const [isloading,setLoading]=useState(false);
const [likescount,setlikecount]=useState({});
const [commentloading, setcommentloading] = useState(false);
const [commentBoxOpen, setCommentBoxOpen] = useState({});
const [blogComments, setBlogComments] = useState({});



// Define a function to fetch like counts for a single blog
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



// Inside your useEffect, fetch like counts for each blog and update the state
useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setLoading(true);
      const response = await axios.get('https://blogserver3.onrender.com/api/v1/auth', { headers });
      if (response.data.success) {
        const payload = response.data.payload;
        const url = `https://blogserver3.onrender.com/api/v1/userblogs/${payload.email}`;
        const response_second = await axios.get(url);
        setblogs(response_second.data.blogs);
        
        // Fetch and update like counts for each blog
        const likeCountsData = {};
        for (const blog of response_second.data.blogs) {
          const likeCount = await fetchLikeCount(blog._id);
          likeCountsData[blog._id] = likeCount;
        }
        setlikecount(likeCountsData);
        
        console.log("this is likecount", likeCountsData);
      }
      setLoading(false);
    }
  };
  fetchData();
}, []);




const deleteBlog = async (_id) => {

  try {

    const obj={
      id:_id
    }
    setLoading(true);
    const response = await axios.post(`https://blogserver3.onrender.com/api/v1/deleteBlog`,obj);
    setLoading(false);
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
     setLoading(true);
      const response = await axios.get('https://blogserver3.onrender.com/api/v1/auth', { headers });
     console.log("response : ",response);
      if(response.data.success){
        console.log("this is it");
        setLogin(true);
      }

      
     
      const payload = response.data.payload;
      console.log("payload : ",payload);
      
      const url = `https://blogserver3.onrender.com/api/v1/userblogs/${payload.email}`;
      const response_second = await axios.get(url);
     

     
      
      setblogs(response_second.data.blogs);

      setLoading(false);

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

const brightness = () => {
  setDark(false);
}

const darkness = () => {
  setDark(true);
}






  return (
    <div>
     { 
      isLoggedin ? (
         
      
       isloading ? (<div className='w-screen h-screen flex justify-center items-center flex-col'>
                <img src={loading} className=' w-[100px] h-[100px] animate-spin' />
                <div className='font-bold text-slate-400 font-mono text-center'> Loading please wait ... </div>
              </div>):(
        <div className='flex flex-col gap-[60px]' >
           <Heading dark={dark} setDark={setDark} isLoggedIn={isLoggedin} setLogin={setLogin}/>
           {blogs.length>0 ? ( 
            <div className='flex flex-col  gap-[10px]  md:gap-[20px]'>
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
                <div className='border lg:w-[1200px] sm:w-[700px] overflow-y-scroll p-4 text-center h-[200px] rounded-lg text-sm sm:text-md text-slate-500'>{blog.content}</div>
              </div>
              <div className='flex flex-col md:flex-row gap-[10px]'>
              <div className='text-red-700 text-xs sm:text-md'>Category : </div>
              <div className='text-slate-500 text-sm sm:text-md'> {blog.category}</div>

              </div>
              
              <div className='flex flex-col md:flex-row gap-[10px]'>

              <div className='text-red-700 text-sm sm:text-md'>Date : </div>

              <div className='text-slate-500 text-sm sm:text-md'> {new Date(blog.date).toLocaleDateString()}</div>
             
               
              </div>

              <div className='flex gap-[10px] items-center justify-center'>
                <img src={like}/>
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
                  <div className='flex flex-col gap-[5px] h-[300px] overflow-y-scroll   border rounded-lg '>
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
                          
                          <div className='text-sm'> loading ...</div>

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
              <img src={deleteicon} onClick={() => deleteBlog(blog._id)} className='hover:cursor-pointer w-[30px] h-[30px]' />

            </div>
          ))}
          </div>):(

            <div className='w-screen  h-auto p-5 flex flex-col     justify-center items-center gap-[20px]'>
              
              <div className='w-full h-full '> <img src={nodatafoundimage} className=' mx-auto sm:w-[300px] md:w-[500px] w-[200px] h-[200px] sm:h-[300px] rounded-xl shadow-xl md:h-[500px]'/></div>
              <div className='sm:text-3xl  text-red-500 font-bold font-mono'>No blogs to show !</div>

            </div>
          )}
          

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

export default Userblogs;
