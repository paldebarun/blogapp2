
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home  from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Editbio from './pages/Editbio';
import SuccessSignupPage from './pages/SuccessSignupPage';
import ErrorLoginPage from './pages/ErrorLoginPage';
import Basepage from './pages/Basepage'
import CreateBlog from './pages/CreateBlog';
import Userblogs from './pages/Userblogs';
import Otpage from './pages/Otpage';
import Otpexpirepage from './pages/Otpexpirepage';
import Otpgeneratepage from './pages/Otpgeneratepage';
import Unsuccessfullsignup from './pages/Unsuccessfullsignup';

function App() {


  return (
    <div >
   <Routes>
   <Route path='/' element={<Basepage/>}/>
     <Route path='/home' element={<Home/>}/>
     <Route path='/login' element={<LoginPage/>}/>
     <Route path='/signup' element={<SignupPage/>}/>
     <Route path='/dashboard' element={<Dashboard/>}/>
     <Route path='/editbio' element={<Editbio/>}/>
     <Route path="/success" element={<SuccessSignupPage/>} />
     <Route path="/errorlogin" element={<ErrorLoginPage/>} />
     <Route path='/add' element={<CreateBlog/>}/>
     <Route path='/userblogs' element={<Userblogs/>}/>
     <Route path='/otp-page' element={<Otpage/>}/>
     <Route path='/otp-expired' element={<Otpexpirepage/>}/>
     <Route path='/otp-generate' element={<Otpgeneratepage/>}/>
     <Route path="/unsuccessful_signup" element={<Unsuccessfullsignup/>} />

   </Routes>
  
    </div> 


  );
}

export default App;
