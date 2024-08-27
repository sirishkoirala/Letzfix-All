"use client";
import { IconCircleCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Name {
   firstName: string;
}

const Confirmation = () => {
   const [data, setData] = useState<Name | null>(null);

   useEffect(() => {
      const customer = JSON.parse(localStorage.getItem("customer") || "[]");

      if (customer) {
         setData({
            firstName: customer.firstName,
         });
      }
   }, []);
    const router = useRouter();

    const handleClick = () => {
       router.push("/repairs/appointment-summary");
    };

   return (
      <div className="pt-14">
         <div className="h-[480px] overflow-y-auto">
            <IconCircleCheck className="mb-2" stroke={1.2} size={60} color="green" />
            <h1 className="text-[38px] leading-[48px] font-light">You’re all set, {data?.firstName}. See you soon!</h1>
            <p className="text-[22px] leading-[29px] tracking-tight mt-2 text-gray-500">
               We sent a confirmation email and text.
            </p>
            <div className="mt-6 mr-14">
               <div className="relative inline-block w-full"></div>
            </div>
         </div>
         <div className="">
            <button onClick={handleClick} className="px-4 py-2 border bg-teal-700 rounded-full text-white">Goto Summary</button>
         </div>
      </div>
   );
};

export default Confirmation;
