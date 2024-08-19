import { IconCheck, IconClock12, IconMapPin, IconMessage2 } from "@tabler/icons-react";
import React from "react";

const DeviceSummary = () => {
   return (
      <>
         <div className="mt-10">
            <div className="max-w-md mx-auto p-4 ">
               <h2 className="text-[20px] leading-[24px] tracking-tight">Summary</h2>
               <div className="flex items-center mt-4">
                  <img alt="Device image" src="https://openui.fly.dev/openui/40x40.svg?text=📱" className="mr-2" />
                  <div>
                     <p className="font-medium">Device repair</p>
                     <p className="text-[14px] text-gray-600">Phone</p>
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
                     Free{" "}
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
