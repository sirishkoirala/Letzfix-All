import React from "react";

const NavCards = () => {
   return (
      <>
         <div className="p-2 w-52 border rounded-lg border-teal-700">
            <div className="p-2">
               <img src="/devices/laptop.png" className="h-[100px] w-56 object-contain" alt="image" />
            </div>
            <div className="mt-3">Start a new claim</div>
            <p className="text-slate-700 text-[14px] mt-2">
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum sapiente quia{" "}
            </p>
         </div>
      </>
   );
};

export default NavCards;
