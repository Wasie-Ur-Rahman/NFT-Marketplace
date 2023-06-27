import React, { Children } from 'react'
import Discover_Loading from '../components/Dynamic_Pages_Layout/Discover_Loading'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import Load_mint_success from '../components/Loading_Minting/Load_mint_success'
import Load_mint from '../components/Loading_Minting/Load_mint'
import { useState, useEffect } from 'react';
export default function check() 
{
    const [count, setCount] = useState(1);
       const alph = 1
  useEffect(() => {
  
      setCount((count) => count + 1);
     // Increment count every 1 second

     // Cleanup the interval on component unmount
  }, [alph]);

  return (
    <div>


return <h1>Count: {count-1}</h1>;
{/* {Load_mint()} */}
<Footer/>
{/* <Navbar/> */}
{/* <div className='flex flex-row w-screen h-[58rem] justify-center items-center dark:bg-black bg-white'>
<div class="flex w-full max-w-sm h-fit overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div class="flex items-center justify-center w-12 bg-emerald-500">
        <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
    </div>

    <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
            <span class="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
            <p class="text-sm text-gray-600 dark:text-gray-200">Your account was registered!</p>
        </div>
    </div>
</div>
        
    </div> */}
 {/* <Discover_Loading/> */}
 


    </div>
  )
}
