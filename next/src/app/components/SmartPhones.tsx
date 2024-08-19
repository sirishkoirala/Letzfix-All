"use client";
import React from "react";
import { Tsmartphones } from "../types/Tsmartphones";
import { useSmartphones } from "../hooks/useSmartphones";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";

const SmartPhones = () => {
   const router = useRouter();
   const { smartPhones, isLoading, isError } = useSmartphones();
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
         <div className="containers flex flex-wrap gap-4   px-36  mb-[20px]">
            {smartPhones?.map((device: Tsmartphones) => {
               return (
                  <div
                     key={device.id}
                     className="flex flex-col justify-center w-[240px] "
                     onClick={() => handleClick(device.url)}
                  >
                     <img src={device.image} alt="" className="  object-contain" />
                     <h2 className=" text-[17px] leading-[24px] font-light text-teal-900 text-center cursor-pointer">
                        {device.name}
                     </h2>
                  </div>
               );
            })}
         </div>
      </>
   );
};

export default SmartPhones;
