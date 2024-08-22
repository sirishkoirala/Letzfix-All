"use client";
import { IconMapPin } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface City {
   name: string;
}

const AppointmentTime = () => {
   const [data, setData] = useState<City | null>(null);
   const [selectedDate, setSelectedDate] = useState(dayjs());
   const [selectedTime, setSelectedTime] = useState<string | null>(null);

   const router = useRouter();

   useEffect(() => {
      const selectedCity = localStorage.getItem("selectedCity");
      if (selectedCity) {
         setData(JSON.parse(selectedCity) as City);
      }

      const storedDate = localStorage.getItem("selectedDate");
      const storedTime = localStorage.getItem("selectedTime");
      if (storedDate) {
         setSelectedDate(dayjs(storedDate));
      }
      if (storedTime) {
         setSelectedTime(storedTime);
      }
   }, []);

   const handleDateChange = (date: dayjs.Dayjs) => {
      // setSelectedDate(date);
      console.log(date.format("ddd, MMM D, YYYY"));
      setSelectedTime(null);
      const formattedDate = date.format("ddd, MMM D, YYYY");
      console.log(formattedDate);
      localStorage.setItem("selectedDate", formattedDate);
   };

   const handleTimeChange = (time: string) => {
      setSelectedTime(time);
      localStorage.setItem("selectedTime", time);
      router.push("/repairs/customer-details");
   };

   const renderDates = () => {
      const days = [];
      for (let i = 0; i < 7; i++) {
         const date = dayjs().add(i, "day");
         days.push(
            <div
               key={i}
               onClick={() => handleDateChange(date)}
               className={`cursor-pointer appearance-none w-full bg-background border-[2px] text-black py-8 px-4 rounded-lg leading-tight hover:bg-white hover:border-gray-700 flex flex-col items-center gap-3 ${
                  selectedDate.isSame(date, "day") ? "border-gray-700" : ""
               }`}
            >
               <p className="text-xl text-center">{date.format("ddd")}</p>
               <p className="text-center">{date.format("MMM D")}</p>
            </div>
         );
      }
      return days;
   };

   const renderTimeSlots = () => {
      const times = [];

      times.push(
         <div
            key="anytime"
            onClick={() => handleTimeChange("anytime")}
            className={`cursor-pointer appearance-none w-full bg-background border-[2px] text-black py-3 px-8 rounded-lg leading-tight hover:bg-white hover:border-gray-700 flex flex-col items-center gap-3 ${
               selectedTime === "anytime" ? "border-gray-700" : ""
            }`}
         >
            <p className="text-center">Come in anytime</p>
         </div>
      );

      for (let i = 9; i < 19; i++) {
         const startTime = dayjs().hour(i).minute(0);
         const endTime = dayjs()
            .hour(i + 1)
            .minute(0);
         const timeSlot = `${startTime.format("ha")}-${endTime.format("ha")}`;
         times.push(
            <div
               key={i}
               onClick={() => handleTimeChange(timeSlot)}
               className={`cursor-pointer appearance-none w-full bg-background border-[2px] text-black py-3 px-8 rounded-lg leading-tight hover:bg-white hover:border-gray-700 flex flex-col items-center gap-3 ${
                  selectedTime === timeSlot ? "border-gray-700" : ""
               }`}
            >
               <p className="text-center">{timeSlot}</p>
            </div>
         );
      }

      return times;
   };

   return (
      <div className="pt-12 overflow-y-auto">
         <div className="h-[550px]">
            <div className="flex items-center gap-1 pb-3">
               <p>
                  <IconMapPin stroke={1.5} />
               </p>
               <p className="text-[16px] leading-[19px]">{data?.name}</p>
               <p className="text-[15px] leading-[19px] ml-1 text-gray-500 font-light">Open now. Closes at 7:00 PM</p>
            </div>
            <h1 className="text-[38px] leading-[48px] font-light">When should we expect you?</h1>
            <div className="mt-5 mr-14">
               <div className="relative inline-block w-full">
                  <h2 className="text-xl tracking-tight mb-3">Choose a date</h2>
                  <div className="grid grid-cols-7 gap-2">{renderDates()}</div>

                  <div className="mt-6">
                     <h2 className="text-xl tracking-tight mb-3">
                        Choose a check-in window on{" "}
                        <span className="font-semibold">{selectedDate.format("ddd, MMMM D")}</span>
                     </h2>
                     <div className="grid grid-cols-4 gap-2">{renderTimeSlots()}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AppointmentTime;
