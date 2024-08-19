import React from "react";

const Feature2 = () => {
   return (
      <>
         <div className="mt-8">
            <div className="containers grid grid-cols-2">
               <div className="col-span-1">
                  <img src="/map.png" alt="map" />
               </div>
               <div className="col-span-1 flex flex-col justify-center items-start ml-6">
                  <h1 className="text-[40px] leading-[46px] tracking-tight font-light">
                     Fast Service, right in your <br /> neighbourhood
                  </h1>
                  <p className="font-light text-[20px] leading-[30px] tracking-tight mt-5">
                     When tech breaks, we fix it. Just stop by one of our 700+ uBreakiFix by Asurion stores, and our
                     trusted experts will take it from there. Can’t come in? We’ll come to you.
                  </p>
                  <button className="bg-transparent text-teal-700 text-[16px] font-normal leading-[24px] border-2 border-teal-700 mt-4 rounded-full px-6 py-1">
                     Find a store
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default Feature2;
