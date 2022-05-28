import home1 from '../images/home1.jpg'
import home2 from '../images/home2.jpg'
import home3 from '../images/home3.jpg'
import home4 from '../images/home4.jpg'
import home5 from '../images/home5.jpg'
import home6 from '../images/home6.jpg'
import logo from '../images/Healwell-logos.jpeg'
import { useEffect } from 'react'


function Home({currentUser}){

  



    return (
        <div className="home">
            
                    <img className="home-title" src={logo} alt="logo"/>
                <div class="grid">
                    <div className="img-wrapper">
                    <img className="home-img blur zoom" src={home3} alt="home-image" />
                    <div className="content fade slide-left"><p>Therapy begins at the very first session with sensible goals that are mutually established as part of an alliance between you and your therapist.</p></div>
                    </div>
                    <div className="img-wrapper">
                    <img className="home-img blur zoom" src={home5} alt="home-image" />
                    <div className="content fade slide-up"><p>We are dedicated to helping you move toward the life you want to lead.</p></div>
                    </div>
                    <div className="img-wrapper">
                    <img className="home-img blur zoom" src={home2} alt="home-image" />
                    <div className="content fade slide-right"><p>Our mission is to provide the highest level of expert care to our clients in a comfortable setting.</p></div>
                    </div>
                    <div className="img-wrapper">
                    <img className="home-img blur zoom" src={home1} alt="home-image" />
                    <div className="content fade slide-left"><p>Our goal is to provide clients with tools you can use on your own to cope with intense emotional experiences, stressful situations, and tough interpersonal problems in the future.</p></div>
                    </div>
                    <div className="img-wrapper">
                    <img className="home-img blur zoom" src={home4} alt="home-image" />
                    <div className="content fade slide-down"><p>We understand that finding a therapist who can truly help you move toward your goals can be difficult.</p></div>
                    </div>
                    <div className="img-wrapper">
                    <img className="home-img blur zoom" src={home6} alt="home-image" />
                    <div className="content fade slide-right"><p>We make finding expert, compassionate therapy simple.</p></div>
                    </div>
                </div>
                
        </div>
    )
}

export default Home;