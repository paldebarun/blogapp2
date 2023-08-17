import React, { useState } from 'react'
import Heading from '../components/Heading';
import Leftsidebar from '../components/Leftsidebar';
import Bottombar from '../components/Bottombar';
import RightSideBar from '../components/RightSideBar';
const Home = () => {

  const [dark,setDark]=useState(false);




  return (
    <div className='flex flex-col overflow-y-hidden w-screen'>
      {/* the upperost heading */}
      <div><Heading dark={dark} setDark={setDark} /></div>
      {/* sidebars */}
      <div className='sidebars flex flex-row justify-between'>
      <div><Leftsidebar dark={dark}/></div>
      <div><RightSideBar dark={dark}/></div>
      </div>
      

     <div className='fixed bottom-0'><Bottombar dark={dark}/></div>
    </div>
  )
}

export default Home;
