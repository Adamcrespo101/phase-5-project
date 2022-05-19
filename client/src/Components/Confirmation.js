import { useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


function Confirmation(){
let nav = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            nav('/')
            console.log("You will be redirected in 3 seconds")
        }, 3000);
        
    }, [])



    return(
        <div className="confirmation">
            <h1>Thank you for booking an appointment with us, you will receive an email confirmation shortly!</h1>
            <h2>You will be redirected shortly...</h2>
        </div>
    )
}

export default Confirmation;