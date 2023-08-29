
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

   </Routes>
  
    </div> 


  );
}

export default App;
