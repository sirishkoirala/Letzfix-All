import { IconChevronDown } from "@tabler/icons-react";
import React from "react";
import NavDetails from "./NavDetails";
import NavCards from "./NavCards";

const Navbar = () => {
   return (
      <nav className="flex items-center justify-between p-4 containers">
         <div className="flex items-center">
            <img src="/logo.jpg" alt="Logo" className="w-28" />
         </div>
         <div className="flex space-x-12 items-center">
            <div className="relative group">
               <button className="flex items-center">
                  Claims
                  <IconChevronDown size={20} />
               </button>
               <div className="absolute z-10 bg-white hidden  group-hover:block transform group-hover:translate-y-0 translate-y-[-10px] -translate-x-[20%] left-1/2 group-hover:transition-all group-hover:ease-in">
                  <div className="w-[1000px]  mt-8">
                     <div className="grid grid-cols-3">
                        <div className="col-span-1 mr-4">
                           <NavDetails />
                        </div>
                        <div className="col-span-2 flex gap-4 flex-wrap mb-3">
                           <NavCards />
                           <NavCards />
                           <NavCards />
                           <NavCards />
                           <NavCards />
                           <NavCards />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="relative group">
               <button className="flex items-center">
                  Get tech support
                  <IconChevronDown size={20} />
               </button>
               <div className="absolute z-10 bg-white hidden  group-hover:block transform group-hover:translate-y-0 translate-y-[-10px] -translate-x-[36%] left-1/2 transition-all  ease-in">
                  <div className="w-[1000px] h-[200px]  mt-8 ">
                     <div className="grid grid-cols-5">
                        <div className="details">details</div>
                        <div className="cards">cards</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="relative group">
               <button className="flex items-center">
                  Repair a device
                  <IconChevronDown size={20} />
               </button>
               <div className="absolute z-10 bg-white hidden group-hover:block transform group-hover:translate-y-0 translate-y-[-10px] -translate-x-[55%] left-1/2 transition-all  ease-in">
                  <div className="w-[1000px] h-[200px]  mt-8 ">
                     <div className="grid grid-cols-5">
                        <div className="details">details</div>
                        <div className="cards">cards</div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="relative group">
               <button className="flex items-center">
                  Protection plans
                  <IconChevronDown size={20} />
               </button>
               <div className="absolute z-10 bg-white hidden group-hover:block transform group-hover:translate-y-0 translate-y-[-10px] -translate-x-[74%] left-1/2 transition-all ease-in">
                  <div className="w-[1000px] h-[200px]  mt-8 ">
                     <div className="grid grid-cols-5">
                        <div className="details">details</div>
                        <div className="cards">cards</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <button className="bg-teal-600 text-white px-4 py-2 rounded-lg">Statements</button>
      </nav>
   );
};

export default Navbar;
