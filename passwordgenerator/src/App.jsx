import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [buttonClicked, setButtonClicked] = useState(false);
  const [password, setPassword] = useState("")

  //useRef Hook
  const passwordRef = useRef(null)

  const passswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%^&*?|~[]{}+_-`<>"


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 64);
    window.navigator.clipboard.writeText(password)

    setButtonClicked(true);

    setTimeout(() => {
      setButtonClicked(false);
    }, 1000);
  }, [password])

  useEffect(() => {
    passswordGenerator()
  }, [length, numberAllowed, charAllowed, passswordGenerator])

  return (
    <>
      <div className='bg-[url(/bg.jpg)] bg-center bg-cover z-0 h-screen md:px-0 px-7 flex justify-center items-center'>
        <div className='w-full h-fit max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
          <h1 className='text-white text-center text-3xl my-5 md:my-3'>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input
              type="text"
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='Password'
              readOnly
              ref={passwordRef}
            />
            <button
              className={`outline-none ${buttonClicked ? 'bg-green-500' : 'bg-blue-700'} text-white px-3 py-0.5 shrink-0`}
              onClick={() => copyPasswordToClipboard()}
            >Copy</button>
          </div>

          <div className='flex text-sm flex-col md:flex-row md:gap-y-0 gap-y-3 gap-x-2'>
            <div className='flex items-centre gap-x-1'>
              <input
                type="range"
                min={8}
                max={64}
                value={length}
                className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label>Length: {length}</label>
            </div>

            <div className='felx items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={() => { setNumberAllowed((prev) => !prev) }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id='characterInput'
                onChange={() => { setCharAllowed((prev) => !prev) }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
