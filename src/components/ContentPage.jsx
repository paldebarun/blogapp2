import React, { useState, useEffect } from 'react';
import axios from 'axios';
import blogicon from '../images/blog.png';
import nodatafoundimage from '../images/9214777.jpg';
import loading from '../images/loading.png';
import like from '../images/heart.png';
import not_liked from '../images/heart copy.png';

const ContentPage = ({ burgermenu }) => {
  const [dark, setDark] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [payload, setPayload] = useState({});
  
  // Create an array of islike states, one for each blog
  const [islikeArray, setIsLikeArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      console.log("token : ", token);

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        const response = await axios.get('https://blog-server-gbxk.onrender.com/api/v1/auth', { headers });
        console.log("response : ", response);
        if (response.data.success) {
          console.log("this is it");
        }

        setLoading(false);
        const payload = response.data.payload;
        setPayload(payload);

        console.log("payload : ", payload);

        setLoading(true);
        const url = `https://blog-server-gbxk.onrender.com/api/v1/fetchallblogs`;
        const response_second = await axios.get(url);

        setLoading(false);
        setBlogs(response_second.data.blogs);

        // Initialize the islikeArray with false for each blog
        setIsLikeArray(new Array(response_second.data.blogs.length).fill(false));

        console.log("blogs : ", blogs);

        // Check and update islikeArray for already liked blogs
        if (payload && payload.email) {
          const user = await axios.post('http://localhost:4000/api/v1/fetchuser', { email: payload.email });
          if (user.data.user) {
            const userId = user.data.user._id;
            for (let i = 0; i < response_second.data.blogs.length; i++) {
              const blogId = response_second.data.blogs[i]._id;
              const existingLike = await axios.post(`http://localhost:4000/api/v1/checklike`, { blog_id: blogId, user_id: userId });
              if (existingLike.data.liked) {
                setIsLikeArray(prevState => {
                  const newState = [...prevState];
                  newState[i] = true;
                  return newState;
                });
              }
            }
          }
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

  const likebutton = async (blogid, index) => { // Pass the index of the blog
    try {
      setLoading(true);
      console.log(payload.email);
      const user = await axios.post('http://localhost:4000/api/v1/fetchuser', { email: payload.email });

      console.log(user);
      console.log("user id : ", user.data.user._id);
      console.log("blog id : ", blogid);
      const existingLike = await axios.post(
        `http://localhost:4000/api/v1/checklike`,
        {
          blog_id: blogid,
          user_id: user.data.user._id,
        }
      );

      console.log("existing like", existingLike);

      setLoading(false);
      console.log("isliked ", existingLike.data.liked);

      if (existingLike.data.liked) {
        setLoading(true);
        const response = await axios.post('http://localhost:4000/api/v1/unlike', { id: user.data.user._id, blog_id: blogid });

        console.log("unlike response: ", response);

        if (response.data.success) {
          // Update the corresponding islike state for the blog
          setIsLikeArray(prevState => {
            const newState = [...prevState];
            newState[index] = false;
            return newState;
          });
        }

        setLoading(false);
      } else {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:4000/api/v1/like`,
          { blog_id: blogid, id: user.data.user._id }
        );

        console.log("like response: ", response);

        if (response.data.success) {
          // Update the corresponding islike state for the blog
          setIsLikeArray(prevState => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });
        }

        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={burgermenu ? 'flex flex-col  gap-[60px] w-full  duration-150' : 'flex flex-col gap-[60px] w-full mr-[40px] opacity-30 duration-150'}>
      {blogs.length > 0 ? (
        isloading ? (
          <div className='w-full h-full flex justify-center items-center flex-col'>
            <img src={loading} className=' w-[50px] h-[50px] animate-spin' />
            <div className='font-bold text-slate-400 font-mono text-center'> Loading please wait ... </div>
          </div>
        ) : (
          <div className='flex flex-col w-full  gap-[10px]   md:gap-[20px]'>
            <img src={blogicon} className='sm:w-[100px] w-[70px] h-[70px] sm:h-[100px] mx-auto animate-pulse' />
            {blogs.map((blog, index) => (
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
                <div className='hover:cursor-pointer'>
                  <img src={islikeArray[index] ? like : not_liked} onClick={() => likebutton(blog._id, index)} />
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
          </div>
        )
      ) : (
        <div className='w-screen  h-auto p-5 flex flex-col     justify-center items-center gap-[20px]'>
          <div className='w-full h-full '> <img src={nodatafoundimage} className=' mx-auto sm:w-[300px] md:w-[500px] w-[200px] h-[200px] sm:h-[300px] rounded-xl shadow-xl md:h-[500px]' /></div>
          <div className='sm:text-3xl  text-red-500 font-bold font-mono'>No blogs to show !</div>
        </div>
      )}
    </div>
  )
}

export default ContentPage;
