import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../../contexts/UserContext"





// import { Container } from './styles';

function Home() {
  const Context = useContext(UserContext)
  // const [user,setUser] = useState({})
  const [name, setName] = useState('')
  function handleInputChange(e) {
    setName(e.target.value)
  }
  function handleSubmit(){
    const user ={
      id:0,
     Name: name,
  }
    console.log(user)
    Context.saveUser(user)
  }

  return <div> 
      <input 
      type="text"
      placeholder="Seu nome"
      onChange={handleInputChange}
      value={name}
      />
      
      <Link to="/chat">
      <button type='button' onClick={handleSubmit}>Ok</button>
      </Link>
    </div>;
}

export default Home;