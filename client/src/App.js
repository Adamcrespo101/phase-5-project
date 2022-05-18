import './App.css';
import 'devextreme/dist/css/dx.light.css';
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Schedule from './Components/Schedule'
import Services from './Components/Services'
import BookAppointment from './Components/BookAppointment';

function App() {
//DONT FORGET TO UNCOMMENT LIVE CHAT FEATURE IN HTML FILE
//npm i --save @devexpress/dx-react-core @devexpress/dx-react-scheduler --prefix client RUN THIS ON MY LAPTOP 
//npm i --save @devexpress/dx-react-scheduler-material-ui --prefix client RUN THIS ON MY LAPTOP 
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [currentUser, setCurrentUser] = useState(null);


useEffect(() => {
  fetch('/me')
  .then((res) => {
    if (res.ok) {
      res.json()
      .then((user) => {
        setIsAuthenticated(false);
        setCurrentUser(user);
        
      });
    }
  });
}, []);

  
  
  return (
    <div className="App">
    <BrowserRouter>
    <Header isAuthenticated={isAuthenticated} setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route index element={<Home />} path="/"/>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser}/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/appointments" element={<Schedule />} />
      <Route path="/services" element={<Services />} />
      <Route path="/book" element={<BookAppointment/>} />
    </Routes>
  </BrowserRouter>

    </div>
  );
}

export default App;
