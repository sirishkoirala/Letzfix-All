'use client';
import { IconClock12, IconReceipt2, IconShieldLock } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
interface SmartphoneHeroProps {
   image: string;
   title: string;
   description: string;
}


const SmartphoneHero = ({ title, image, description }: SmartphoneHeroProps) => {
const router = useRouter();
   const handleClick = ()=>{
      router.push("/repairs/device-details")
   }
   return (
      <>
         <div className="containers mt-8">
            <div className="grid grid-cols-2 ">
               <div className="h-[640px] w-400 " style={{ backgroundImage: `url(${image})` }}></div>
               <div className="pl-10 flex flex-col items-start justify-center">
                  <h2 className="text-[40px] leading-[46px] font-light">{title}</h2>
                  <p className="text-[20px] leading-[30px] font-light mt-6">{description}</p>
                  <div className="flex flex-col gap-6 mt-7">
                     <div className="flex items-center gap-4">
                        <IconReceipt2 size={44} stroke={1.4} />
                        <p className="text-[18px] leading-[29px]">
                           <span className=" text-teal-600 underline underline-offset-4 cursor-pointer">
                              Free diagnostics and
                           </span>
                           and
                           <span className=" text-teal-600 underline underline-offset-4 cursor-pointer">
                              a low price guarantee
                           </span>
                        </p>
                     </div>
                     <div className="flex  items-center gap-4">
                        <IconClock12 size={44} stroke={1.4} />
                        <p className="text-[18px] leading-[29px]">
                           Most repairs done as soon as
                           <span className="text-teal-600 underline underline-offset-4 cursor-pointer ">
                              the same day
                           </span>
                        </p>
                     </div>
                     <div className="flex  items-center gap-4">
                        <IconShieldLock size={44} stroke={1.4} />
                        <p className="text-[18px] leading-[29px]">
                           <span className=" text-teal-600 underline underline-offset-4 cursor-pointer">
                              1-year limited warranty{" "}
                           </span>
                           valid at all 700+ locations
                        </p>
                     </div>
                  </div>
                  <div className="mt-7 flex flex-col gap-4">
                     <button className="px-6 py-2 bg-teal-700 text-white text-[16px] leading-[29px] tracking-tight rounded-full border border-teal-700" onClick={()=>handleClick()}>
                        Schedule a repair
                     </button>
                     <button className="px-6 py-2 bg-white text-teal-700 text-[16px] leading-[29px] tracking-tight rounded-full border border-teal-700">
                        Find a Store
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default SmartphoneHero;
