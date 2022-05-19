import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Login({setIsAuthenticated, setCurrentUser, userType, setUserType}){
    let navigate = useNavigate()

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

      const handleSubmit = (event) => {
        event.preventDefault();
        fetch(userType === "Admin" ? `/login` : `/patient/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }).then((res) => {
          if (res.ok) {
            res.json().then((user) => {
                setCurrentUser(user);
                setIsAuthenticated(true)
                navigate('/')
                console.log(user)
            });
          } else {
            res.json().then((errors) => {
              console.error(errors);
            });
          }
        });
      };
    
      function handleUser(e){
        setUserType(e.target.value)
      }

    return(
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
                <button type="submit" className="login-inputs">Log in</button>
            </form>
        </div>
    )
}

export default Login;