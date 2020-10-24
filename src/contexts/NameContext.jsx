import React, { useState, createContext } from 'react'

export const NameContext = createContext()


 const NameProvider = ( {children}) => {
  const [name , setName] = useState('')
    function saveName(name){
       setName(name)
    }

  return (
    <NameContext.Provider value={{name, saveName}}>
      {children}
    </NameContext.Provider>
  )
 }

 export default NameProvider;