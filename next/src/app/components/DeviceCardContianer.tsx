import React from "react";
import { Device } from "../types/deviceTypes";
import { useDevices } from "./../hooks/useDevices";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";


const DeviceCardContainer = () => {
   const { devices, isLoading, isError } = useDevices();
   

   const router = useRouter();

   if (isLoading)
      return (
         <div className="containers">
            <Skeleton count={8} />
         </div>
      );

   if (isError) return <div>Failed to load devices</div>;

   const handleClick = (deviceUrl: string) => {
      router.push(deviceUrl);
   };

   return (
      <>
         <div className="flex flex-wrap containers gap-12 my-8 items-center justify-center">
            {devices?.map((device: Device) => (
               <div
                  key={device.id}
                  className="rounded-lg border shadow border-teal-600 h-44 w-52 cursor-pointer"
                  onClick={() => handleClick(device.url)}
               >
                  <img src={device.image} alt={device.name} className="h-36 w-36 mx-auto object-fill" />
                  <div className="flex items-center justify-center gap-1">
                     <p className="text-base">Hello {device.name}</p>
                     <IconChevronRight stroke={2} size={19} color="teal" />
                  </div>
               </div>
            ))}
         </div>
      </>
   );
};

export default DeviceCardContainer;
