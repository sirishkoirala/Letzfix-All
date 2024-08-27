"use client";
import React, { useEffect, useState } from "react";
import { IconCheck, IconClock12, IconMapPin } from "@tabler/icons-react";
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
   address2?: string;
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

const AppointmentSummary = () => {
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

   if (!data) {
      return (
         <div className="containers">
            <Skeleton count={12} />
         </div>
      );
   }

   const { damageData, selectedModel, customer, selectedCity, selectedDate, selectedTime } = data;
   // console.log(selectedModel);
   return (
      <>
         <div className="flex flex-col min-h-[100dvh]">
            <header className="bg-primary">
               <h1 className="text-3xl font-bold containers pt-8">Appointment Details</h1>
            </header>
            <main className="flex-1 p-8 md:p-12 lg:p-16">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-background rounded-lg shadow-md p-6">
                     <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <label className="text-sm font-medium text-muted-foreground">Name</label>
                           <p className="text-base font-medium">
                              {customer ? `${customer.firstName} ${customer.lastName}` : "N/A"}
                           </p>
                        </div>
                        <div>
                           <label className="text-sm font-medium text-muted-foreground">Device Model</label>
                           <p className="text-base font-medium">{selectedModel?.name|| "N/A"}</p>
                        </div>
                        <div>
                           <label className="text-sm font-medium text-muted-foreground">Phone</label>
                           <p className="text-base font-medium">{customer?.phone || "N/A"}</p>
                        </div>
                        <div>
                           <label className="text-sm font-medium text-muted-foreground">Email</label>
                           <p className="text-base font-medium">{customer?.email || "N/A"}</p>
                        </div>
                     </div>
                  </div>
                  <div className="bg-background rounded-lg shadow-md p-6">
                     <h2 className="text-xl font-semibold mb-4">Reported Issues</h2>

                     <ul className="space-y-2">
                        {damageData?.selectedFaults.map((fault) => (
                           <li key={fault.id}>
                              <div className="flex items-center gap-2">
                                 <IconCheck stroke={1.6} size={20} />
                                 <p>{fault.name}</p>
                              </div>
                           </li>
                        ))}
                        {!damageData?.selectedFaults.length && <p>No reported issues</p>}
                     </ul>
                  </div>
               </div>
               <div className="bg-background rounded-lg shadow-md p-6 mt-8">
                  <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">Date</label>
                        <p className="text-base font-medium">{selectedDate || "N/A"}</p>
                     </div>
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">Time</label>
                        <p className="text-base font-medium">{selectedTime || "N/A"}</p>
                     </div>
                  </div>
               </div>
               <div className="bg-background rounded-lg shadow-md p-6 mt-8">
                  <h2 className="text-xl font-semibold mb-4">Store Location</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">City</label>
                        <p className="text-base font-medium">{selectedCity?.city || "N/A"}</p>
                     </div>
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">Address 1</label>
                        <p className="text-base font-medium">{selectedCity?.address1 || "N/A"}</p>
                     </div>
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">Address 2</label>
                        <p className="text-base font-medium">{selectedCity?.address2 || "N/A"}</p>
                     </div>
                  </div>
               </div>
            </main>
         </div>
      </>
   );
};

export default AppointmentSummary;
