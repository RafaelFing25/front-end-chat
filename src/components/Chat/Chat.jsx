import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'

import './Chat.css'
import uuid from 'uuid'


const socket = io('https://mychatback.herokuapp.com/')
socket.on('connect', () => {
    console.log(socket.id)
    //socket.emit()
})




function Chat() {
    // const ref = useRef(null)
    const [restCaracters, setrestCaracters] = useState(200)
    const [change, setChange] = useState(0)
    const [users, updateUsers] = useState(0)
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')
    const [messages, updateMessages] = useState([])

    const id = uuid()
    
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
                'fdp', 'vsfd', 'teste'
            ]
            var newMessage
            newMessage = message
            blockedWords.forEach((value, index) => {
              

                const regExp = new RegExp(`${value}`, 'g')
                
                const censura = '*'.repeat(value.length)
                newMessage = newMessage.replace(regExp, censura)
                console.log(newMessage)
            })






            socket.emit('chat.message', {
                userName: userName,
                id: socket.id,
                idU: id,
                message: newMessage
            })

        }


    }

    function handleFormSubmit(e) {
        e.preventDefault()
        censureWords()

        setMessage('')
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setChange(change + 1)
        }, 3000);
        return () => clearInterval(interval);
    }, [change]);



    useEffect(() => {
        console.log('ola')
        socket.on('userdesconect', users => {
            updateUsers(users)
        })
        socket.on('onlineUsers', users => {
            updateUsers(users)
            console.log(users)
            return socket.off('onlineUsers', (users) => {
                updateUsers(users)
            })
        })
    }, [change])
    function hanldeUserNameChange(e) {
        setUserName(e.target.value)
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        console.log('scroll')
        messagesEndRef.current.scrollTop = 99999999
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    return (
        <main className='container' >
            <small className='users'>Ususarios online: {users}</small>
            <ul className='list' ref={messagesEndRef}>
                {messages.map((m, i) => (
                    <li className={`list__item list__item--${m.idU === id ? 'mine' : 'other'}`} key={i}>
                        <span className={`message message--${m.idU === id ? 'mine' : 'other'}`}>
                            <small className="username">{m.userName}</small>
                            {m.message}
                        </span>
                    </li>
                ))}
            </ul>
            <input
                className="form__field"
                onChange={hanldeUserNameChange}
                placeholder='Seu nome'
                value={userName} />
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
    )
}

export default Chat;