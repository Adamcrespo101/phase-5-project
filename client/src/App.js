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
import Confirmation from './Components/Confirmation';

function App() {
//DONT FORGET TO UNCOMMENT LIVE CHAT FEATURE IN HTML FILE
//npm i --save @devexpress/dx-react-core @devexpress/dx-react-scheduler --prefix client RUN THIS ON MY LAPTOP 
//npm i --save @devexpress/dx-react-scheduler-material-ui --prefix client RUN THIS ON MY LAPTOP 
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
const [userType, setUserType]= useState('Patient')
const [appointments, setAppointments]= useState([])

useEffect(() => {
  fetch('/appointments')
  .then(res => res.json())
  .then(data => setAppointments(data))
}, [])

// function userLogin(){
//   if (userType === "Patient") {
//     fetch('/auth')
//     .then((res) => {
//       if (res.ok) {
//         res.json()
//         .then((user) => {
//           setIsAuthenticated(false);
//           setCurrentUser(user);
          
//         });
//       }
//     });
//   } else {
//     fetch('/me')
//     .then((res) => {
//       if (res.ok) {
//         res.json()
//         .then((user) => {
//           setIsAuthenticated(false);
//           setCurrentUser(user);
          
//         });
//       }
//     });
//   }
// } 
useEffect(() => {
  fetch('/me')
  .then((res) => {
    if (res.ok) {
      res.json()
      .then((user) => {
        setIsAuthenticated(true);
        setCurrentUser(user);
        console.log(user)
      });
    }
  });
}, []);

useEffect(() => {
  fetch('/auth')
  .then((res) => {
    if (res.ok) {
      res.json()
      .then((user) => {
        setIsAuthenticated(true);
        setCurrentUser(user);
        console.log(user)
      });
    }
  });
}, []);


  console.log(userType)
  
  return (
    <div className="App">
    <BrowserRouter>
    <Header isAuthenticated={isAuthenticated} setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route index element={<Home currentUser={currentUser}/>} path="/"/>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} userType={userType} setUserType={setUserType}/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/services" element={<Services />} />
      <Route path="/appointments" element={<Schedule />} />
      <Route path="/book" element={<BookAppointment currentUser={currentUser} setAppointments={setAppointments} appointments={appointments}/>} />
      <Route path="/confirmation" element={<Confirmation/>} />
      
    </Routes>
  </BrowserRouter>

    </div>
  );
}

export default App;
