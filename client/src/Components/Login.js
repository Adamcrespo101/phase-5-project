import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/Healwell-logos.jpeg'
import Footer from './Footer'

function Login({setIsAuthenticated, setCurrentUser, userType, setUserType, currentUser}){
    let navigate = useNavigate()
const [errors, setErrors]= useState('')
    // useEffect(() => {
//   fetch('/me')
//   .then((res) => {
//     if (res.ok) {
//       res.json()
//       .then((user) => {
//         setIsAuthenticated(false);
//         setCurrentUser(user);
        
//       });
//     }
//   });
// }, []);


  function userLogin(){
    if (userType === "Patient") {
      fetch('/auth')
      .then((res) => {
        if (res.ok) {
          res.json()
          .then((user) => {
            setIsAuthenticated(false);
            setCurrentUser(user);
            
          });
        }
      });
    } else {
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
    }
  } 

    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      // const handleSubmit = (event) => {
      //   event.preventDefault();
      //   fetch(userType === "Admin" ? `/login` : `/patient/login`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(formData),
      //   }).then((res) => {
      //     if (currentUser?.first_name.length > 1) {
      //       res.json().then((user) => {
            
      //           setCurrentUser(user);
      //           setIsAuthenticated(true)
      //           navigate('/')
      //       })
      //     } else {
      //       res.json().then((errors) => {
      //         console.log("errors here")
      //         setErrors(errors);
      //         setCurrentUser(null);
      //         setIsAuthenticated(false)
      //         navigate('/login')
      //       });
      //     }
      //   });
      // };
      console.log(userType)
      const handleSubmit = (event) => {
        event.preventDefault();
        fetch(userType === "Admin" ? `/login` : `/patient/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }).then((res) => {
          res.json().then((user) => {   
            if (1 < user?.email?.length) {
                console.log(user)
                setCurrentUser(user);
                setIsAuthenticated(true)
                setUserType('Patient')
                navigate('/')
            } else {
                  console.log(user)
                  setErrors("Invalid Username or Password");
                  setCurrentUser(null);
                  setIsAuthenticated(false)
                  setUserType('Patient')
                  navigate('/login')
                  setFormData({
                    email: '',
                    password: ''
                  })
                }
            })
      });
};
    
      function handleUser(e){
        setUserType(e.target.value)
      }

      console.log(currentUser)
      
    return(
      <>
          <img src={logo} alt="login-logo" className='login-logo'/>
        <div className="login">
            <form className="login_form" onSubmit={handleSubmit}>
                <h3 id="login-title">Login:</h3>
                
                <label className="login-inputs">
                Email: 
                <br></br>
                <input className="login-inputs" type="text" placeholder="Enter a valid email address.." name="email" value={formData.email} onChange={handleChange} required/>
                </label>
                <br></br>
                <label className="login-inputs">
                Password:
                <br></br> 
                <input className="login-inputs" type="password" placeholder="Enter password..." value={formData.password} name="password" onChange={handleChange} required/>
                </label>
                <br></br>
                <label className="login-inputs"> User Type:
                <select className="login-inputs" onChange={handleUser}>
                    <option value="Patient" >Patient</option>
                    <option value="Admin" >Admin</option>
                </select>
                </label>
                <br></br>
                <a className='login-inputs' href='/signup'>Need an account? Click here to register.</a>
                <br></br>
                <button type="submit" className="login-inputs">Log in </button>
                <p className='errors'>{errors !== '' ? `${errors}` : null}</p>
            </form>
        </div>
            <Footer />
        </>
    )
}

export default Login;