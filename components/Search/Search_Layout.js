import React, { Suspense } from "react";

const Search_logic =React.lazy(()=>import("./Search_logic"))



const   Search_Layout =({children}) =>
{
  
        return (
            <div className="z-10  flex flex-col max-h-fit w-screen  dark:bg-black bg-white absolute " >
        
       
            
        <Search_logic/>


       
          
      
          
        <main className=" z-20 relative flex flex-col max-h-fit w-screen dark:bg-black bg-white  " >
        
            {children}
            
            
        </main> 
    
      
        </div> )
    
}
export default Search_Layout