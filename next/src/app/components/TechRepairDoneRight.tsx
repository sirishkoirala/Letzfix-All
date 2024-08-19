import React from "react";

const TechRepairDoneRight = () => {
   return (
      <>
         <div className="containers">
            <div className="grid grid-cols-12 ">
               <div className="flex flex-col items-start justify-center ml-12 col-span-6">
                  <h2 className="text-[40px] leading-[46px] tracking-tight font-light"> Tech repair done right</h2>
                  <p className="font-light text-[20px] leading-[30px] tracking-tight mt-5">
                     For over 25 years, Asurion has repaired the devices people rely on most—from smartphones to game
                     consoles. Don’t leave important repairs to just anyone. Our trusted experts will fix them the right
                     way, and we have the reviews to prove it.
                  </p>
                  <button className="bg-transparent text-teal-700 text-[16px] font-normal leading-[24px] border-2 bg-teal-50 border-teal-700 mt-4 rounded-full px-8 py-1 hover:bg-teal-50/50">
                     Read our Reviews
                  </button>
               </div>
               <div className="col-span-6">
                  <img
                     src="ubreakifix-by-asurion-expert-five-stars-with-quote-feature-half.png"
                     alt="ubreakifix-by-asurion-expert-five-stars-with-quote-feature-half"
                  />
               </div>
            </div>
         </div>
      </>
   );
};

export default TechRepairDoneRight;
