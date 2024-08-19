import { IconChevronRight } from "@tabler/icons-react";
import React from "react";
import { Device } from "../types/deviceTypes";

interface DeviceCardProps {
   device: Device;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
   return (
      <div className="rounded-lg border shadow border-teal-600 h-44 w-52 cursor-pointer">
         <img src={device.image} alt={device.name} className="h-36 w-36 mx-auto object-fill" />
         <div className="flex items-center justify-center gap-1">
            <p className="text-base">{device.name}</p>
            <IconChevronRight stroke={2} size={19} color="teal" />
         </div>
      </div>
   );
};

export default DeviceCard;
