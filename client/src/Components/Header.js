import { useNavigate } from 'react-router-dom'

function Header({isAuthenticated, setCurrentUser, setIsAuthenticated, currentUser}){
    
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
                {!isAuthenticated ? <a className="nav_items" href="/signup">Register</a> : null}


               {currentUser?.bio?.length > 1 ? 
                <>
                <a className='nav_items' href="/book">Book an Appointment</a>
                <a className='nav_items' href="/my_appointments">My Appointments</a>
                </>
                :
                currentUser?.is_admin ?
                <>
                <a className="nav_items" href="/appointments">Schedule</a>
                <a className='nav_items' href="/casefiles">Patient Casefiles</a>
                </>    

                :

                null
                }
                {!isAuthenticated ? <a className="nav_items" href="/login">Login</a>
                 :
                 <a className="nav_items" onClick={handleLogout}>Log out</a>}

            </div>
        </div>
    )
}

export default Header;