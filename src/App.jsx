import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [character, setCharacter] = useState(false)
  const [number, setNumber] = useState(false)
  const [password, setPassword] = useState("");


  const passwordRef = useRef(null)

  const copyPasswordToclipBoard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator= useCallback(()=>{

    let pass=""
    let str = 'ABCDEFGHIJKLMNOPQRSTUBVWXYZabcdefghijklmnopqrstuvwxyz'

    if(character) str+="!@#$%^&*()`~?:;,.'" 
    if(number)  str+="123456789"


    for(let i=0;i<length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char) 

    }


    setPassword(pass)

  },[length,character,number,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[passwordGenerator,character,number,length])  

  return (
    <>
     <div className='w-full max-w-md mx-auto  shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
     <h1 className='text-center text-xl text-white'> password generator </h1>

     <div className='flex shadow rounded-lg py-2 overflow-hidden mb-4 '>
      <input type='text' value={password}   className="outline-none w-full py-1 px-3" ref={passwordRef} placeholder="password" readOnly/> 
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ' onClick={copyPasswordToclipBoard}> copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <input onChange={(e)=>{setLength(e.target.value)}} type='range' min={6} max={100} className='cursor-pointer'/>
      <label> length:({length})</label>
     <div className='flex items-center gap-x-1'>
      <input type='checkbox' defaultChecked={number}  id='numberInput' onChange={()=>{setNumber((prev)=>!prev)}}/>
      <label htmlFor='numberInput'>Number</label>
     </div>
     <div className='flex items-center gap-x-1'>
      <input type='checkbox' defaultChecked={character} id='characterInput' onChange={()=>{setCharacter((prev)=>!prev)}}/>
      <label htmlFor='characterInput'>Characters</label>
     </div>
     </div>
     </div>
    </>
  )
}

export default App
