"use client";
import { IconArrowNarrowRight, IconChevronDown } from "@tabler/icons-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStores } from "./../hooks/useStores";
import Skeleton from "react-loading-skeleton";

interface Tlocation {
   city: string;
   address1: string;
}

const DeliverySelection = () => {
   const [searchTerm, setSearchTerm] = useState<string>("");
   const { locations = [], isLoading, isError } = useStores();
   console.log(locations)
   if (isLoading)
      return (
         <div className="containers">
            <Skeleton count={8} />
         </div>
      );

   if (isError) return <div>Failed to load devices</div>;

   const router = useRouter();

   const filteredlocation = (locations || []).filter((location: Tlocation) => {
      return location.city && location.city.toLowerCase().includes(searchTerm.toLowerCase());
   });

   const handleCityClick = (location: Tlocation) => {
      // console.log(city);
      localStorage.setItem("selectedCity", JSON.stringify(location));
      router.push("/repairs/appointment-time");
   };

   return (
      <div className="pt-14 overflow-y-auto">
         <div className="h-[620px]">
            <h1 className="text-[38px] leading-[48px] font-light">Find a nearby store</h1>
            <div className="mt-5 mr-14">
               <div className="relative inline-block w-full">
                  <input
                     type="text"
                     className="block appearance-none w-full bg-background border-2 text-black py-5 px-4 pr-8 rounded-lg leading-tight focus:outline focus:bg-white focus:border-black hover:border-black"
                     placeholder="Enter your location to find a store near you."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <div className="text-[28px] font-light flex items-center mt-6 mb-2">
                  <p>Stores</p>
                  <div className="mt-1">
                     <IconArrowNarrowRight size={28} />
                  </div>
               </div>
               <div className="pb-20">
                  {filteredlocation.length > 0 ? (
                     filteredlocation.map((location: Tlocation, index: number) => (
                        <div
                           className="flex items-center justify-between mt-3 appearance-none w-full bg-background border-2 text-black py-3 px-4 pr-8 rounded-lg leading-tight focus:outline focus:bg-white hover:border-black cursor-pointer"
                           key={index}
                           onClick={() => handleCityClick(location)}
                        >
                           <div>
                              <div className="flex items-center gap-2 mt-2">
                                 <p className="h-4 w-4 bg-teal-700 rounded-full text-white text-[14px]">
                                    &nbsp;{index + 1}
                                 </p>
                                 <p className="text-[26px] leading-[29px] font-light tracking-tight">{location.city}</p>
                              </div>
                              <p className="text-[14px] leading-[17px] text-gray-500 mt-2">{location.address1}</p>
                              <div className="flex gap-4 mt-2">
                                 <p className="text-[14px] leading-[17px] text-gray-600">Next available</p>
                                 <p className="text-[14px] leading-[17px] text-[#0b8350] font-bold">today, 9:00am</p>
                              </div>
                           </div>
                           <div>
                              <IconChevronDown />
                           </div>
                        </div>
                     ))
                  ) : (
                     <p className="text-[16px] text-gray-600 mt-4">No stores found.</p>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default DeliverySelection;
