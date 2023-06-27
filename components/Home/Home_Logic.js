import React from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { firestore } from '../../lib/firebase';
import { useCookies } from 'react-cookie'
import { useEffect } from "react";
import { useState } from "react";
import { CardUser } from '../Cards/Card';
import Discover_Loading from '../Dynamic_Pages_Layout/Discover_Loading';
import { useRouter } from 'next/router'



function Home_Logic() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(['user']);
    const router = useRouter()




    useEffect(() => {

        async function Nftlogic() {
            setLoading(true)
            if (typeof window !== 'undefined') {
                if (cookies.user != undefined) {
                    const array = []
                    firestore.collection('NFTS').orderBy('newItemid','desc').limit(4).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            array.push({ docid: doc.id, ...doc.data() })
                        })
                    }).then(() => {
                        setData(array)
                        console.log(array, "unique")
                        setLoading(false)
                    })
                   
                }
            }
        }
        Nftlogic();

    }, [cookies.user])


    return (

        (loading) ? (<Discover_Loading/>) :
         (
           
                <div className=' lg:w-[1279px] md:w-[1242px]   sm:w-[1242px] xs:w-[1242px]  xss:w-[1242px] xs:h-[3000px] sm:h-[3000px] md:h-[3000px]  xl:h-[3000px]  lg:h-[3000px]  xl:w-screen 2xl:w-screen max-h-fit dark:bg-black bg-white relative flex flex-col justify-evenly '>
                    <div className='dark:bg-black bg-white xs:-mt-[330px] sm:-mt-[330px] md:-mt-80 lg:-mt-80 xl:-mt-[335px]'>
                        <Navbar />
                    </div>
                   

                    {/* HOMEPAGE */}
                    <div className='rounded-lg  w-[95%] mx-auto h-3/5 xs:h-[600px] xs:mt-10 sm:h-[600px] xl:h-[600px] xl:mt-10 sm:mt-10 md:h-[600px] md:mt-10 lg:h-[600px] lg:mt-10 flex flex-row border border-opacity-20 justify-between dark:border-gray-900 border-gray-200 px-12 py-10 shadow-md dark:shadow-gray-900 shadow-gray-600'>
                        <div className='flex flex-col justify-start my-auto px-32 xs:space-y-10 '>
                            <p className='text-6xl font-bold dark:text-white text-gray-600 '>0% fees</p>
                            <div className='flex flex-col'>
                                <p className='text-lg font-semibold dark:text-white text-gray-600'>on aggregated listings + High rewards for</p>
                                <p className='text-lg font-semibold dark:text-white text-gray-600'>trading NFTs from collections YOU choose.</p>
                            </div>
                        </div>
                        <div className='flex flex-row px-32  '>
                            <img src='./profile.png' alt='p' />
                        </div>

                    </div>

<div className='dark:bg-black bg-white'>
    <br/>
    <br/>
</div>
                    <div className='xs:-mt-20 sm:-mt-20 md:-mt-20 lg:-mt-20  xl:-mt-20 rounded-lg shadow-md w-[95%]  space-y-8 mx-auto pt-10 h-4/5 flex xs:h-[600px] sm:h-[600px] md:h-[600px] lg:h-[600px] xl:h-[600px] flex-row border border-opacity-20  dark:shadow-gray-900 shadow-gray-600  dark:border-gray-900 border-gray-200 dark:bg-black bg-white'>
                        <div className='flex flex-col justify-start my-auto w-full px-8 dark:text-white text-gray-600 xs:-mt-10 sm:-mt-10 md:-mt-10  lg:-mt-10 xl:-mt-10  z-50  '>
                            <p className='text-4xl font-bold'>Create NFT`s</p>
                            <p className='text-4xl font-bold'>for Your</p>
                            <p className='text-4xl font-bold'>Community</p>
                            <div className=' flex flex-row text-md items-center'>

                                <p>Powered by</p> <p className='font-bold text-transparent   bg-gradient-to-r from-fuchsia-500 via-violet-400 to-emerald-500 bg-clip-text px-2'>NFTVERSE</p>
                            </div>

                            <button className="btn btn-outline w-1/3 mt-2 dark:bg-white bg-black border-gray-800 dark:text-black dark:hover:text-white  dark:hover:bg-gray-900 hover:text-black text-white hover:bg-gray-900" onClick={(e) => { router.push('/mint') }} >create</button>
                        </div>

                        <div className=' flex flex-row  ml-[25rem] space-x-1 w-full  xs:-ml-[15rem] sm:-ml-[15rem]   p-10 md:-ml-[15rem] lg:-ml-[15rem] xl:-ml-[10rem] 2xl:-ml-[1rem] dark:bg-black bg-white  xs:-mt-20 sm:-mt-20  justify-end items-end    '>
                            {data.map((data) => (
                                <div key={data.id}  >
                                    <CardUser link={`/buy_nft/${data.docid}`} image={data.file} edition={'1'} name={data.name} eth={data.price} price={data.price * 12} type={data.type} />
                                </div>
                            ))}
                        </div>
                     
                    </div >
                 <div className='mt-10'> 
                    <Footer/>
                    </div>
                </div>
           
        )
    )
}

export default Home_Logic