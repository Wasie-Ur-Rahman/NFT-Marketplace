// import React, { Suspense } from "react";

// const Home_logic =React.lazy(()=>import("./Home_Logic"))

 
// const   Home_Layout =({children}) =>
// {
  
//         return (
//             <div className="z-10  flex flex-col max-h-fit w-screen   dark:bg-black bg-white absolute " >
    
            
//          <Home_logic/>


   
       
          
      
          
//         <main className=" z-20 relative flex flex-col max-h-fit w-screen dark:bg-black bg-white  " >
        
//             {children}
            
            
//         </main> 
    
      
//         </div> )
    
// }
// export default Home_Layout
import React, { Suspense } from "react";

const Home_logic =React.lazy(()=>import("./Home_Logic"))

 
const   Home_Layout =({children}) =>
{
  
        return (
            <div className="overflow-x-hidden" >
                
         <Home_logic/>
       
        <main className="  " >
        
            {children}
            
            
        </main> 
    
      
        </div> )
    
}
export default Home_Layout