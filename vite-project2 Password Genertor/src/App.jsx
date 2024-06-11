import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  // State variables

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook for accessing the password input element
  const passwordRef = useRef(null)

  /**
   * Generates a new password based on the current state variables.
   */
  const passwordgenerate = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str += "0123456789"
    if(character) str += "!@#$%^&*()_+-={}[]|:;<>,.?/~`"
     
    for(let i =1;i<=length;i++){
      //pass += str[Math.floor(Math.random()*str.length + 1)] or
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, number, character, setPassword])

  /**
   * Copies the generated password to the clipboard.
   */
  const copyPasswordToClicpboard = useCallback(()=>{
    passwordRef.current.select()                            // Highlight the password input
    passwordRef.current.setSelectionRange(0,10)            // range while copy for ex(0,5) only five char will copy
    window.navigator.clipboard.writeText(password)        //Copy the password to the clipboard

  },[password])

  // Generate a new password whenever the state variables change
  useEffect(()=>{
    passwordgenerate()
  },[length, number, character, passwordgenerate])

  // Render the App component
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-whit text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} />
          <button onClick={copyPasswordToClicpboard} className='outline-none  py-1 px-3 shrink-0 text-white bg-blue-700 hover:bg-orange-600'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={50} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
            <label >Length: {length}</label>
          </div>


          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked ={number} id='numberInput' onChange={() =>{
              setNumber((prev)=>!prev)
            }} />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked ={character} id='characterInput' onChange={() =>{
              setCharacter((prev)=>!prev)
            }} />
            <label htmlFor="characterInput">Character</label>
          </div>


        </div>
      </div>
    </>
  )
}

export default App
