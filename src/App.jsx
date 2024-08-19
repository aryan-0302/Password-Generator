import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [characterAllowed,setCharacterAllowed]=useState(false)
  const [password,setPassword]=useState("")

  
// useRef hook se koi bhi element ka reference le skte ho web page se uske saath manipulation kr skte ho.
const passwordRef=useRef(null)

// useCallback is a react hook that lets you cache a function definition between re-renders.
// useCallback sirf optimised krne ke liye use kiya hai warna useEffect se bhi ban jata
  const passwordGenerator=useEffect(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(characterAllowed) str+="!@#$%^&*-_+=(){}~`"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,characterAllowed])



  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()  // to show text is selected
    passwordRef.current?.setSelectionRange(0,99); // to select a range
    window.navigator.clipboard.writeText(password)
  },[password])



// useEffect se agar kuch bhi change kiye to change ho rha hai 
  // useEffect(()=>{
  //   passwordGenerator()
  // },[length,characterAllowed,numberAllowed,passwordGenerator])


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-sm rounded-lg px-4 my-8 text-orange-500 bg-gray-700 '>


      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' ref={passwordRef}></input>
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>


      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}></input>
          <label>Length:{length}</label>
        </div>


        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={numberAllowed} id='numberinput' onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }}></input>
            <label htmlFor='numberinput'>Numbers</label>
        </div>


        <div className='flex items-center gap-x-1'>
          <input type='checkbox' defaultChecked={characterAllowed} id='characterinput' onChange={()=>{
            setCharacterAllowed((prev)=>!prev);
          }}></input>
            <label htmlFor='characterinput'>Characters</label>
        </div>
      </div>


    </div>
    </>
  )
}

export default App
