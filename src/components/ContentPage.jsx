import React, { useState, useEffect } from 'react';
import axios from 'axios';
import nodatafoundimage from '../images/9214777.jpg';
// import loading from '../images/loading.png';

import comment_icon from '../images/icons8-comment-48.png'
import sendicon from '../images/icons8-send-16.png'
import deletecommenticon from '../images/icons8-delete-64.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {GrFormClose} from 'react-icons/gr'
import {FcLike} from 'react-icons/fc'
import {FcLikePlaceholder} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'


const ContentPage = ({ blogs,setBlogs }) => {
  const [dark, setDark] = useState(false);
  // const [blogs, setBlogs] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [commentloading, setcommentloading] = useState(false);
  const [payload, setPayload] = useState({});
  const [likecontainer, setLikeContainer] = useState(false);
  const [likedAuthors, setLikedAuthors] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [commentBoxOpen, setCommentBoxOpen] = useState({});
  const [islikeArray, setIsLikeArray] = useState([]);
  const [blogComments, setBlogComments] = useState({});
  const [newComment, setNewComment] = useState({

    comment: ""
  });


  useEffect(() => {
    const initialCommentBoxOpen = {};
    blogs.forEach((blog) => {
      initialCommentBoxOpen[blog._id] = false;
    });
    setCommentBoxOpen(initialCommentBoxOpen);
  }, [blogs]);

  const reloadcommentbox = async (blogId) => {

    try {
      setcommentloading(true);
      const response = await axios.post(`http://localhost:4000/api/v1/fetchcomments`, { blog_id: blogId });
      console.log(response);
      if (response.data.success) {
        setBlogComments((prevComments) => ({
          ...prevComments,
          [blogId]: response.data.comments,
        }));
      }
      setNewComment({
        comment: ""
      })
      setcommentloading(false);
    } catch (error) {
      console.error(error);
    }

  }

  const commentsectionhandler = async (blogId) => {

    try {

      if (!blogComments[blogId]) {
        setcommentloading(true);
        const response = await axios.post(`http://localhost:4000/api/v1/fetchcomments`, { blog_id: blogId });
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

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: value
    })


    );

    console.log(newComment);
  };



  const addComment = async (blogId, event) => {

    event.preventDefault();
    try {
      if (!newComment) {

        return;
      }
      console.log(newComment)
      setcommentloading(true);

      const obj = {
        id: blogId,
        email: payload.email,
        body: newComment,
      }
      console.log("object of new commwnt", obj);
      const response = await axios.post('http://localhost:4000/api/v1/addcomment', obj);
      console.log("the add comment response : ", response);
      if (response.data.success) {

        setBlogComments((prevComments) => ({
          ...prevComments,
          [blogId]: [...(prevComments[blogId] ?? []), newComment],
        }));

        console.log("set blog comment", blogComments);
        setNewComment({
          comment: ""
        })
        reloadcommentbox(blogId);
      }



      setcommentloading(false);

    } catch (error) {
      console.error(error);
    }
  };

  const deletecomment = async (blogId, commentId) => {
    try {
      console.log("comment id : ", commentId);
      setcommentloading(true);
      const response = await axios.post('http://localhost:4000/api/v1/uncomment', {
        userEmail: payload.email,
        commentId: commentId
      });

      console.log("response of uncomment : ", response);

      if (response.data.success) {
        // Filter out the deleted comment from the blogComments state
        setBlogComments((prevComments) => ({
          ...prevComments,
          [blogId]: prevComments[blogId].filter(comment => comment._id !== commentId),
        }));
      }
      setcommentloading(false);
    } catch (error) {
      console.error(error);
    }
  }






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


  const likecontainerhandler = async (blogId) => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:4000/api/v1/fetchlikesauthernames`, { blog_id: blogId });

      console.log(response);
      if (response.data.success) {
        setLikedAuthors(response.data.authorNames);
        setSelectedBlogId(blogId);

        // Toggle the like container's visibility by inverting the current state
        setLikeContainer((prevContainer) => !prevContainer);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
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

        window.location.reload();
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

        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }




  return (
    <div className='flex flex-col  gap-[60px] w-full  duration-150' >
      {blogs.length > 0 ? (
        isloading ? (
          <div className='w-full h-full flex justify-center items-center flex-col'>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        ) : (
          <div className='flex flex-col w-full  gap-[10px]   md:gap-[20px]'>
          
           
            {blogs.map((blog, index) => (
              <div className='p-2  sm:scale-90 lg:scale-100 shadow-xl border rounded-lg h-auto flex flex-col items-start gap-[20px]  relative  w-[90%] md:w-[60%] lg:w-[50%]  break-words mx-auto text-2xl' key={blog._id} >
                
                
                
                 
                  <div className='text-md text-black font-extrabold text-lg sm:text-md'>{blog.auther}</div>
               
               <div className='w-full text-center '>
               <h3 className='font-bold text-black text-center text-md'>{blog.heading}</h3>
               </div>
                
                <div className='flex w-full flex-col gap-[10px] sm:flex-row  '>
                 
                  <div className=' overflow-y-scroll lg:w-[1200px] sm:w-[700px] text-center h-[200px] rounded-lg text-sm sm:text-md text-slate-500'>{blog.content}</div>
                </div>

                <div className='hover:cursor-pointer flex    gap-[10px] sm:gap-[15px]  items-center justify-between'>
                  
                    {islikeArray[index] ? <FcLike onClick={() => likebutton(blog._id, index)} className='w-[20px] h-[20px] ' /> : <FcLikePlaceholder onClick={() => likebutton(blog._id, index)} className='w-[20px] h-[20px] ' />} 
                  
                  
                  
                 <FaRegComment
                    className="hover:cursor-pointer w-[18px] h-[18px]"
                    onClick={() => commentsectionhandler(blog._id)}
                  />
                


                </div>

                <div className='flex flex-col gap-[10px]  items-start '>

                    <p onClick={() => likecontainerhandler(blog._id)} className='hover:cursor-pointer text-black text-sm p-1'>See Likes</p>
                    <div className='w-[400px] h-[400px] border top-52 left-[18%] absolute'>
                       
                      {likecontainer && selectedBlogId === blog._id && likedAuthors.length > 0 && (
                        <div className="liked-authors  p-4">
                        <GrFormClose onClick={() => likecontainerhandler(blog._id)} className='absolute right-2 w-[15px] top-1 h-[15px]' />
                          <h3 className='text-sm'>Liked by:</h3>
                          <div className='flex flex-col h-[100px] md:w-[200px] lg:w-[400px] overflow-y-scroll'>
                            {likedAuthors.map((author, authorIndex) => (
                              <div className='text-sm text-slate-400' key={authorIndex}>{author}</div>
                            ))}
                          </div>
                        </div>
                      )}




                    </div>


                  </div>


                <div className='flex flex-col md:flex-row gap-[10px]'>
                  <div className='text-red-700 text-xs sm:text-md'>Category : </div>
                  <div className='text-slate-500 text-sm sm:text-md'> {blog.category}</div>
                </div>
                <div className='flex flex-col md:flex-row gap-[10px]'>
                  <div className='text-red-700 text-sm sm:text-md'>Date : </div>
                  <div className='text-slate-500 text-sm sm:text-md'> {new Date(blog.date).toLocaleDateString()}</div>
                </div>
               






                

                {commentBoxOpen[blog._id] && (
                  <div className='flex absolute top-[0px] bg-white w-full left-0 flex-col gap-[5px] h-full overflow-y-scroll p-4    border rounded-lg '>
                    <GrFormClose  onClick={() => commentsectionhandler(blog._id)} />
                    {/* <p className='text-sm p-3'>Comments :</p> */}
                    <div className='flex flex-col'>
                      <form onSubmit={(event) => { addComment(blog._id, event) }} className="comment-section w-[100px]  sm:w-[200px]  text-sm md:w-[300px] flex      lg:w-[450px]   gap-[15px] items-start p-3">
                        <input type="text" name="comment" onChange={handleCommentChange} value={newComment.comment} className=' border-b-2 outline-none ' placeholder='add your comment here ' />
                        <button type="submit" > <img src={sendicon} className='w-[20px] h-[20px] hover:cursor-pointer' /></button>
                      </form>
                      {blogComments[blog._id] && !commentloading ? (
                        blogComments[blog._id].map((comment, commentIndex) => (
                          <div key={commentIndex} className="comment flex items-center gap-[5px]">
                            <p className="text-black text-sm p-3">{comment.autherName ? comment.autherName : 'Unknown Author'}</p>
                            <p className="text-slate-500 text-sm p-3">{comment.comment_body ? comment.comment_body : "this is body "}</p>

                            <img
                              src={deletecommenticon}
                              className='w-[20px] h-[20px] hover:cursor-pointer'
                              onClick={() => deletecomment(blog._id, comment._id)}
                            />

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
