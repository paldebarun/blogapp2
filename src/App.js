
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home  from './pages/Home'
import Onboarding from './pages/Onboarding'
function App() {


  return (
    <div >
   <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/onboarding' element={<Onboarding/>}/>
     

   </Routes>
  
    </div> 


  );
}

export default App;
