import React from "react";
import DeviceSelection from "./DeviceSelection";
import DeviceSummary from "./DeviceSummary";

const DeviceDetails = () => {
   return (
      <>
         <div className="containers">
            <img src="/logo.jpg" alt="logo" className="w-[110px] py-5" />
         </div>
         <hr className="border" />
         <div className="containers grid grid-cols-12 ">
            <div className="col-span-8  h-96 ">
               <DeviceSelection />
            </div>
            <div className="col-span-4 border-l-2 pl-6">
               <DeviceSummary />
            </div>
         </div>
         <div className="mt-8">
            <hr className="border mb-6" />
            <div className="mt-4 flex items-center justify-between containers pb-20">
               <div className="">
                  <img src="/logo.jpg" alt="logo" className="h-8" />
                  <p className="text-[15px] mt-2 tracking-tight">© Letzfix 1992-2024. All rights reserved.</p>
               </div>
               <p className="flex gap-2">
                  <span className="">Privacy Policy</span>
                  <span className="">Terms of Use</span>
               </p>
            </div>
         </div>
      </>
   );
};

export default DeviceDetails;
