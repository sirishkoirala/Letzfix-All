"use client";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCustomer } from ".././hooks/useCustomer";
import Skeleton from "react-loading-skeleton";

const CustomerDetails = () => {
   const [firstName, setFirstName] = useState<string>("");
   const [lastName, setLastName] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [phone, setPhone] = useState<string>("");
   const router = useRouter();

   const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();

      localStorage.setItem("fname", firstName);

      const customerDetails = {
         fname: firstName,
         lname: lastName,
         email: email,
         phone: phone,
      };

      try {
         const response = await fetch("http://localhost:3000/api/customer", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(customerDetails),
         });

         if (response.ok) {
            router.push("/repairs/confirmation");
         } else {
            console.error("Failed ");
         }
      } catch (error) {
         console.error("An error occurred", error);
      }
   };

   return (
      <div className="pt-14">
         <form onSubmit={handleSubmit}>
            <div className="h-[480px] overflow-y-auto">
               <h1 className="text-[38px] leading-[48px] font-light">Last step—enter your contact info</h1>
               <p className="text-[22px] leading-[29px] tracking-tight mt-2 text-gray-500">
                  This’ll speed up check-in when you get here.
               </p>
               <div className="mt-6 mr-14">
                  <div className="relative inline-block w-full">
                     <div className="space-y-4">
                        <div className="flex space-x-4">
                           <input
                              type="text"
                              placeholder="First name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="appearance-none w-full bg-background border-[2px] text-black py-5 px-4 pr-8 rounded-lg leading-tight hover:bg-white hover:border-gray-500"
                           />
                           <input
                              type="text"
                              placeholder="Last name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="appearance-none w-full bg-background border-[2px] text-black py-5 px-4 pr-8 rounded-lg leading-tight hover:bg-white hover:border-gray-500"
                           />
                        </div>
                        <input
                           type="email"
                           placeholder="Email address"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="appearance-none w-full bg-background border-[2px] text-black py-5 px-4 pr-8 rounded-lg leading-tight hover:bg-white hover:border-gray-500"
                        />
                        <input
                           type="tel"
                           placeholder="Phone number to reach you"
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                           className="appearance-none w-full bg-background border-[2px] text-black py-5 px-4 pr-8 rounded-lg leading-tight hover:bg-white hover:border-gray-500"
                        />
                     </div>
                  </div>
               </div>

               <div className="mt-6 mb-4 flex flex-col gap-3">
                  <p className="text-[15.5px]">
                     By continuing, you agree to the
                     <span className="underline underline-offset-2 cursor-pointer"> Terms of Service </span> and
                     <span className="underline underline-offset-2 cursor-pointer"> Privacy Policy. </span>
                  </p>
                  <div className="flex items-center">
                     <input type="checkbox" className="mr-2 h-4 w-4" />
                     <label htmlFor="" className="text-[15.5px]">
                        Send me exclusive offers and free tech tips.
                     </label>
                  </div>
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
                     <button type="submit" className="px-4 py-3 bg-gray-200 rounded-full">
                        Continue
                     </button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};

export default CustomerDetails;
