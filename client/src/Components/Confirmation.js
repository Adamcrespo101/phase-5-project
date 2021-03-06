import { useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


function Confirmation(){
let nav = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            nav('/my_appointments')
            console.log("You will be redirected in 3 seconds")
        }, 3000);
        
    }, [nav])



    return(
        <div className="confirmation" style={{color: 'white'}}>
            <h1>Thank you for booking an appointment with us, you will receive an email confirmation shortly!</h1>
            <h2>Your being redirected to your appointments...</h2>
        </div>
    )
}

export default Confirmation;