import logo from '../images/Healwell-logos.jpeg'
import services1 from '../images/services1.jpg'
import services2 from '../images/services 2.jpg'
import services3 from '../images/services3.jpg'
import services4 from '../images/services4.jpg'

function Services(){
// This component is going to display all of the information about the services that the practice offers 
//includes some facts and information about each of the different kinds of therapy 




    return(
        <div className="services">
            <img className="home-title" src={logo} alt="logo"/>
            <img className='services-1' src={services1} alt="your-feelings-matter" />
            <div className='anxiety-info'>
                <p><strong>Anxiety and Panic Reduction:</strong> Constantly anxious? Do you experience panic attacks? Learn how to implement effective techniques that help to reduce anxiety and panic, increase your control.</p>
                <p><strong>Bereavement Therapy:</strong> Grieving the loss of a loved one? We offer specific services for effective coping, and techniques for moving forward.</p>
            </div>
            <img className='services-2' src={services2} alt="therapy-in-session" />
            <div className='depression-info'>
                <p><strong>Depression Allevation:</strong> Experiencing depression, hopelessness, or despair? We can help you learn how to view life in a more positive manner through proven techniques to improve your mood.</p>
                <p><strong>Career and Vocational Counseling:</strong> Are you dissatisfied with work and want to make a change? Our vocational counseling services can you establish goals and assist you in achieving them.</p>
            </div>
            <img className='services-3' src={services3} alt="children" />
            <div className='child-care-info'>
                <p><strong>Child and Adolescent Services:</strong> Many adolescent issues can be similar to those affecting adults, but many are age-specific and unique to their stage of development.</p>
                <p><strong>Marital, Relationship and Family Problems:</strong> Need help improving your relationship? Individuals, couples or families can use this service to help identify problem areas and how to communicate more effectively.</p>
            </div>
            <img className='services-4' src={services4} alt="surgical-recovery" />
            <div className='surgical-info'>
                <p><strong>Pre- and Post-Surgical Counseling:</strong> Research has shown that both pre and post-surgical counseling, can help individuals emotionally as well as having a positive impact on their physical health/surgical outcome.</p>
                <p><strong>Telephone and Video Sessions:</strong> With COVID-19 and other barriers that may keep you from visiting in-person, it's imperative you can still receive the help you need. We offer telephone and video sessions as a viable alternative.</p>
            </div>
        </div>
    )
}

export default Services;