import React from 'react'
import DarkModeButton from '../DarkModeButton';
import { useEffect } from "react";
import { useState } from "react";
import { firestore } from '../../lib/firebase';
import { useCookies } from 'react-cookie'
import { Cardv1 } from '../Cards/cardv1';
import Footer from '../Footer/Footer';
// import Loader from '../components/loader/loader';
import Discover_Loading from '../Dynamic_Pages_Layout/Discover_Loading';
import { useRouter } from 'next/router';
import Link from 'next/link';


let address;
function Search_logic() {
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(['user']);
    const [search, setSearch] = useState('');
    const [tempdata, setTempdata] = useState([]);
    const options = ['From A to Z', 'From Z to A', 'Price: High to Low', 'Price: low to high'];
    const route = useRouter()
    const [open, SetOpen] = useState("false");



    async function click() {
        // add code to disconnect the wallet
        SetOpen(false)

    }
    const routes = () => {
        route.push("/GoogleAuth")
    }

    const discover = () => {
        route.push("/Discover")
    }

    const home = () => {
        route.push("/home")
    }
    useEffect(() => {
        async function Nftlogic() {
            setLoading(true)
            if (typeof window !== 'undefined') {
                if (cookies.user != undefined) {
                    const array = []
                    firestore.collection('NFTS').where('owner',"!=",cookies.user)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                array.push({ docid: doc.id, ...doc.data() })
                            })
                        }).then(() => {
                            setData(array)
                            setTempdata(array)
                            setLoading(false)
                        })

                }
            }
        }
        Nftlogic();
    }, [])

    useEffect(() => {

        async function Clicker() {
            if (typeof window !== 'undefined') {

                if (cookies.user != undefined) {
                    SetOpen(true)
                    const str = cookies.user
                    address = str.substring(0, 9)
                    address = address + '.....'
                }
                else {
                    SetOpen(false)
                }
            }
            // SetOpen(!open)
        }
        Clicker()
    }, [open])



    const searchProducts = (e) => {
        var searchedProducts = data.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
        setTempdata(searchedProducts);
    };



    return (
        (loading) ? (<Discover_Loading />) :
            (
                <>
       
   
       
       <div className='dark:bg-black lg:w-[1279px] md:w-[1242px]   sm:w-[1242px] xs:w-[1242px] xss:w-[1242px]  xl:w-screen 2xl:w-screen max-h-fit xs:h-[3000px] sm:h-[3000px] md:h-[3000px]  xl:h-[3000px]  lg:h-[3000px]  bg-white h-max   px-30 justify-center'>
      
     
       <div className='flex flex-col dark:bg-black bg-white '>
                    <div className='h-[4.5rem]  dark:bg-black flex bg-white lg:w-[1279px] w-max  xl:w-screen 2xl:w-screen border dark:border-gray-900 border-gray-200  relative   '>
                        <div className='flex w-44 flex-row justify-end '>
                            <button className=' flex flex-row text-2xl font-bold text-transparent   bg-gradient-to-r from-fuchsia-500 via-violet-400 to-emerald-500 bg-clip-text   items-center' onClick={home}>
                                NFTVERSE
                            </button>
                        </div>
                        <div className='text-white lg:mx-4  w-[700px]  flex flex-col justify-center items-end '>
                            <div className=' text-white  flex flex-col w-[500px] h-[35px]  dark:bg-[#070707] bg-[#ffffff] rounded-xl border border-gray-200 dark:border-gray-800 dark:hover:border-gray-900 hover:border-gray-400'>

                                <svg class=" -my-1 mx-3 w-6 h-11  dark:text-white text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                {/* input Feild */}
                                <input class=" flex  text-sm mx-12 -my-9 h-[33px] w-[450px] text-gray-600 dark:text-white dark:bg-black bg-white  rounded-2xl border border-transparent outline-none  placeholder:text-gray-600 dark:placeholder:text-white placeholder:text-start items-center justify-start "
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        searchProducts();
                                        if (e.target.value === "") {
                                            setTempdata(data);
                                        }
                                    }}
                                    placeholder='Search by Collection , NFT or User'
                                />
                                {/* input Feild end */}
                            </div>
                        </div>
                        <div className='flex flex-row  justify-evenly items-center w-3/5 lg:-ml-4   '>
                            <button className=" w-20  h-[30px] items-center justify-center bg-transparent dark:text-white text-gray-600 font-secondary text-base hover:font-bold hover:animate-pulse" onClick={home}>Home</button>
                            <button className=" w-20  h-[30px] items-center justify-center bg-transparent dark:text-white text-gray-600 font-secondary text-base hover:font-bold hover:animate-pulse" onClick={discover}>Discover</button>
                            {open === false ? (

                                <button className="  w-28 h-[30px]  dark:bg-gray-900 dark:border-gray-800  border-2 items-center justify-center rounded-xl  dark:text-white  bg-[#000000] text-white border-gray-400 text-sm font-secondary hover:animate-pulse " onClick={routes}>Connect</button>
                            ) :

                                (
                                    // <button className="  w-28 h-[30px]  dark:bg-gray-900 dark:border-gray-800  border-2 items-center justify-center rounded-xl  dark:text-white  bg-[#000000] text-white border-gray-400 text-sm font-secondary hover:animate-pulse placeholder:text-white" onClick={click} >{address}</button>
                                    <div className="dropdown dropdown-bottom ">
                                        <button tabIndex={0} className="  w-28 h-[30px]  dark:bg-gray-900 dark:border-gray-800  border-2 items-center justify-center rounded-xl  dark:text-white  bg-[#000000] text-white border-gray-400 text-sm font-secondary  placeholder:text-white">{address}</button>
                                        <ul tabIndex={0} className="dropdown-content menu p-1   rounded-box w-28 dark:bg-slate-900 bg-[#000000] ">
                                            <li><Link className=' dark:bg-gray-900 dark:border-gray-800    dark:text-white  bg-[#000000]  text-white  border border-gray-800 hover:animate-pulse text-sm' href='/accounts_detail'>Account</Link></li>
                                            <li><Link className=' dark:bg-gray-900 dark:border-gray-800    dark:text-white  bg-[#000000]  text-white  border border-gray-800 hover:animate-pulse text-sm' href='/mint'>Mint</Link></li>
                                            <li><Link className="dark:bg-gray-900 dark:border-gray-800   dark:text-white  bg-[#000000]  text-white border border-gray-800  hover:animate-pulse text-sm" href='/UserNft'>Nfts</Link></li>
                                            <li><div className="dark:bg-gray-900 dark:border-gray-800   dark:text-white  bg-[#000000]  text-white border border-gray-800  hover:animate-pulse text-sm" onClick={click}>Disconnect</div></li>
                                        </ul>
                                    </div>
                                )
                            }
                           
                            <DarkModeButton />
                        </div>
                    </div>
                </div>


         <div className='p-1 flex flex-wrap items-center justify-center space-x-1 space-y-1  dark:bg-black bg-white '>
           <div className='grid gap-4 gird-cols-4 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 xs:space-y-60 sm:space-y-60 md:space-y-60 lg:space-y-60 xl:space-y-60 2xl: space-y-10 dark:bg-black bg-white'>
           {tempdata.map((data , index) => (
                                <div className="" key={data.id}>
                                      {
                                    (index===0 )? ( <div className='mt-60 2xl:mt-10'>
                                    <Cardv1 link={`/buy_nft/${data.docid}`} image={data.file} edition={'1'} name={data.name} eth={data.price} price={data.price * 12} type={data.type} />
 </div>): (  <Cardv1 link={`/buy_nft/${data.docid}`} image={data.file} edition={'1'} name={data.name} eth={data.price} price={data.price * 12}  type={data.type
}/>)
}
                                </div>
                                      
                            ))}

           </div>
         </div>
       </div>
       <div className='dark:bg-black  lg:w-[1279px] md:w-[1242px] 2xl:h-[495px]   sm:w-[1242px] xs:w-[1242px] xss:w-[1242px]  flex flex-col justify-end xl:w-screen 2xl:w-screen max  bg-white'>
         <br/>
         <Footer/>
       </div>
     </>
           
            )

    )
}

export default Search_logic