import intake from '../Intakeform.pdf'

function Signup(){
    return(
        <div className="signup">
            <h3 className='signup-title'>Register a new patient:</h3>
                <div className="info-container">
                <label className="login-inputs">
                First Name: 
                <br></br>
                <input className="login-inputs" type="text" placeholder="First name..." required/>
                </label>
                <br></br>
                <label className="login-inputs">
                Last name: 
                <br></br>
                <input className="login-inputs" type="text" placeholder="Last name..." required/>
                </label>
                <br></br>
                <label className="login-inputs">
                Email: 
                <br></br>
                <input className="login-inputs" type="text" placeholder="Enter a valid email address.." required/>
                </label>
                <br></br>
                <label className="login-inputs">
                Password: 
                <br></br>
                <input className="login-inputs" type="password" placeholder="Enter password..." required/>
                </label>
                <br></br>
                <label className="login-inputs">
                Confirm Password:
                <br></br> 
                <input className="login-inputs" type="password" placeholder="Enter password..." required/>
                </label>
                <br></br>
                <label className="login-inputs">
                Date of Birth:
                <br></br> 
                <input className="login-inputs" type="text" placeholder="YYYY/MM/DD" required/>
                </label>
                <br></br>
                </div>
                <label className="login-inputs">
                Describe yourself:
                <br></br> 
                <textarea className="login-inputs bio-box" type="text" placeholder="Describe yourself and what type of services you may need in atleast 300 characters to assist us in providing the best care possible." required/>
                </label>
                <br></br>
                <a href={intake} download className="login-inputs">**First time patients must fill out this form and bring it with them to their first appointment!**</a>
                <br></br>
                <button type="submit" className="login-inputs">Register</button>
                
        </div>
    )
}

export default Signup;