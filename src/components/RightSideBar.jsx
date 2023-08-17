import React from 'react'

const RightSideBar = ({dark}) => {
  return (
    <div className={dark?'hidden lg:flex h-screen bg-black w-[300px] flex-col justify-between p-3':'hidden lg:flex h-screen bg-white w-[300px] flex-col justify-between p-3 border-solid border-2 border-gray-300 hover:border-dashed'}>
      
      <div className={dark?'text-white':'text-black'}>Suggested Blogs</div>
      {/* <div> suggested blogs section  </div> */}

      <div className={dark?'text-white':'text-black'}>suggested Authers</div>
      {/* <div>suggested suthers sections</div> */}

    </div>
  )
}

export default RightSideBar;
