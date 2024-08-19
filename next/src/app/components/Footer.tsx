import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import React from "react";

const Footer = () => {
   return (
      <>
         <div className=" bg-black text-white">
            <div className="containers">
               <div className="flex justify-center items-center h-28p py-20">
                  <p className="text-center text-[14px] leading-[21px] font-light tracking-tight px-10">
                     All rights reserved. Apple®, iPhone®, and iPad® are the trademarks of Apple Inc. All other
                     trademarks are the property of their respective owners. uBreakiFix is an independent service
                     company and is in no way affiliated with Apple Inc.
                  </p>
               </div>

               <footer className=" containers px-4">
                  <div className=" grid grid-cols-12 ">
                     <div className="col-span-2">
                        <img src="/logoDarkMode.jpg" alt="" className="pr-28 " />
                     </div>
                     <div className="col-span-2">
                        <div className="w-10/12">
                           <h2 className="text-[16px] leading-[20px] tracking-tight font-bold mb-4 hover:underline cursor-pointer">
                              Protection Plans
                           </h2>
                           <ul className="list-none text-[15px] leading-[20px] font-normal tracking-tight text-gray-400 flex flex-col gap-4">
                              <li className="hover:underline cursor-pointer">Mobile Protection</li>
                              <li className="hover:underline cursor-pointer">iPhone Protection</li>
                              <li className="hover:underline cursor-pointer">Samsung Phone Protection</li>
                              <li className="hover:underline cursor-pointer">Mobile Protection Features</li>
                              <li className="hover:underline cursor-pointer">Mobile Protection FAQs</li>
                              <li className="hover:underline cursor-pointer"> Letzfix Home+</li>
                              <li className="hover:underline cursor-pointer"> Letzfix Home+ Features</li>
                              <li className="hover:underline cursor-pointer"> Letzfix Home+ FAQs</li>
                              <li className="hover:underline cursor-pointer"> Letzfix Appliance+</li>
                              <li className="hover:underline cursor-pointer"> Letzfix Complete Protect</li>
                           </ul>
                        </div>
                     </div>
                     <div className="col-span-2">
                        <div className="w-10/12">
                           <h2 className="text-[16px] leading-[20px] tracking-tight font-bold mb-4 hover:underline cursor-pointer">
                              Repair Services
                           </h2>
                           <ul className="list-none text-[15px] leading-[20px] font-normal tracking-tight text-gray-400 flex flex-col gap-4">
                              <li className="hover:underline cursor-pointer">Cracked Screen Repair</li>
                              <li className="hover:underline cursor-pointer">Tech Repair</li>
                           </ul>
                        </div>
                     </div>
                     <div className="col-span-2">
                        <div className="w-10/12">
                           <h2 className="text-[16px] leading-[20px] tracking-tight font-bold mb-4 hover:underline cursor-pointer">
                              Tech Help
                           </h2>
                           <ul className="list-none text-[15px] leading-[20px] font-normal tracking-tight text-gray-400 flex flex-col gap-4">
                              <li className="hover:underline cursor-pointer">Tech Tips</li>
                              <li className="hover:underline cursor-pointer">Start or Track a Claim</li>
                              <li className="hover:underline cursor-pointer">How to File a Claim</li>
                              <li className="hover:underline cursor-pointer">Mobile App Center</li>
                              <li className="hover:underline cursor-pointer">Tech Help</li>
                              <li className="hover:underline cursor-pointer"> Tech Service Features</li>
                              <li className="hover:underline cursor-pointer"> Tech Expert Stories</li>
                              <li className="hover:underline cursor-pointer"> Tech Help FAQs</li>
                           </ul>
                        </div>
                     </div>
                     <div className="col-span-2">
                        <div className="w-10/12">
                           <h2 className="text-[16px] leading-[20px] tracking-tight font-bold mb-4 hover:underline cursor-pointer">
                              Extended Warranties
                           </h2>
                           <ul className="list-none text-[15px] leading-[20px] font-normal tracking-tight text-gray-400 flex flex-col gap-4">
                              <li className="hover:underline cursor-pointer">Warranty Features</li>
                              <li className="hover:underline cursor-pointer">Warranty FAQs</li>
                              <li className="hover:underline cursor-pointer">TV and Home Theater</li>
                              <li className="hover:underline cursor-pointer">Laptop and Computer</li>
                              <li className="hover:underline cursor-pointer">Home Appliances</li>
                              <li className="hover:underline cursor-pointer"> Electronics</li>
                              <li className="hover:underline cursor-pointer"> Tablet and eReader</li>
                           </ul>
                        </div>
                     </div>

                     <div className="col-span-2">
                        <div className="w-10/12">
                           <h2 className="text-[16px] leading-[20px] tracking-tight font-bold mb-4 hover:underline cursor-pointer">
                              About Letzfix
                           </h2>
                           <ul className="list-none text-[15px] leading-[20px] font-normal tracking-tight text-gray-400 flex flex-col gap-4">
                              <li className="hover:underline cursor-pointer">About Letzfix</li>
                              <li className="hover:underline cursor-pointer">Leadership</li>
                              <li className="hover:underline cursor-pointer">Corporate Responsibility</li>
                              <li className="hover:underline cursor-pointer">Partnerships</li>
                              <li className="hover:underline cursor-pointer">Recognition and Reviews</li>
                              <li className="hover:underline cursor-pointer">Careers</li>
                              <li className="hover:underline cursor-pointer"> Newsroom</li>
                              <li className="hover:underline cursor-pointer"> Life at Letzfix</li>
                              <li className="hover:underline cursor-pointer"> Contact Letzfix</li>
                           </ul>
                        </div>
                     </div>
                  </div>

                  <hr className="border-white mt-7 mb-5" />
                  <div className="flex items-center justify-between pb-20">
                     <ul className="flex gap-4 list-none text-[15px] leading-[20px] tracking-tight ">
                        <li className="hover:underline cursor-pointer">Terms of Use</li>
                        <li className="hover:underline cursor-pointer">Letzfix Privacy Notice</li>
                        <li className="hover:underline cursor-pointer">Cookie Preferences</li>
                        <li className="hover:underline cursor-pointer">© Letzfix 2024</li>
                     </ul>
                     <div className="flex gap-3">
                        <IconBrandFacebook stroke={1.5} />
                        <IconBrandInstagram stroke={1.5} />
                        <IconBrandTwitter stroke={1.5} />
                        <IconBrandLinkedin stroke={1.5} />
                        <IconBrandYoutube stroke={1.5} />
                     </div>
                  </div>
               </footer>
            </div>
         </div>
      </>
   );
};

export default Footer;
