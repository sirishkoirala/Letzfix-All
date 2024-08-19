"use client";
import React from "react";
import { Feature } from "./../types/featureCard";
const featureCard: Feature[] = [
   {
      id: 1,
      image: "/features/iphone-screen.png",
      detail: "Fix your broken or cracked iPhone screen for a low price",
      button: "Learn More",
   },
   {
      id: 2,
      image: "/features/samsung.png",
      detail: "Let our trusted experts repair your cracked Samsung® screen",
      button: "Learn More",
   },
   {
      id: 3,
      image: "/features/google-pixel.png",
      detail: "Have your Google Pixel™ put back in one piece by an authorized repair provider",
      button: "View Details",
   },
];

const FeatureCard = () => {
   return (
      <>
         <div className="containers flex justify-around items-center flex-wrap ">
            {featureCard?.map((feature: Feature) => {
               return (
                  <div key={feature.id} className="w-[400px]">
                     <img src={feature.image} alt="google-pixel" className="w-[400px] " />
                     <div className="flex flex-col items-center justify-center">
                        <p className="my-4 text-center">{feature.detail}</p>
                        <button className="rounded-full bg-transparent font-normal text-base px-3 py-1 border-2 border-teal-700 text-teal-700 text-center hover:bg-teal-50 cursor-pointer">
                           {feature.button}
                        </button>
                     </div>
                  </div>
               );
            })}
         </div>
      </>
   );
};

export default FeatureCard;
