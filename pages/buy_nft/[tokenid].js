
import React, { useRef } from "react";
import Web3 from "web3";
import { useEffect } from "react";
import { useState } from "react";
import { firestore } from "../../lib/firebase";
import Navbar from "../../components/Navbar/Navbar";
import countapi, { set } from 'countapi-js'
import { tradingAbi, tradingAddress } from "../../contracts/tradingInfo/info";
import { useRouter } from "next/router";

import Discover_Loading from "../../components/Dynamic_Pages_Layout/Discover_Loading";
import Load_mint from "../../components/Loading_Minting/Load_mint";
import { useCookies } from "react-cookie";
import { Cardv1 } from "../../components/Cards/cardv1";

import axios from 'axios'
const Buy = ({ token }) => {

  const [cookies1, setCookie] = useCookies(['ip']);
  const [cookies] = useCookies(["user"]);
  const [data, setData] = useState({});
  const [price, setPrice] = useState("");
  const [ac, setAc] = useState("")
  const [ti, setTi] = useState("")
  const[open,setOpen]=useState(undefined)
  const router = useRouter();
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
const [count1 , setCount1]= useState(0)
const [count2 ,setCount2]=useState(0)
const [check ,setCheck]=useState(1)
const [like,setLikes]=useState({})
const [similar, setSimilar] = useState([])
let type = ''
let owner = ''
let tokenids = ''
function change()
{

  read()
  if(click===true && count2<1)
  {
    
    setCount2(count2+1)
  let counter = Number(like.likes);
  console.log("counter",counter)
  counter = counter + 1
    firestore.collection("NFTS").doc(`${token.tokenid}`).update({
likes : counter,

  }


    )
    setCheck(check-1)
    read()
}
  else if(check===0 && count2>=1)
  {
    read()
    setCount2(count2-1)
    console.log("count2",count2)
    let counter = Number(like.likes);
    counter = counter - 1
    firestore.collection("NFTS").doc(`${token.tokenid}`).update({
likes : counter,
  })
  setCheck(check+1)
 
  }
  setClick(!click)

}
const [click , setClick]=useState(false)
//   const [ip, setIP] = useState("");

//   //creating function to load ip address from the API
//   // const getData = async () => {
//   //   const res = await axios.get('https://geolocation-db.com/json/')
//   //   console.log(res.data);
//   //   setIP(res.data.IPv4)
//   // }

//   // Updated Code

//   const getData = async () => {
//     const res = await axios.get("https://api.ipify.org/?format=json");
//     console.log(res.data.ip);
//     setIP(res.data.ip);
    
//     setCookie('address', res.data.ip);
//     console.log(cookies1)

// data1()

 
  
    
//   };

//   useEffect(() => {
//     //passing getData method to the lifecycle method
//     setCount1(count1+1)
//     getData();
    
//   }, []);
  
//   function data1()
//   {
//     console.log("dsdsadsa",count1)
//     firestore.collection("Views").doc(`${token.tokenid}`).set({
//       counter  :  count1
//     })
//   }
  


  


//   // countapi.visits().then((result) => {
//   //   console.log(result.value);
// });
  const Handle_Price = (e) => {
    e.preventDefault();
    if (e != undefined) {
      (setPrice(e.target.value));
    }
  }
  // let alpha
  useEffect(() => {
    async function Nftlogic() {
      if (typeof window !== 'undefined') {
        setLoading(true)
        const token_idd = token.tokenid
        setTi(token_idd)
        setAc(cookies.user)
        const folder_data = await firestore.collection('NFTS').doc(`${token_idd}`).get().then((folder_data)=>{
          const display = folder_data.data();
          console.log(display)
          type = display.type
          owner = display.owner
          setData(display)
          setHistory(display.history)
          setLoading(false)
        });
        const array = []
        const similarynfts = await firestore.collection('NFTS').where("type", "==", type).where('owner', '==', owner).limit(5).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              array.push({ docid: doc.id, ...doc.data() })
          })
      }).then(() => {
          setSimilar(array)
          console.log("simi ",array)
      })
      }

    }
    Nftlogic();
    
  }, [])

async function read()
{
  const folder_data = await firestore.collection('NFTS').doc(`${token.tokenid}`).get().then((folder_data)=>{
    const display = folder_data.data();
    console.log(display)
    setLikes(display)
    console.log("likes",like)
  });




}


  const BuyNft = async () => {
    setLoading(true)
    console.log(data)
    const appendHistory = data.history
    console.log(appendHistory)
    if (typeof window !== 'undefined') {

      const web3 = new Web3(window?.ethereum);
      const accounts = await web3.eth.getAccounts();
      const MarketContract = new web3.eth.Contract(tradingAbi, tradingAddress);
      const pr = data.price
      const wei = web3.utils.toWei(pr.toString(), "ether")
      console.log(wei)
      MarketContract.methods.buyItem(data.newItemid).send({ from: accounts[0], value: wei })
        .then((result) => {
          console.log(result)
          appendHistory.push({
            "event": "Buy",
            "time": new Date().toLocaleString(),
            "tx": result.transactionHash,
          })
          const ref = firestore.collection('metamask').doc(`${cookies.user}`).collection("mynfts").doc();
          ref.set({
            name: data.name,
            description: data.description,
            type: data.type,
            file: data.file,
            metametadata: data.metametadata,
            tx: result.transactionHash,
            tokenid: data.tokenid,
            event: "Buy",
            gasused: result.gasUsed,
            owner: result.from,
            to: result.to,
            block: result.blockNumber,
            history: appendHistory,
            price: pr
          }).then((res) => {
            firestore.collection('NFTS').doc(`${token.tokenid}`).delete().then((res) => {
              console.log(res)
              setLoading(false)
             setOpen(true)
            }).catch((error) => {
              setOpen(false)
              console.log(error) })

          }).catch((error) => {
            console.log(error)
          })
        }).catch((error) => { console.log(error) })
    }
  }




  // convert eth to wei 

  return (

(loading) ? (<Discover_Loading/>) :
  ( 
    
    (open===true)?(<Load_mint Text={"Nft Bought"} src={"/accept.png"}/>) :(open===false) ?(<Load_mint Text={"Nft Buying Failed"} src={"/delete.png"}/>) :
    
    <div className="flex flex-col   lg:w-[1279px] md:w-[1242px]   sm:w-[1242px] xs:w-[1242px] xss:w-[1242px]  xl:w-screen 2xl:w-screen max-h-fit xs:h-[3000px] sm:h-[3000px] md:h-[3000px]  xl:h-[3000px]  lg:h-[3000px] dark:bg-black bg-white" >

      <Navbar />

      <div className="flex flex-col h-auto w-full dark:bg-black  bg-white items-center xs:mt-[600px] sm:mt-[600px] md:mt-[600px] lg:mt-[600px] xl:mt-[600px]  " >
        <div className="flex flex-row h-[32rem] w-2/3  mt-10 justify-evenly">
          <div className="flex h-full w-2/5 dark:border-gray-600 border-gray-200 ">
          {data.type === 'Video' ? (
                    < video controls src={data.file} className="h-full w-full rounded-3xl"></video>
                  ) : (data.type=== 'Art'|| data.type==='Gif') ? (<img src={data.file} className="h-full w-full rounded-3xl"></img>) : (data.type==='Music')? (< video controls src={data.file} className="h-full w-full rounded-3xl"></video>) :(null)}
           
          </div>
          <div className="flex flex-col h-full w-2/5 dark:border-gray-600 border-gray-200 items-start space-y-3">
            <span className="font-bold text-2xl dark:text-white text-gray-600">{data.name}</span>
            <span className="font-semibold text-lg dark:text-white text-gray-600">{data.type}</span>
            <label className="font-semibold text-lg dark:text-white text-gray-600">Price :</label>
            <span className="font-semibold text-lg dark:text-white text-gray-600">{data.price}</span>
            <label className="font-semibold text-lg dark:text-white text-gray-600">Wallet id :</label>
            <span className="font-semibold text-lg dark:text-white text-gray-600">{data.owner}</span>
            <div>
                      
            <div className="w-28 h-24 -mt-[5px] justify-center items-center flex flex-row  z-50" >

{/* 
{
  click===true ?( 
    <div className="space-x-16 flex flex-row ">
  <button onClick={change}  ><svg width="24" height="24"fill="#da0707"    xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/></svg></button>
  <span className="font-semibold text-xl dark:text-white text-gray-600  ">{like.likes}</span></div> )
 
  :
  (
    <div className="space-x-16 flex flex-row ">
    <button onClick={change} >
    <svg fill="#000000" width="24" height="24" viewBox="0 -30 645 645" xmlns="http://www.w3.org/2000/svg"><path d="M297.297 550.868c-13.774-15.437-48.17-45.529-76.435-66.874-83.744-63.242-95.142-72.395-129.144-103.703-62.684-57.721-89.305-115.71-89.213-194.34.044-38.384 2.66-53.172 13.409-75.797C34.152 71.768 61.015 43.245 95.36 25.799c24.326-12.355 36.323-17.845 76.945-18.07 42.493-.235 51.438 4.72 76.435 18.452 30.424 16.714 61.739 52.436 68.213 77.811l3.998 15.672 9.859-21.584c55.716-121.973 233.599-120.148 295.502 3.031 19.638 39.076 21.794 122.513 4.381 169.513-22.716 61.309-65.38 108.05-164.007 179.676-64.681 46.974-137.885 118.046-142.98 128.028-5.916 11.589-.283 1.817-26.409-27.46z" fill="red"/></svg></button> 
    <span className="font-semibold text-xl dark:text-white text-gray-600 ">{like.likes}</span>
    </div>
  )
} */}
                     
                     
                       
                      </div>

</div>
    
        
            <button className=' flex h-[3.3rem] w-40 rounded-2xl dark:bg-white dark:text-black    bg-black  text-white hover:text-black hover:dark:text-white hover:dark:bg-slate-900 hover:bg-gray-900 justify-center items-center  font-medium' type="submit" onClick={BuyNft}>Buy</button>
       
      
      
         
          </div>
        </div>
        <div >

          <div className="flex flex-row w-[30rem] justify-end  dark:text-white text-gray-600 text-lg font-bold my-10">
         
          <label>History of Nft </label>


          </div>



          <div class="flex flex-col my-16 ">
  <div class="-m-1.5 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="border rounded-lg overflow-hidden dark:border-gray-900 border-gray-200 shadow-md dark:shadow-gray-900 shadow-gray-600 ">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
      <tr className="flex flex-row  items-center">
         
              <th class="px-7 py-3 text-left text-xs font-medium text-gray-600 uppercase">Event</th>
             
             
              <th  class="px-20 text-left text-xs font-medium text-gray-600 uppercase">Time</th>
             
              <th class=" px-64 py-3 text-left text-xs font-medium text-gray-600 uppercase">Link</th>
           
              </tr>
              
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-900">
            <tr>
      
                            {history.map((history,index) => (
                           
                             
<div key={index}> 
<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{history.event}</td>
<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{history.time}</td>
<td><a class="text-blue-500 hover:text-blue-700" href={`https://goerli.etherscan.io/tx/${history.tx}`}>{history.tx}</a></td>
                                  
                                    </div>
                             
                            ))}
                          

            </tr>

          
         
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<h1 className="text-3xl text-white font-bold p-4 text-center">Similary Nfts  </h1>
                <div className="flex flex-wrap">
                  {similar.length === 0 ? <>
                  </> : <>
                    {similar.map((similar, index) => (
                      <div key={index}>
                        {similar.tokenid === data.tokenid ? (<div></div>) : (<div>
                          <Cardv1 link={`/buy_nft/${similar.docid}`} image={similar.file} edition={'1'} name={similar.name} eth={similar.price} price={similar.price * 12} type={similar.type} />
                        </div>)}
                      </div>
                    ))}
                  </>}
                </div >

        </div>
      </div>
    </div>
  )

  )

}

export default Buy



export async function getServerSideProps({ params: token }) {

  console.log(token)
  return {
    props: { token },
  }
}