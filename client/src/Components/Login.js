

function Login(){
    return(
        <div className="login">
            <form className="login_form">
                <h3 id="login-title">Login:</h3>
                
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