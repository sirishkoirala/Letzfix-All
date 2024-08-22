"use client";
import { IconCircleCheck } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

interface Name {
   fname: string;
}

const Confirmation = () => {
   const [data, setData] = useState<Name | null>(null);

   useEffect(() => {
      const fname = localStorage.getItem("fname");

      if (fname) {
         setData({
            fname,
         });
      }
   }, []);

   return (
      <>
         <div className="pt-14">
            <div className="h-[480px] overflow-y-auto">
               <IconCircleCheck className="mb-2" stroke={1.2} size={60} color="green" />
               <h1 className="text-[38px] leading-[48px] font-light">
                  You’re all set, {data?.fname}. See you soon!
               </h1>
               <p className="text-[22px] leading-[29px] tracking-tight mt-2 text-gray-500">
                  We sent a confirmation email and text.
               </p>
               <div className="mt-6 mr-14">
                  <div className="relative inline-block w-full"></div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Confirmation;
