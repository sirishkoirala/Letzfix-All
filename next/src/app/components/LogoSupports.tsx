"use client";
import React from "react";
import { Logos } from "../types/logoSupport";

const logos: Logos[] = [
   {
      id: 1,
      name: "Trusted professionals",
      image: "./logoSupport/device-repair.svg",
      detail: "We have thousands of U.S.-based experts ready to help.",
   },
   {
      id: 2,
      name: "Speedy service",
      image: "./logoSupport/icons-value.svg",
      detail: "Most repairs done in 45 minutes or less.",
   },
   {
      id: 3,
      name: "Free diagnostics",
      image: "./logoSupport/icons-value-no_cost_diagnostics.svg",
      detail: "Not sure what’s wrong? Let us take a look.",
   },
   {
      id: 4,
      name: "Low price guarantee",
      image: "./logoSupport/icons-value-low_price_guarantee.svg",
      detail: " We'll beat any local competitor’s published price for the same repair by $5.",
   },
   {
      id: 5,
      name: "1-year limited warranty",
      image: "./logoSupport/icons-value-one_year_warranty.svg",
      detail: "Most repairs come with our hassle-free warranty—valid at any location.",
   },
];

const LogoSupports: React.FC = () => {
   return (
      <div className="flex flex-wrap items-center justify-center containers my-12 px-4 pb-4">
         {logos?.map((logo: Logos) => (
            <div key={logo.id} className="flex flex-col items-center text-center p-4 w-[265px] h-[220px]">
               <img alt="tools-icon" src={logo.image} className="rounded-full mb-2" />
               <h3 className="text-lg font-semibold text-foreground cursor-pointer">{logo.name}</h3>
               <p className="text-muted-foreground">{logo.detail}</p>
            </div>
         ))}
      </div>
   );
};

export default LogoSupports;
