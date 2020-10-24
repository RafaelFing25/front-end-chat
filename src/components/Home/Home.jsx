import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { NameContext } from "../../contexts/NameContext"

// import { Container } from './styles';

function Home() {
  const Context = useContext(NameContext)
  const [name,setName] = useState('')
  function handleInputChange(e) {
    setName(e.target.value)
  }
  function handleSubmit(){
    Context.saveName(name)
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