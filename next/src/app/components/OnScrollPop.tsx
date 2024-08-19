import React from "react";

const OnScrollPop = () => {
   return (
      <>
         <div className=" bg-teal-600 text-white">
            <div className=" p-4 flex justify-center gap-4 items-center containers">
               <span className="text-lg">
                  Fast repairs? Check. Price match guarantee? Check. 4.9 Google-star rating? Check.
               </span>
               <button className="bg-white text-teal-600 rounded-lg px-5 py-2 hover:bg-zinc-200">
                  Schedule a repair
               </button>
            </div>
         </div>
      </>
   );
};

export default OnScrollPop;
