"use client"; 

import { IconChevronRight } from "@tabler/icons-react";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { Tsmartphones } from "../types/Tsmartphones";
import { usePhones } from "../hooks/usePhones";
import { useRouter } from "next/navigation";

const AnySmartphonesNewOrOld = () => {
   const router = useRouter(); 
   const { Smartphones, isLoading, isError } = usePhones();

   if (isLoading)
      return (
         <div className="containers">
            <Skeleton count={12} />
         </div>
      );

   if (isError) return <div>Error...</div>;

   const handleClick = (deviceUrl: string) => {
      router.push(deviceUrl); 
   };

   return (
      <>
         <div className="containers">
            <div className="flex flex-col gap-12 justify-center items-center mt-8 pt-12">
               <h1 className="text-[40px] leading-[46px] font-light tracking-tight text-center">
                  We can fix any Smartphone—new or old
               </h1>
               <p className="text-[20px] leading-[30px] font-light text-center">
                  No matter your Smartphone model, our experts can help you get back up and running fast.
               </p>

               <div className="grid grid-cols-4 gap-8 mt-4">
                  {Smartphones.map((smartphone: Tsmartphones) => {
                     return (
                        <div
                           key={smartphone.id}
                           className="col-span-1 flex flex-col gap-4 justify-center items-center cursor-pointer"
                           onClick={() => handleClick(smartphone.url)}
                        >
                           <img src={smartphone.image} alt="" className="h-36" />
                           <div className="flex items-center justify-center">
                              <p className="text-[15px] font-light leading-[26px] hover:underline-offset-2 hover:underline">
                                 {smartphone.name}
                              </p>
                              <IconChevronRight stroke={1.6} size={18} color="teal" />
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </>
   );
};

export default AnySmartphonesNewOrOld;
