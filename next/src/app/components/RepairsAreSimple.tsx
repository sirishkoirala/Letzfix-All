import React from "react";
import { RepairsSimple } from "../types/repairsAreSimple";

const Details: RepairsSimple[] = [
   {
      id: 1,
      name: "1. Find a location",
      description: "Walk into one of our 700+ stores, or schedule a repair online.",
      image: "/repairsAreSimple/one.png",
   },
   {
      id: 2,
      name: "2. Get quality repairs",
      description: "We’ll run a free diagnostic on your Smartphone and provide fast, convenient repairs.",
      image: "/repairsAreSimple/2.png",
   },
   {
      id: 3,
      name: "3. Sit back and relax",
      description: "We’ll contact you when the repair is done so you can enjoy your Smartphone.",
      image: "/repairsAreSimple/3.png",
   },
];

const RepairsAreSimple: React.FC = () => {
   return (
      <>
         <div className="intro-gradient pb-8">
            <div className="containers">
               <h1 className="text-[40px] leading-[46px] font-light tracking-tight text-center py-16 ">
                  Our Smartphone repairs are simple
               </h1>
               <div className="grid grid-cols-3">
                  {Details.map((detail) => (
                     <div key={detail.id} className="flex flex-col items-center justify-center ">
                        <img src={detail.image} alt="RepairsAreSimple" />
                        <p
                           className="text-[32px] leading-[38px] font-light tracking-tight
                     text-center my-4"
                        >
                           {detail.name}
                        </p>
                        <p className="text-[20px] leading-[30px] font-light text-center tracking-tight mt-4">
                           {detail.description}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </>
   );
};

export default RepairsAreSimple;
