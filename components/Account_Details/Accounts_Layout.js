import React, { Suspense } from "react";

const Accounts =React.lazy(()=>import("./Accounts"))


const   Accounts_Layout =({children}) =>
{
  
        return (
            <div className="z-10  flex flex-col max-h-fit w-screen  dark:bg-black bg-white absolute " >
      
       
            
         <Accounts/>


        
       
          
      
          
        <main className=" z-20 relative flex flex-col max-h-fit w-screen dark:bg-black bg-white  " >
        
            {children}
            
            
        </main> 

      
        </div> )
    
}
export default Accounts_Layout