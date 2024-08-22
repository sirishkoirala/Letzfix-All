import React from "react";
import DeviceSelection from "./DeviceSelection";
import DeviceSummary from "./DeviceSummary";
import RepairSectionNavbar from "./RepairSectionNavbar";
import RepairSectionFooter from "./RepairSectionFooter";

const DeviceDetails = () => {
   return (
      <>
         <RepairSectionNavbar />
         <div className="containers grid grid-cols-12 ">
            <div className="col-span-8  h-96 ">
               <DeviceSelection />
            </div>
            <div className="col-span-4 border-l-2 pl-6">
               <DeviceSummary />
            </div>
         </div>
         <RepairSectionFooter />
      </>
   );
};

export default DeviceDetails;
