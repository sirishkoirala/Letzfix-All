import React from "react";

const HeroHomePage = () => {
   return (
      <>
         <div
            className="grid grid-cols-2 containers mt-2 bg-cover bg-top"
            style={{ backgroundImage: `url('/bgImg.png')` }}
         >
            <div className=" p-8 flex flex-col items-start">
               <h1 className="text-[60px] font-light text-white mb-5 leading-[63px] tracking-tight">
                  Trusted gadget repairs, fast and fairly priced every time.
               </h1>
               <p className="text-[22px] font-light text-white mb-6 mt-2 leading-[32px] ">
                  Tech troubles? Our skilled professionals are here to help. <br /> Pick your device and schedule a
                  visit at any
                  <br />
                  UrTechDr® by Letzfix store.
               </p>
               <div className="flex space-x-4 my-2 ">
                  <button className=" hover:bg-secondary/80 py-3 px-7 text-[16px] leading-[24px] font-medium rounded-3xl bg-white">
                     Start a repair
                  </button>
                  <button className=" border-2 hover:bg-muted py-3 px-7 text-[16px] leading-[24px font-normal text-white rounded-3xl">
                     Find a store
                  </button>
               </div>
            </div>
            <div className=""></div>
         </div>
      </>
   );
};

export default HeroHomePage;
