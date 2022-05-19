import { useNavigate } from 'react-router-dom'

function Header({isAuthenticated, setCurrentUser, setIsAuthenticated}){
    
    let navigate = useNavigate();

    const handleLogout = () => {
        fetch('/logout', {method: "DELETE"})
        .then(res => {
              if (res.ok) {
                  navigate('/login')
                }
                setCurrentUser(null)
                setIsAuthenticated(false)
            })
      }


    return(
        <div className="header">
            <div>
                <a className="nav_items" href="/">Home</a>
                <a className="nav_items" href="/services">Services</a>
                <a className="nav_items" href="/appointments">Schedule</a>
                <a className="nav_items" href="/signup">Register</a>
                <a className='nav_items' href="/book">Book an Appointment</a>
                {isAuthenticated ? <a className="nav_items" href="/login">Login</a>
                 :
                 <a className="nav_items" onClick={handleLogout}>Log out</a>}

            </div>
        </div>
    )
}

export default Header;