// import React, { Suspense } from "react";

// const Discover_logic =React.lazy(()=>import("./Discover_logic"))


// const  Discover_Layout =({children}) =>
// {
  
//         return (
//             <div className="z-10 relative flex flex-col max-h-fit  dark:bg-black bg-white " >
     
        
            
//         <Discover_logic/>


       
          
      
          
//         <main className=" z-20 relative flex flex-col max-h-fit w-screen  " >
        
//             {children}
            
            
//         </main> 
    
    
      
//         </div> )
    
// }
// export default Discover_Layout
import React, { Suspense } from "react";

const Discover_logic =React.lazy(()=>import("./Discover_logic"))


const  Discover_Layout =({children}) =>
{
  
        return (
            <div className=" " >
     
        
            
        <Discover_logic/>


       
          
      
          
        <main className="  " >
        
            {children}
            
            
        </main> 
    
    
      
        </div> )
    
}
export default Discover_Layout