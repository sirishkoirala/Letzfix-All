import React from "react";
import DeviceSummary from "./../../components/DeviceSummary";
import DamageType from "@/app/components/DamageType";
import RepairSectionNavbar from "@/app/components/RepairSectionNavbar";
import RepairSectionFooter from "@/app/components/RepairSectionFooter";

const DeviceDetails = () => {
   return (
      <>
         <RepairSectionNavbar/>
         <div className="containers grid grid-cols-12 ">
            <div className="col-span-8  h-96 ">
               <DamageType/>
            </div>
            <div className="col-span-4 border-l-2 pl-6">
               <DeviceSummary />
            </div>
         </div>
         <RepairSectionFooter/>
      </>
   );
};

export default DeviceDetails;
