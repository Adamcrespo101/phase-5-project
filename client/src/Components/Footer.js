import {useState} from 'react'


function Footer(){

    const [openMessages, setOpenMessages]= useState(false)

    console.log(openMessages)
    return(
        <div className="footer">
            <p>If you need assistance send a message to our admins at any time by clicking this button <button className="help" onClick={() => setOpenMessages(!openMessages)}>Help</button></p>
            <div className={!openMessages ? "hide-chat" : "chat-box transition"}>
                <div className='chat-box-header'>Support Chat<p className='header-text' onClick={() => setOpenMessages(false)}>[x]</p></div>
                <form className='chat-inputs'>
                    <input type="text" />
                    <button>+</button>
                </form>
            </div>
        </div>
    )
}

export default Footer;