"use client";
import React, { useEffect, useState } from "react";
import { IconCheck, IconClock12, IconMapPin, IconMessage2 } from "@tabler/icons-react";
import { Tsmartphones } from "../types/Tsmartphones";
import { useDeviceBrand } from "../hooks/useDeviceBrand";
import Skeleton from "react-loading-skeleton";

type Customer = {
   firstName: string;
   lastName: string;
   email: string;
   phone: string;
};

type SelectedCity = {
   city: string;
   address1: string;
};

type SelectedFault = {
   id: number;
   name: string;
   deviceId: number;
   createdAt: string;
   updatedAt: string;
};

type DamageData = {
   selectedFaults: SelectedFault[];
   specialDamage: string;
};

type Model = {
   id: number;
   name: string;
};

type DataState = {
   damageData: DamageData | null;
   selectedDevice: string | null;
   selectedModel: Model | null;
   customer: Customer | null;
   selectedCity: SelectedCity | null;
   selectedDate: string | null;
   selectedTime: string | null;
};

const DeviceSummary = () => {
   const { Brands, isLoading, isError } = useDeviceBrand();
   const [data, setData] = useState<DataState | null>(null);

   useEffect(() => {
      const damageData = localStorage.getItem("damageData");
      const selectedModel = localStorage.getItem("selectedModel");
      const customer = localStorage.getItem("customer");
      const selectedDevice = localStorage.getItem("selectedDevice");
      const selectedCity = localStorage.getItem("selectedCity");
      const selectedDate = localStorage.getItem("selectedDate");
      const selectedTime = localStorage.getItem("selectedTime");

      const allData: DataState = {
         damageData: damageData ? JSON.parse(damageData) : null,
         selectedModel: selectedModel ? JSON.parse(selectedModel) : null,
         customer: customer ? JSON.parse(customer) : null,
         selectedDevice: selectedDevice || null,
         selectedCity: selectedCity ? JSON.parse(selectedCity) : null,
         selectedDate: selectedDate || null,
         selectedTime: selectedTime || null,
      };

      setData(allData);
   }, []);

   if (isLoading) {
      return (
         <div className="containers">
            <Skeleton count={12} />
         </div>
      );
   }

   if (isError) {
      return <div>Error...</div>;
   }

   const brandImage: Tsmartphones | undefined = Brands.find(
      (phone: Tsmartphones) => phone.name === data?.selectedDevice
   );

   const { damageData, selectedModel, customer, selectedCity, selectedDate, selectedTime } = data || {};

   return (
      <div className="mt-10">
         <div className="max-w-md mx-auto p-4">
            <h2 className="text-[20px] leading-[24px] tracking-tight">Summary</h2>
            <div className="flex items-center mt-4">
               <img src={brandImage?.image} alt="cant load" className="h-12 w-12" />

               <div>
                  {damageData?.selectedFaults.map((fault) => (
                     <p key={fault.id} className="font-medium">
                        {fault.name}
                     </p>
                  ))}
                  <p className="text-[14px] text-gray-600">{selectedModel?.name || "Phone"}</p>
               </div>
               <a href="#" onClick={(e) => e.preventDefault()} className="ml-auto font-underline underline-offset-2">
                  Change
               </a>
            </div>
            <hr className="my-4 border-muted mt-6" />
            <h3 className="text-[20px] leading-[24px] tracking-tight mt-6">Visit details</h3>
            <ul className="list-none list-inside flex flex-col gap-4 mt-5">
               <li>
                  <p className="flex gap-4 items-center">
                     <IconMapPin stroke={1.6} size={20} />
                     Store location
                  </p>
                  <div className="ml-9">
                     <p className="text-[15px] text-gray-600">{selectedCity?.city || ""}</p>
                     <p className="text-[15px] text-gray-600">{selectedCity?.address1 || ""}</p>
                  </div>
               </li>
               <li>
                  <p className="flex gap-4 items-center">
                     <IconClock12 stroke={1.6} size={20} />
                     Date and Time
                  </p>
                  <div className="ml-9">
                     <p className="text-[15px] text-gray-600">{selectedTime || ""}</p>
                  </div>
                  <div className="ml-9">
                     <p className="text-[15px] text-gray-600">{selectedDate || ""}</p>
                  </div>
               </li>
               <li>
                  <p className="flex gap-4 items-center">
                     <IconMessage2 stroke={1.6} size={20} />
                     Contact Details
                  </p>
                  <div className="ml-9">
                     <p className="text-[15px] text-gray-600">
                        {customer ? `${customer.firstName} ${customer.lastName}` : ""}
                     </p>
                     <p className="text-[14px] text-gray-600">{customer?.email || ""}</p>
                     <p className="text-[13px] text-gray-600">{customer?.phone || ""}</p>
                  </div>
               </li>
            </ul>
            <hr className="border-muted my-8" />
            <h3 className="text-[20px] leading-[24px] tracking-tight">About our repairs</h3>
            <ul className="list-none list-inside flex flex-col gap-4 mt-5">
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
   );
};

export default DeviceSummary;
