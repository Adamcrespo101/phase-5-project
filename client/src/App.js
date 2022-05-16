import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Components/Header'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Appointments from './Components/Appointments'
import Services from './Components/Services'

function App() {
//DONT FORGET TO UNCOMMENT LIVE CHAT FEATURE IN HTML FILE




  return (
    <div className="App">
    <Header />
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />} path="/home"/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/book_appointment" element={<Appointments />} />
      <Route path="services" element={<Services />} />
    </Routes>
  </BrowserRouter>

    </div>
  );
}

export default App;
