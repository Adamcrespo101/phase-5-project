

function Login(){
    return(
        <div className="login">
            <form className="login_form">
                <h3 id="login-title">Login:</h3>
                
                <label className="login-inputs">
                Email: 
                <input className="login-inputs" type="text" placeholder="Enter a valid email address.."/>
                </label>
                <br></br>
                <label className="login-inputs">
                Password: 
                <input className="login-inputs" type="password" placeholder="Enter password..."/>
                </label>
                <br></br>
                <label className="login-inputs"> User Type:
                <select className="login-inputs">
                    <option>Therapist</option>
                    <option>Patient</option>
                </select>
                </label>
                
                <button type="submit" className="login-inputs">Log in</button>
            </form>
        </div>
    )
}

export default Login;