// import React from "react";

// import MintingLogic from "./MintingLogic";
// const MintLayout = ({ children }) => {

//     return (
//         <div className="z-10 relative flex flex-col max-h-fit  " >

//          <MintingLogic/>

//             <main className=" z-20 relative flex flex-col max-h-fit w-screen" >

//                 {children}


//             </main>


//         </div>)

// }
// export default MintLayout
import React from "react";

import MintingLogic from "./MintingLogic";
const MintLayout = ({ children }) => {

    return (
        <div className="" >

         <MintingLogic/>

            <main className=" " >

                {children}


            </main>


        </div>)

}
export default MintLayout