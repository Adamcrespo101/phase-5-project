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
import Casefiles from './Components/Casefiles';
import MyAppointments from './Components/MyAppointments';
import Footer from './Components/Footer';

function App() {

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [currentUser, setCurrentUser] = useState(null);
const [userType, setUserType]= useState('Patient')
const [appointments, setAppointments]= useState([])
const [admin, setAdmin]= useState({})
const [patients, setPatients]= useState([])
const [casefiles, setCasefiles]= useState([])
const [editState, setEditState]= useState(true)


function changeEditState(){
  setEditState(prev => !prev)
}
 

useEffect(() => {
  fetch('/appointments')
  .then(res => res.json())
  .then(data => setAppointments(data))
}, [currentUser, editState])


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

useEffect(() => {
  fetch('/find/1')
  .then(res => res.json())
  .then(data => setAdmin(data))
}, [appointments])

useEffect(() => {
  fetch('/casefiles')
  .then(res => res.json())
  .then(data => setCasefiles(data))
},[])


useEffect(() => {
fetch('/patients')
.then(res => res.json())
.then(data => setPatients(data))
}, [])




return (
  <div className="App">
    <BrowserRouter>
    <Header isAuthenticated={isAuthenticated} setCurrentUser={setCurrentUser} setIsAuthenticated={setIsAuthenticated} userType={userType} currentUser={currentUser}/>
    <Routes>
      <Route index element={<Home currentUser={currentUser}/>} path="/"/>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} userType={userType} setUserType={setUserType}/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/services" element={<Services />} />
      <Route path="/appointments" element={<Schedule setEditState={setEditState} editState={editState} changeEditState={changeEditState} patients={patients} admin={admin} appointments={appointments} setAppointments={setAppointments} currentUser={currentUser}/>} />
      <Route path="/book" element={<BookAppointment isAuthenticated={isAuthenticated} currentUser={currentUser} setAppointments={setAppointments} appointments={appointments}/>} />
      <Route path="/confirmation" element={<Confirmation/>} />
      <Route path="/casefiles" element={<Casefiles admin={admin} patients={patients} setPatients={setPatients} casefiles={casefiles} setCasefiles={setCasefiles}/>} />
      <Route path="/my_appointments" element={<MyAppointments currentUser={currentUser} appointments={appointments} setAppointments={setAppointments}/>} />
    </Routes>
    <Footer />
  </BrowserRouter>

    </div>
  );
}

export default App;
