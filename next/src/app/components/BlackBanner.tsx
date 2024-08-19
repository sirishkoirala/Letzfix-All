import React from "react";

const BlackBanner = () => {
   return (
      <>
         <div className="containers bg-teal-950 pb-14 px-4">
            <div className="pt-10">
               <h1 className="text-[40px] font-light text-white leading-[46px] text-center my-10">
                  The leatest from our stores
               </h1>
            </div>
            <div className="flex pt-2">
               <div className="flex flex-col md:flex-row justify-between p-6 text-white mb-4 md:mb-0 md:w-1/3">
                  <div className="flex flex-col items-center justify-center">
                     <div className=" text-white rounded-lg mb-4">
                        <img
                           src="./blackScreen/boost_computer_speed_and_performance.png"
                           alt="boost_computer_speed_and_performance"
                           className="w-full h-full object-contain "
                        />
                     </div>
                     <p className="mt-2 text-[26px] font-light leading-[38px] text-center">
                        Get a computer tune-up today
                     </p>
                     <button className="mt-4 bg-teal-900 text-white hover:bg-teal-900/80 py-1 px-4 border-2 border-white rounded-full text-[16px] leading-[24px]">
                        Boost your speed now
                     </button>
                  </div>
               </div>
               <div className="flex flex-col md:flex-row justify-between p-6 text-white mb-4 md:mb-0 md:w-1/3">
                  <div className="flex flex-col items-center justify-center">
                     <div className=" text-white rounded-lg mb-4">
                        <img
                           src="./blackScreen/get_that_squeaky_clean_feeling.png"
                           alt="get_that_squeaky_clean_feeling"
                           className="w-full h-full object-contain "
                        />
                     </div>
                     <p className="mt-2 text-[26px] font-light leading-[38px] text-center">
                        Sanitize and optimize your device
                     </p>
                     <button className="mt-4 bg-teal-900 text-white hover:bg-teal-900/80 py-1 px-4 border-2 border-white rounded-full text-[16px] leading-[24px]">
                        Get Started
                     </button>
                  </div>
               </div>
               <div className="flex flex-col md:flex-row justify-between p-6 text-white mb-4 md:mb-0 md:w-1/3">
                  <div className="flex flex-col items-center justify-center">
                     <div className=" text-white rounded-lg mb-4">
                        <img
                           src="./blackScreen/rebrand-promo-tile.png"
                           alt="rebrand-promo-tile"
                           className="w-full h-full object-contain "
                        />
                     </div>
                     <p className="mt-2 text-[26px] font-light leading-[38px] text-center">
                        More choices, better service.
                     </p>
                     <button className="mt-4 bg-teal-900 text-white hover:bg-teal-900/80 py-1 px-4 border-2 border-white rounded-full text-[16px] leading-[24px]">
                        Learn More
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default BlackBanner;
