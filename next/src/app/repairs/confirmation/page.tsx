import Confirmation from "@/app/components/Confirmation";
import DeviceSummary from "@/app/components/DeviceSummary";
import RepairSectionFooter from "@/app/components/RepairSectionFooter";
import RepairSectionNavbar from "@/app/components/RepairSectionNavbar";
import React from "react";

const page = () => {
   return (
      <>
         <RepairSectionNavbar />
         <div className="containers grid grid-cols-12 ">
            <div className="col-span-8  h-96 ">
               <Confirmation/>
            </div>
            <div className="col-span-4 border-l-2 pl-6">
               <DeviceSummary />
            </div>
         </div>
         <RepairSectionFooter />
      </>
   );
};

export default page;
