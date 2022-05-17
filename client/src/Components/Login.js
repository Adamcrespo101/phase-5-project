import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Login({setIsAuthenticated, setCurrentUser}){
    let navigate = useNavigate()
    
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
        fetch("/login", {
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
                navigate('/home')
                console.log(user)
            });
          } else {
            res.json().then((errors) => {
              console.error(errors);
            });
          }
        });
      };
    

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
                <select className="login-inputs">
                    <option>Admin</option>
                    <option>Patient</option>
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