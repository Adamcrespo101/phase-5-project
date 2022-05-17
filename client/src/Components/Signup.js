import intake from '../Intakeform.pdf'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(){
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        date_of_birth: '',
        bio: ''
    })

    function handleSignUp(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        const userCreds = { ...formData }; 
        fetch(`/patients`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCreds),
        }).then((res) => {
          if (res.ok) {
            res.json().then((user) => {
              console.log(user)
             // setCurrentUser(user);
              navigate('/login')
            });
          } else {
            res.json().then((errors) => {
              console.error(errors);
            });
          }
        });
      }

      



    return(
        <div className="signup">
            <h3 className='signup-title'>Register a new patient:</h3>
                <form onSubmit={handleSubmit}>
                <div className="info-container">
                <label className="login-inputs">
                First Name: 
                <br></br>
                <input className="login-inputs" type="text" name="first_name" placeholder="First name..." onChange={handleSignUp} value={formData.first_name} required/>
                </label>
                <br></br>
                <label className="login-inputs">
                Last name: 
                <br></br>
                <input className="login-inputs" type="text" name="last_name" placeholder="Last name..." onChange={handleSignUp} value={formData.last_name} required/>
                </label>
                <br></br>
                <label className="login-inputs">
                Email: 
                <br></br>
                <input className="login-inputs" type="text" name="email" placeholder="Enter a valid email address.." onChange={handleSignUp} value={formData.email} required/>
                </label>
                <br></br>
                <label className="login-inputs">
                Password: 
                <br></br>
                <input className="login-inputs" type="password" name='password' placeholder="Enter password..." onChange={handleSignUp} value={formData.password} required/>
                </label>
                <br></br>
                <label className="login-inputs">
                Confirm Password:
                <br></br> 
                <input className="login-inputs" type="password" name="confirm_password" placeholder="Enter password..." required/>
                </label>
                <br></br>
                <label className="login-inputs">
                Date of Birth:
                <br></br> 
                <input className="login-inputs" type="text" name="date_of_birth" placeholder="YYYY/MM/DD" onChange={handleSignUp} value={formData.date_of_birth} required/>
                </label>
                <br></br>
                </div>
                <label className="login-inputs">
                Describe yourself:
                <br></br> 
                <textarea className="login-inputs bio-box" type="text" name="bio" onChange={handleSignUp} value={formData.bio} placeholder="Describe yourself and what type of services you may need in atleast 300 characters to assist us in providing the best care possible." required/>
                </label>
                <br></br>
                <a href={intake} download className="login-inputs">**First time patients must fill out this form and bring it with them to their first appointment!**</a>
                <br></br>
                <button type="submit" className="login-inputs">Register</button>
                </form>
        </div>
    )
}

export default Signup;