import React from "react";

const YourTechFixed = () => {
   return (
      <>
         <div
            className="w-full h-[600px] flex items-center justify-center mt-16 bg-no-repeat bg-cover"
            style={{ backgroundImage: `url('/yourTechFix.webp')` }}
         >
            <div className="bg-white h-[275px] w-[900px]">
               <div className="flex flex-col items-center justify-center h-full">
                  <h1 className="text-[40px] leading-[46px] font-light text-center tracking-tighter">
                     Your Tech. Fixed.
                  </h1>
                  <p className="text-[20px] leading-[30px] font-light mt-4 text-center px-20">
                     When you need a repair, we’ll have you back up and running in as little as 45 minutes. Schedule
                     your appointment or visit a store today.
                  </p>
                  <button className=" text-[16px] leading-[24px] font-normal px-6 py-1 text-teal-700 border-2 border-teal-700 mt-5 rounded-full">
                     Start a repair
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default YourTechFixed;
