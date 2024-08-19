import React from "react";

const CompaniesInRepair = () => {
   return (
      <>
         <div className="containers">
            <div className="grid md:grid-cols-4 h-24 bg-gray-300">
               <div className="text-[16px] leading-[24px] font-light flex items-center ml-6 tracking-tight" >We’re trusted by some of the world’s most popular brands.</div>
               <div className="flex items-center justify-center">
                  <img src="/companiesInRepairs/google.png" alt="" />
               </div>
               <div className="flex items-center justify-center">
                  <img src="/companiesInRepairs/apple.png" alt="" />
               </div>
               <div className="flex items-center justify-center">
                  <img src="/companiesInRepairs/samsung.png" alt="" />
               </div>
            </div>
         </div>
      </>
   );
};

export default CompaniesInRepair;
