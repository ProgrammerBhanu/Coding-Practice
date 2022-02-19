// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Navbar from "./components/navbar.jsx";
import Home from "./HomePage/home";
import {Admin} from "./AdminPanel/Admin";
import Form from "./components/input";
import Station from "./components/Station";

function App() {
  return (
    <div className="App">

     <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/addcity" element={<Form/>}/>
        <Route path="/admin/addstation" element={<Station/>}/>
        <Route path="*" element={<div>Page not found!!!</div>}/>
     </Routes>
    
    </div>
  );
}

export default App;
