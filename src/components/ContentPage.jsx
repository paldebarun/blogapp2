import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { AiOutlineSend } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrFormClose} from 'react-icons/gr'
import { FcLike } from 'react-icons/fc'
import { FcLikePlaceholder } from 'react-icons/fc'
import { FaRegComment } from 'react-icons/fa'
import {AiOutlineDelete} from 'react-icons/ai'
import {CgSpinner} from 'react-icons/cg'
import {BsPatchCheckFill} from 'react-icons/bs'

const ContentPage = ({ blogs, setBlogs }) => {
  const [dark, setDark] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [commentloading, setcommentloading] = useState(false);
  const [payload, setPayload] = useState({});
  const [likecontainer, setLikeContainer] = useState(false);
  const [likedAuthors, setLikedAuthors] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [commentBoxOpen, setCommentBoxOpen] = useState({});
  const [islikeArray, setIsLikeArray] = useState([]);
  const [blogComments, setBlogComments] = useState({});
  const [commentreplies,setcommentreplies]=useState({});
  const [newComment, setNewComment] = useState({

    comment: ""
  });

  const [newreply, setNewReply] = useState({});

  const [likeconatinerloader, setlikeloader] = useState(false);
  const [blogloader,setblogloader]=useState({});
  const [user_id,setuser_id]=useState('');
  const [showReplies, setShowReplies] = useState({});
  const [replyloader,setreplyloader]=useState({});
   

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
      const response = await axios.post(`https://blogserver3.onrender.com/api/v1/fetchcomments`, { blog_id: blogId });
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

  const reloadreplybox = async (commentId) => {

    try {
      setreplyloader((prev)=>({
        ...prev,
        [commentId]:true
      }));
      const response = await axios.post(`https://blogserver3.onrender.com/api/v1/fecthreplies`, {comment_id:commentId});

      console.log(response);

      

      if (response.data.success) {
        setcommentreplies((prev)=>({
                ...prev,
                [commentId]:response.data.replies
            }));
      }
      
      setreplyloader((prev)=>({
        ...prev,
        [commentId]:false
      }));


    } catch (error) {
      setreplyloader((prev)=>({
        ...prev,
        [commentId]:false
      }));
      console.error(error);
    }

  }

 

  const handlereplycontainer=async (commentId)=>{

   try{
    
      if(!commentreplies[commentId]){
          setreplyloader((prev)=>({
            ...prev,
            [commentId]:true
          }));

          const response= await axios.post('https://blogserver3.onrender.com/api/v1/fecthreplies',{comment_id:commentId});
          console.log("this is fetch reply response : ",response.data.replies);
          console.log("this is status : ",response.data.success);

          if(response.data.success){
          
            setcommentreplies((prev)=>({
                ...prev,
                [commentId]:response.data.replies
            }));

            
          }

          setreplyloader((prev)=>({
            ...prev,
            [commentId]:false
          }));
         

      }

      setShowReplies((prev)=>({
        ...prev,
      [commentId]:!prev[commentId]
      }));
      console.log("this is show replies ",showReplies);
      console.log("these are the replies of the comment : ",commentreplies);
      

      

   }
   catch(error){
    setreplyloader((prev)=>({
      ...prev,
      [commentId]:false
    }));
   console.log(error);
   }

  }

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



  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setNewComment((prev) => ({
      ...prev,
      [name]: value
    })


    );

    console.log(newComment);
  };

  const handlereplychange= (event,commentId)=>{
    const { name, value } = event.target;
  setNewReply((prev) => ({
    ...prev,
    [commentId]: value,
  }));
  }


  



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
      const response = await axios.post('https://blogserver3.onrender.com/api/v1/addcomment', obj);
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
      const response = await axios.post('https://blogserver3.onrender.com/api/v1/uncomment', {
        userEmail: payload.email,
        commentId: commentId
      });

      console.log("response of uncomment : ", response);

      if (response.data.success) {
       
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

  const deletereply =async (commentId,replyId)=>{
    try{
       
      setreplyloader((prev)=>({
        ...prev,
        [commentId]:true
      }));

      const response=await axios.post('https://blogserver3.onrender.com/api/v1/deletereply',{
        commentId:commentId,
        replyId:replyId
      });

      console.log("this is reponse : ",response);
     
      if(response.data.success){
        
        setcommentreplies((prev)=>({
          ...prev,
          [commentId]:prev[commentId].filter(reply => reply._id!==replyId),
        }));

       reloadreplybox(commentId);
      }
      setreplyloader((prev)=>({
        ...prev,
        [commentId]:false
      }));
      
   

    }
    catch(error){

     console.log(error);
    }
  }


  const addReply = async (blogId, commentId, event) => {
    event.preventDefault();
    try {
      if (!newreply[commentId]) {
        return;
      }
      setreplyloader((prev)=>({
        ...prev,
        [commentId]:true
      }));
      const obj = {
        comment_id: commentId,
        user_id: user_id,
        body: newreply[commentId], 
      };
      const response = await axios.post(
        'https://blogserver3.onrender.com/api/v1/postreply',
        obj
      );
      if (response.data.success) {
        setreplyloader((prev)=>({
          ...prev,
          [commentId]:false
        }));
        reloadcommentbox(blogId);
        setNewReply({
          ...newreply,
          [commentId]: "", 
        });
        reloadreplybox(commentId);
      }
    } catch (error) {
      console.error(error);
      setreplyloader((prev)=>({
        ...prev,
        [commentId]:false
      }));
    }
  };
  



  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      console.log("token : ", token);

      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);
        const response = await axios.get('https://blogserver3.onrender.com/api/v1/auth', { headers });
        console.log("response : ", response);
        if (response.data.success) {
          console.log("this is it");
        }

        setLoading(false);
        const payload = response.data.payload;
        setPayload(payload);

        console.log("payload : ", payload);

        setLoading(true);
        const url = `https://blogserver3.onrender.com/api/v1/fetchallblogs`;
        const response_second = await axios.get(url);

        setLoading(false);
        setBlogs(response_second.data.blogs);

        // Initialize the islikeArray with false for each blog
        setIsLikeArray(new Array(response_second.data.blogs.length).fill(false));

        console.log("blogs : ", blogs);

        // Check and update islikeArray for already liked blogs
        if (payload && payload.email) {
          const user = await axios.post('https://blogserver3.onrender.com/api/v1/fetchuser', { email: payload.email });
          if (user.data.user) {
            const userId = user.data.user._id;
            setuser_id(user.data.user._id);
            console.log("this is user id ",user_id);
            for (let i = 0; i < response_second.data.blogs.length; i++) {
              const blogId = response_second.data.blogs[i]._id;
              const existingLike = await axios.post(`https://blogserver3.onrender.com/api/v1/checklike`, { blog_id: blogId, user_id: userId });
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


  const reloadlikecontainer = async (blogId) => {

    try {
      setlikeloader(true);
      const response = await axios.post(`https://blogserver3.onrender.com/api/v1/fetchlikesauthernames`, { blog_id: blogId });

      console.log(response);
      if (response.data.success) {
        setLikedAuthors(response.data.authorNames);
        setSelectedBlogId(blogId);


        setlikeloader(false);
      }
      setlikeloader(false);
    }
    catch (error) {
      setlikeloader(false);
      console.error(error);
    }


  }


  const likecontainerhandler = async (blogId) => {
    try {
      
      setlikeloader(true);
      const response = await axios.post(`https://blogserver3.onrender.com/api/v1/fetchlikesauthernames`, { blog_id: blogId });

      console.log("this is lik container response ", response);
      if (response.data.success) {
        setLikedAuthors(response.data.authorNames);
        setSelectedBlogId(blogId);


        setLikeContainer((prevContainer) => !prevContainer);

        console.log("setlikecontainer", likecontainer);
        setlikeloader(false);
      }
    }

    
      
    catch (error) {
      setlikeloader(false);
      console.error(error);
    }
  }



  const likebutton = async (blogid, index) => {
    try {

      console.log(payload.email);

      setblogloader((prevLoading) => ({
        ...prevLoading,
        [blogid]: true, 
      }));
     
      const user = await axios.post('https://blogserver3.onrender.com/api/v1/fetchuser', { email: payload.email });

      console.log("this is user : ", user);
      console.log("user id : ", user.data.user._id);
      console.log("blog id : ", blogid);
      const existingLike = await axios.post(
        `https://blogserver3.onrender.com/api/v1/checklike`,
        {
          blog_id: blogid,
          user_id: user.data.user._id,
        }
      );

      console.log("existing like", existingLike);


      console.log("isliked ", existingLike.data.liked);

      if (existingLike.data.liked) {
        setlikeloader(true);
        const response = await axios.post('https://blogserver3.onrender.com/api/v1/unlike', { id: user.data.user._id, blog_id: blogid });

        console.log("unlike response: ", response);

        if (response.data.success) {

          setIsLikeArray(prevState => {
            const newState = [...prevState];
            newState[index] = false;
            return newState;
          });
        }


        setblogloader((prevLoading) => ({
          ...prevLoading,
          [blogid]: false,
        }));


        reloadlikecontainer(blogid);
      } else {

        const response = await axios.post(
          `https://blogserver3.onrender.com/api/v1/like`,
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

        setblogloader((prevLoading) => ({
          ...prevLoading,
          [blogid]: false,
        }));

        reloadlikecontainer(blogid);
      }
    } catch (error) {
      console.error(error);

      setblogloader((prevLoading) => ({
        ...prevLoading,
        [blogid]: false,
      }));
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

          <div className='flex flex-col w-full  gap-[70px]'>


            {blogs.map((blog, index) => (
                 
              <div className='p-2  sm:scale-90 lg:scale-100   h-auto flex flex-col items-start gap-[20px]  relative  w-[90%] md:w-[70%] lg:w-[70%]  break-words mx-auto text-2xl' key={blog._id} >
              <div className={blogloader[blog._id]?'w-full h-full flex justify-center items-start absolute opacity-80 bg-white ':'hidden'}>
                <CgSpinner className='animate-spin' />
              </div>
              <div className='flex flex-row  w-full   justify-center items-start  gap-[10px]'>
                <div className='flex  text-xs items-center  sm:text-sm md:text-md gap-[5px]   sm:gap-[1px]'>
                <div className=' text-black font-extrabold  '>{blog.auther}</div>
                <BsPatchCheckFill className='w-[10px] h-[10px] text-sm ' />
                </div>
                  <div className='text-slate-500 w-full text-xs sm:text-sm md:text-md '>
                    {formatDistanceToNow(parseISO(blog.date), { addSuffix: true })}
                  </div>
                </div>
                <div className='w-full text-center '>
                  <h3 className='font-semibold text-black text-center text-sm'>{blog.heading}</h3>
                </div>

                <div className='flex w-full flex-col gap-[10px] sm:flex-row  '>

                  <div className=' overflow-y-scroll lg:w-[2000px] sm:w-[700px] text-center h-[400px] rounded-lg text-sm sm:text-md text-slate-500 border p-2'>{blog.content}</div>
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



                </div>

                <div className='w-full h-auto '>



                  {likecontainer && selectedBlogId === blog._id && (

                    <div className="liked-authors relative h-[200px] w-full border rounded-lg  p-4">
                      <GrFormClose onClick={() => likecontainerhandler(blog._id)} className='absolute hover:cursor-pointer right-2 w-[15px] top-1 h-[15px]' />
                      <h3 className='text-sm'>Liked by:</h3>
                      {!likeconatinerloader ? <div className='flex flex-col  h-auto md:w-[200px] lg:w-[400px] overflow-y-scroll'>
                        {likedAuthors.length > 0 ? likedAuthors.map((author, authorIndex) => (
                          <div className='text-sm text-slate-400' key={authorIndex}>{author}</div>
                        )) : <div className='text-sm'>no likes</div>}

                      </div> :
                       <div className='w-full flex justify-center items-center h-full text-sm'>
                          <CgSpinner className='animate-spin' />
                      </div>}

                    </div>
                  )


                  }





                </div>


                <div className='flex items-center justify-center   gap-[10px]'>
                  <div className='text-black font-semibold text-sm sm:text-md'>Category : </div>
                  <div className='text-slate-500 text-sm sm:text-md'> {blog.category}</div>
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


                <div className='bg-slate-500 w-full h-[1px]'></div>


                <div className={commentBoxOpen[blog._id] ? 'flex absolute bottom-[0px] bg-white w-full left-0 flex-col gap-[5px] h-auto overflow-y-scroll px-4 transition-all    border rounded-lg ' : 'flex absolute bottom-[0px] bg-white w-full left-0 flex-col gap-[5px] h-0 overflow-y-scroll px-4    border rounded-lg transition-all duration-300'}>
                <div className='w-full h-[10px]'></div>
                  <div className='w-full h-[20px] flex justify-center'>
                     
                    <div className='w-[50px] h-[5px] rounded-2xl bg-slate-400'></div>
                  </div>
                  <GrFormClose className='hover:cursor-pointer' onClick={() => commentsectionhandler(blog._id)} />

                  <div className='flex w-full items-start  flex-col'>
                    <form onSubmit={(event) => { addComment(blog._id, event) }} className="comment-section w-[100px]  sm:w-[200px]  text-sm md:w-[300px] flex      lg:w-[450px]   gap-[15px] items-start p-3">
                      <input type="text" name="comment" onChange={handleCommentChange} value={newComment.comment} className=' border-b-2 outline-none ' placeholder='add your comment here ' />
                      <button type="submit" > <AiOutlineSend className='w-[20px] h-[20px] hover:cursor-pointer' /></button>
                    </form>
                    {blogComments[blog._id] && !commentloading ? (
                      blogComments[blog._id].map((comment, commentIndex) => (
                        <div key={commentIndex} className="comment relative ">

                        <div className='flex items-center gap-[5px]'>
                        <p className="text-black text-sm p-3">{comment.autherName ? comment.autherName : 'Unknown Author'}</p>
                          <p className="text-slate-500 text-sm p-3">{comment.comment_body ? comment.comment_body : "this is body "}</p>
                          { user_id===comment.user_id &&
                          <AiOutlineDelete
                            className='w-[20px] h-[20px] hover:cursor-pointer'
                            onClick={() => deletecomment(blog._id, comment._id)}
                          />
                          }

                          <form onSubmit={(event)=>{addReply(blog._id,comment._id,event)}}  className='flex items-center'>
                          <input
  type="text"
  name="reply"
  onChange={(event) => handlereplychange(event, comment._id)}
  value={newreply[comment._id] || ""} // Use newreply[comment._id] for this specific comment
  placeholder="reply here"
  className="outline-none text-xs border-b-2 px-3"
/>


                            <input type="submit" className='cursor-pointer text-xs h-auto w-auto p-1 hover:bg-slate-400 rounded-lg hover:text-white' value="post" />
                          </form>   


                         </div>

                         <div className='text-sm ml-3  p-1  rounded-lg  w-[90px] hover:cursor-pointer hover:text-slate-500 text-slate-400' onClick={()=>{handlereplycontainer(comment._id)}} >view replies</div>

                         { 
                          commentreplies[comment._id] && !replyloader[comment._id] ? (

                            commentreplies[comment._id].map((reply,replyindex)=>(
                              <div key={replyindex} className={showReplies[comment._id]?'flex ml-5 h-auto   flex-col gap-[10px] w-auto  ':'hidden'} >
                                
                                <div className='flex gap-[10px] justify-start items-center'>
                                <div className='text-sm text-slate-500 font-bold'>{reply.autherName}</div>
                                <div className='text-sm text-slate-400'>{reply.body}</div>
                                { reply.user_id===user_id &&
                                  <AiOutlineDelete className='hover:cursor-pointer w-[15px] h-[15px]' onClick={()=>{deletereply(comment._id,reply._id)}} />
                                }
                                
                                </div>
                                
                                

                              </div>
                            ))
                          ):(
                            replyloader[comment._id] ?
                            <div className='w-full h-full flex justify-center items-center'>

                        <div className='text-sm'> loading ...</div>

                      </div>:<div></div>
                          )

                         }
                          <div className='h-[30px] w-full'></div>
                       
                        </div>
                        
                      ))
                    ) : (
                      <div className='w-full h-full flex justify-center items-center'>

                        <div className='text-sm'> loading ...</div>

                      </div>
                    )
                    
                    }

                  </div>

                         </div>
               
              </div>
              
              

            )

            )

            }

          </div>
        )
      ) : (
        <div className='w-screen  h-auto p-5 flex flex-col     justify-center items-center gap-[20px]'>
              
             
              <div className='sm:text-xl  text-slate-400 font-mono'>No blogs to show !</div>

             

            </div>
      )}
    </div>
  )
}

export default ContentPage;
