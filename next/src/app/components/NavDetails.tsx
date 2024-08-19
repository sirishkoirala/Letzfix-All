import { IconArrowNarrowRight } from "@tabler/icons-react";
import React from "react";

const NavDetails = () => {
   return (
      <>
         <div className="">
            <div className="p-8 ">
               <img src="/navbar/claim.svg" alt="claims" className="" />
               <p className="text-2xl mt-1"> Claims</p>
               <p className="text-slate-700 text-[16px] leading-[22px] font-normal mt-2">Broken tech is frustrating. Your claims dont have to be.</p>
               <div className="flex items-center mt-4">
                  <p className="text-teal-600 underline ">Get Started</p>
                  <IconArrowNarrowRight color="teal" size={18}/>
               </div>
            </div>
         </div>
      </>
   );
};

export default NavDetails;
