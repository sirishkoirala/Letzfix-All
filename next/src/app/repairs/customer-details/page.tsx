import CustomerDetails from "@/app/components/CustomerDetails";
import DeviceSummary from "@/app/components/DeviceSummary";
import RepairSectionFooter from "@/app/components/RepairSectionFooter";
import RepairSectionNavbar from "@/app/components/RepairSectionNavbar";
import React from "react";

const page = () => {
   return (
      <div>
         <RepairSectionNavbar/>
         <div className="containers grid grid-cols-12 ">
            <div className="col-span-8  h-96 ">
               <CustomerDetails/>
            </div>
            <div className="col-span-4 border-l-2 pl-6">
               <DeviceSummary />
            </div>
         </div>
        <RepairSectionFooter/>
      </div>
   );
};

export default page;
