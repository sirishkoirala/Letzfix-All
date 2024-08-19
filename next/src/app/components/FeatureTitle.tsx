import React from "react";

const FeatureTitle = () => {
   return (
      <>
         <div className="intro-gradient bg-center bg-no-repeat bg-cover px-6 md:px-12 py-10 lg:py-20 lg:pb-12 relative overflow-hidden max-w-screen-2xl mx-auto">
            <div className="container mx-auto grid grid-cols-12 relative">
               <h2 className="text-4 md:text-5 xl:text-6  text-black text-center col-span-12 lg:col-span-8 lg:col-start-3">
                  <span className="block font-light text-[40px] leading-[46px] tracking-tight">
                     We fix phones, computers, tablets, game consoles, and more
                  </span>
               </h2>
            </div>
         </div>
      </>
   );
};

export default FeatureTitle;
