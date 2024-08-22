"use client";
import React, { useEffect, useState } from "react";
import { IconCheck, IconClock12, IconMapPin, IconMessage2 } from "@tabler/icons-react";
import { Tsmartphones } from "../types/Tsmartphones";
import { usePhones } from "../hooks/usePhones";
import Skeleton from "react-loading-skeleton";

type CustomerDetails = {
   firstName: string;
   lastName: string;
   email: string;
   phone: string;
};

type SelectedCity = {
   store_city: string;
   store_address: string;
};

type DamageData = {
   selectedIssues: string;
};

type DataState = {
   damageData: DamageData | null;
   selectedDevice: string | null;
   selectedModel: string | null;
   customerDetails: CustomerDetails | null;
   selectedCity: SelectedCity | null;
   selectedDate: string | null;
   selectedTime: string | null;
};

const DeviceSummary = () => {
   const { Smartphones, isLoading, isError } = usePhones();
   const [data, setData] = useState<DataState | null>(null);

   useEffect(() => {
      const damageData = localStorage.getItem("damageData");
      const selectedModel = localStorage.getItem("selectedModel");
      const customerDetails = localStorage.getItem("customerDetails");
      const selectedDevice = localStorage.getItem("selectedDevice");
      const selectedCity = localStorage.getItem("selectedCity");
      const selectedDate = localStorage.getItem("selectedDate");
      const selectedTime = localStorage.getItem("selectedTime");

      const allData: DataState = {
         damageData: damageData ? JSON.parse(damageData) : null,
         selectedModel: selectedModel || null,
         customerDetails: customerDetails ? JSON.parse(customerDetails) : null,
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

   const phoneImage: Tsmartphones | undefined = Smartphones.find(
      (phone: Tsmartphones) => phone.name === data?.selectedDevice
   );
   const { damageData, selectedModel, customerDetails, selectedCity, selectedDate, selectedTime } = data || {};

   return (
      <div className="mt-10">
         <div className="max-w-md mx-auto p-4">
            <h2 className="text-[20px] leading-[24px] tracking-tight">Summary</h2>
            <div className="flex items-center mt-4">
               {phoneImage ? <img src={phoneImage.image} alt={phoneImage.name} className="h-12 " /> : <div>Device not found</div>}
               <div>
                  <p className="font-medium">{damageData?.selectedIssues || "Device Repair"}</p>
                  <p className="text-[14px] text-gray-600">{selectedModel || "Phone"}</p>
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
                     <p className="text-[15px] text-gray-600">{selectedCity?.store_city || ""}</p>
                     <p className="text-[15px] text-gray-600">{selectedCity?.store_address || ""}</p>
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
                        {customerDetails ? `${customerDetails.firstName} ${customerDetails.lastName}` : ""}
                     </p>
                     <p className="text-[14px] text-gray-600">{customerDetails?.email || ""}</p>
                     <p className="text-[13px] text-gray-600">{customerDetails?.phone || ""}</p>
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
