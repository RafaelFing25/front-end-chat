import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client'
import { UserContext } from '../../contexts/UserContext'

import './Chat.css'



const socket = io('https://mychatback.herokuapp.com/')
socket.on('connect',()=>{
        console.log('conectato ao soket.io')
    })




function Chat() { 
    
    // const ref = useRef(null)
    const [restCaracters, setrestCaracters] = useState(200)
    const [change, setChange] = useState(0)
    const [users, updateUsers] = useState([])
    const [message, setMessage] = useState('')
    const [messages, updateMessages] = useState([])
    const [User, setUser] = useState([])
    const Context = useContext(UserContext)
   
  
    useEffect(()=>{
        
        const user = Context.user
        const MyUser = {
            ...user,
            socketId: socket.id,
        }
        setUser(MyUser)
        socket.emit('userConnect', MyUser)
    },[Context.user])
    
    
    useEffect(() => {
        const handleNewMessage = newMessage =>
            updateMessages([...messages, newMessage])
        socket.on('chat.message', handleNewMessage)
        return () => socket.off('chat.message', handleNewMessage)
    }, [messages])

    function handleInputChange(e) {
        setMessage(e.target.value)

        setrestCaracters(200 - e.target.value.length)
    }
    function censureWords() {
        if (message.trim()) {
            const blockedWords = [
                'fdp', 'vsfd', 'teste', 'Fdp', 'f d p', 'FDP'
            ]
            var newMessage
            newMessage = message
            blockedWords.forEach((value, index) => {
              

                const regExp = new RegExp(`${value}`, 'g')
                
                const censura = '*'.repeat(value.length)
                newMessage = newMessage.replace(regExp, censura)
            })






            socket.emit('chat.message', {
                user: User,
                messageId: socket.id,
                message: newMessage
            })

        }


    }

    function handleFormSubmit(e) {
        e.preventDefault()
        censureWords()
        setrestCaracters(200)
        setMessage('')
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setChange(change + 1)
        }, 3000);
        return () => clearInterval(interval);
    }, [change]);

    useEffect(() => {
        const handleNewMessage = newMessage =>
            updateUsers(newMessage)
        socket.on('onlineUsers', handleNewMessage)
        return () => socket.off('onlineUsers', handleNewMessage)
    }, [change])

 
    useEffect(() => {

        const handleUserDisconnect = users =>
                updateUsers(users)
        socket.on('userdesconect',handleUserDisconnect)
            return () => socket.off('userdesconect', handleUserDisconnect)
        
    },[change,users])

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollTop = 99999999
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [messages]);
    console.log('context' , Context, 'contextUser', Context.user)
    return (
        < div className="chat-all">
        <main className='container' >
            <small className='users'>Ususarios online: {users.length}</small>
            <ul className='list' ref={messagesEndRef}>
                {messages.map((m, i) => (
                    <li className={`list__item list__item--${m.user.socketId === User.socketId ? 'mine' : 'other'}`} key={i}>
                        <span className={`message message--${m.user.socketId ===User.socketId ? 'mine' : 'other'}`}>
                            <small className="username">{m.user.Name}</small>
                            {m.message}
                        </span>
                    </li>
                ))}
            </ul>
            {/* <input
                className="form__field"
                onChange={hanldeUserNameChange}
                placeholder='Seu nome'
                value={userName} /> */}
            <form className="form" onSubmit={handleFormSubmit} >
                <input
                    maxLength='200'
                    className="form__field"
                    onChange={handleInputChange}
                    placeholder="Digite uma mensagem"
                    value={message} />

                <small>voce ainda pode digitar {restCaracters} caracteres</small>

            </form>
        </main>
        <div className="usersname">
        <h1>Usuarios online</h1>
        {users.map((user) => {
            return (
                <>
                <hr/>
            <small className='usersname'> {user.Name} </small>
            </>
            )
        })}
        </div>
        </div>

    )
}

export default Chat;