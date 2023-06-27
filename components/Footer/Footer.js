import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    
    <div>
    <div className='h-[12rem]   dark:bg-black flex flex-col bg-white  lg:w-[1279px] md:w-[1242px]   sm:w-[1242px] xs:w-[1242px] xss:w-[1242px]  xl:w-screen 2xl:w-screen border dark:border-gray-900 border-gray-200  absolute   '>

<div className='flex flex-row h-4/5  dark:bg-black bg-white  border border-gray-200 dark:border-gray-900 justify-center items-center '>

    <div className='flex h-5/6 flex-row w-full  justify-around '>
    <div className='flex flex-col h-full w-1/4 justify-center items-start space-y-2 '> 
<button className=' flex flex-row text-lg font-bold text-transparent   bg-gradient-to-r from-fuchsia-500 via-violet-400 to-emerald-500 bg-clip-text   items-center'>
       NFTVERSE
   </button>
<p className='flex flex-col dark:text-white text-gray-600 font-normal '>Fuel the rise of Digital Pakistan. </p>


</div>
<div className='flex flex-col h-full w-1/4  justify-center items-start space-y-2 '> 
<p className='flex flex-col  dark:text-white text-gray-600 text-lg font-semibold' >About Us </p>
<a className='flex flex-col  dark:text-white text-gray-600 font-normal' href='/About_Us'>About</a>
<a className='flex flex-col dark:text-white text-gray-600 font-normal' href='/Terms_Service'>Terms of Service </a>

</div>
<div className='flex flex-col h-full w-1/4  justify-center items-start space-y-2 '> 

<p className='flex flex-col  dark:text-white text-gray-600 text-lg font-semibold ' >Contact Us </p>
 <a className='flex flex-col dark:text-white text-gray-600 font-normal' href="mailto:wasieurrahman24@gmail.com">Email info@nftverse.com</a>
<a className='flex flex-col dark:text-white text-gray-600 font-normal' href='/policies'>Policies </a>


</div>


    </div>
</div>
<div className='flex flex-row h-1/5 w-full dark:bg-black bg-white  justify-center items-center dark:text-white text-gray-600 font-normal '>© Copyright NFTVERSE. All Rights Reserved</div>
    </div>
    </div>
  )
}
