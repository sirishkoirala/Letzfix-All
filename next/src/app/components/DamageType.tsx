"use client";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFaults } from "../hooks/useFaults";
import Skeleton from "react-loading-skeleton";
import { Tfaults } from "../types/Tfaults";

const DamageType = () => {
   const [selectedFaults, setSelectedFaults] = useState<Tfaults[]>([]);
   const [specialDamage, setSpecialDamage] = useState<string>("");
   const { Faults = [], isLoading, error } = useFaults();

   const router = useRouter();

   const handleCheckboxChange = (fault: Tfaults) => {
      setSelectedFaults((prev: Tfaults[]) =>
         prev.find((f) => f.id === fault.id) ? prev.filter((f) => f.id !== fault.id) : [...prev, fault]
      );
   };

   const handleContinue = () => {
      const damageData = {
         selectedFaults,
         specialDamage,
      };
      localStorage.setItem("damageData", JSON.stringify(damageData));

      router.push("/repairs/delivery-selection");
   };

   if (isLoading) {
      return (
         <div className="containers">
            <Skeleton count={8} />
         </div>
      );
   }

   if (error) return <div>Failed to load faults</div>;

   return (
      <div className="pt-14">
         <div className="h-[480px] overflow-y-auto">
            <h1 className="text-[38px] leading-[48px] font-light">What's wrong with it?</h1>
            <p className="text-[22px] leading-[29px] tracking-tight mt-2 text-gray-500">
               Things happen—we've seen it all.
            </p>
            <div className="mt-6 mr-14">
               <div className="relative inline-block w-full">
                  {Faults.map((fault: Tfaults, index: number) => (
                     <div
                        className="flex items-center appearance-none w-full bg-background border-[2px] text-black py-5 px-4 pr-8 rounded-lg leading-tight hover:bg-white hover:border-gray-500 mt-3"
                        key={fault.id}
                     >
                        <input
                           type="checkbox"
                           id={`fault-${index}`}
                           className="mr-2 w-4 h-4"
                           onChange={() => handleCheckboxChange(fault)}
                        />
                        <label htmlFor={`fault-${index}`}>{fault.name}</label>
                     </div>
                  ))}

                  <textarea
                     name="additional-info"
                     className="appearance-none w-full bg-background border-[2px] text-black py-5 px-4 pr-8 rounded-lg leading-tight hover:bg-white hover:border-gray-500 mt-3"
                     placeholder="Special Damage"
                     rows={5}
                     value={specialDamage}
                     onChange={(e) => setSpecialDamage(e.target.value)}
                  />
               </div>
            </div>

            <div className="mt-6 mb-4 flex flex-col gap-3">
               <p className="text-[15.5px]">
                  Is this device covered by a protection plan?
                  <span className="underline underline-offset-2 cursor-pointer"> Start a claim </span> for the best
                  price.
               </p>
               <p className="text-[15.5px]">
                  Have a question?
                  <span className="underline underline-offset-2 cursor-pointer"> Learn more</span>
               </p>
            </div>
         </div>
         <div>
            <hr className="border" />
            <div className="flex items-center justify-between mt-8">
               <div className="flex items-center">
                  <IconArrowNarrowLeft />
                  <span className="text-[15.5px] underline underline-offset-2">Back</span>
               </div>
               <div className="pr-6">
                  <button type="submit" className="px-4 py-3 bg-gray-200 rounded-full" onClick={handleContinue}>
                     Continue
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default DamageType;
