import { useState , useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {

  const [size , setSize]= useState(8);
  const [numAllowed , setNumAllowed]= useState(false);
  const [charAllowed , setCharAllowed]= useState(false);

  const [password , setPassword]= useState('');

  const passwordRef=useRef(null);

  // password generator function

  const passwordGenerator = useCallback(() => {

    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz"

    if(numAllowed){
      str+="1234567890";
    }

    if(charAllowed){
      str+="~!@#$%^&*()?:";
    }

    for(let i=1; i<=size; i++){
      let char=Math.floor(Math.random()* str.length+1)
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed]);


  const copyToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator();
  },[size,numAllowed,charAllowed,passwordGenerator]);
  


  return (
    <>
      <h1 className='text-4xl text-center mt-4 font-medium'>Password Generator</h1>
      <div className='flex justify-center mt-4 rounded-xl'>
        <div className='h-40 w-1/3 border-2 border-sky-500 rounded-xl flex flex-col gap-6  justify-center'>

          <div className='flex justify-center'>
            <input type="text" placeholder='Password' ref={passwordRef} value={password} readOnly className='h-10 w-60 p-3 outline-none text-slate-900' />
            <button className='h-10 w-16 bg-blue-500 outline-none' onClick={copyToClipboard}>Copy</button>
          </div>

          <div className='flex justify-center gap-4 text-xl'>

            <div>
              <input type="range" name="" value={size} onChange={(e)=>{setSize(e.target.value)}} id="length" min={6}  max={16}/>
              <label htmlFor="length" className='p-2'>Length: {size}</label>
            </div>

            <div>
              <input type="checkbox" defaultChecked={charAllowed} onChange={()=>{setCharAllowed((prev) => !prev)}} name="character" id="character" />
              <label htmlFor="character" className='p-2'>Characters</label>
            </div>

            <div>
              <input type="checkbox" defaultChecked={numAllowed} onChange={()=>{setNumAllowed((prev) => !prev)}} id='number' className='' />
              <label htmlFor="number" className='p-2'>Numbers</label>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
