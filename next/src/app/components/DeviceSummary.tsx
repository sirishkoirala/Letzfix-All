"use client";
import React, { useEffect, useState } from "react";
import { IconCheck, IconClock12, IconMapPin, IconMessage2 } from "@tabler/icons-react";

const DeviceSummary = () => {
   const [data, setData] = useState<any | null>(null);

   useEffect(() => {
      const damageData = localStorage.getItem("damageData");
      const selectedModel = localStorage.getItem("selectedModel");
      const customerDetails = localStorage.getItem("customerDetails");
      const selectedDevice = localStorage.getItem("selectedDevice");

      const allData = {
         damageData: damageData ? JSON.parse(damageData) : null,
         selectedModel: selectedModel ? selectedModel : null,
         customerDetails: customerDetails ? JSON.parse(customerDetails) : null,
         selectedDevice: selectedDevice ? selectedDevice : null,
      };

      setData(allData);
      // console.log("Stored Data:", allData);
   }, []);

   // console.log("Data in state:", data);

  

   return (
      <>
         <div className="mt-10">
            <div className="max-w-md mx-auto p-4 ">
               <h2 className="text-[20px] leading-[24px] tracking-tight">Summary</h2>
               <div className="flex items-center mt-4">
                  <img alt="Device image" src="https://openui.fly.dev/openui/40x40.svg?text=📱" className="mr-2" />
                  <div>
                     <p className="font-medium">{data ? data.damageData.selectedIssues : "Device Repair"}</p>
                     <p className="text-[14px] text-gray-600">{data ? data.selectedModel : "Phone"}</p>
                  </div>
                  <a href="#" className="ml-auto font- underline underline-offset-2">
                     Change
                  </a>
               </div>
               <hr className="my-4 border-muted mt-6" />
               <h3 className="text-[20px] leading-[24px] tracking-tight mt-6">Visit details</h3>
               <ul className="list-none list-inside flex flex-col gap-4 mt-5 ">
                  <li>
                     <p className="flex gap-4 items-center">
                        <IconMapPin stroke={1.6} size={20} />
                        Store location
                     </p>
                  </li>
                  <li>
                     <p className="flex gap-4 items-center">
                        <IconClock12 stroke={1.6} size={20} />
                        Date and Time
                     </p>
                  </li>
                  <li>
                     <p className="flex gap-4 items-center">
                        <IconMessage2 stroke={1.6} size={20} />
                        Contact Details
                     </p>
                     <div className="ml-9">
                        <p className="text-[15px] text-gray-600">
                           {data ? `${data.customerDetails.firstName} ${data.customerDetails.lastName}` : ""}
                        </p>
                        <p className="text-[14px] text-gray-600">{data ? data.customerDetails.email : ""}</p>
                        <p className="text-[13px] text-gray-600">{data ? data.customerDetails.phone : ""}</p>
                     </div>
                  </li>
               </ul>
               <hr className=" border-muted my-8" />
               <h3 className="text-[20px] leading-[24px] tracking-tight">About our repairs</h3>
               <ul className="list-none list-inside flex flex-col gap-4 mt-5 ">
                  <li>
                     <p className="flex gap-4 items-center">
                        <IconCheck stroke={1.6} size={20} />
                        1-year warranty
                     </p>
                  </li>
                  <li>
                     <p className="flex gap-4 items-center">
                        <IconCheck stroke={1.6} size={20} />
                        Fast turnaround
                     </p>
                  </li>
                  <li>
                     <p className="flex gap-4 items-center">
                        <IconCheck stroke={1.6} size={20} />
                        Free
                     </p>
                  </li>
                  <li>
                     <p className="flex gap-4 items-center">
                        <IconCheck stroke={1.6} size={20} />
                        Price match guarantee
                     </p>
                  </li>
               </ul>
            </div>
         </div>
      </>
   );
};

export default DeviceSummary;
