import {useState, useEffect} from 'react'


function Footer({currentUser}){
    const [openMessages, setOpenMessages]= useState(false)
    const [messages, setMessages]= useState([])
    const [chatInput, setChatInput]=useState({
        patient_id: currentUser?.id,
        admin_id: 1,
        message: ''
    })

    useEffect(() => {
        fetch(`/chatrooms`)
        .then(res => res.json())
        .then(data => setMessages(data))
    },[currentUser])

    const myMessages = messages.filter((message) => message.patient_id === currentUser.id)

    console.log(myMessages)

    function handleChat(e){
    const  newMessage = {
            patient_id: currentUser?.id,
            admin_id: 1,
            message: currentUser?.first_name + ':' + ' ' + chatInput.message
        }
        e.preventDefault()
        fetch('/chatrooms', {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setMessages([...messages, newMessage])
            setChatInput({
                patient_id: '',
                admin_id: '',
                message: ''
            })
        })
    }

    function handleMessageChange(e){
        setChatInput({...chatInput, [e.target.name]: e.target.value});
    }


    return(
        <div className="footer">
            <p>If you need assistance send a message to our admins at any time by clicking this button <button className="help" onClick={() => setOpenMessages(!openMessages)}>Help</button></p>
            {openMessages ? <div className={"chat-box transition"}>
                <div className='chat-box-header'>Support Chat<p className='header-text' onClick={() => setOpenMessages(false)}>[x]</p></div>
                 <div className='chat-body'>

                 <ul>
                     {messages.map((message) => {
                         return <p>{message.message}</p>
                        })}
                    </ul>   
                </div>
                <form className='chat-inputs' onSubmit={handleChat}>
                    <input type="text" name="message" value={chatInput.message} onChange={handleMessageChange} />
                    <button type='submit'>+</button>
                </form>
            </div> : 
            
            null }
        </div>
    )
}

export default Footer;