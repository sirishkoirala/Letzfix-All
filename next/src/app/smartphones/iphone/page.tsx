import AnySmartphonesNewOrOld from "@/app/components/AnySmartphonesNewOrOld";
import CompaniesInRepair from "@/app/components/CompaniesInRepair";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import OnScrollPop from "@/app/components/OnScrollPop";
import RepairsAreSimple from "@/app/components/RepairsAreSimple";
import RepairsReplacements from "@/app/components/RepairsReplacements";
import SmartphoneHero from "@/app/components/SmartphoneHero";
import SmartPhones from "@/app/components/SmartPhones";
import VideoBlock from "@/app/components/VideoBlock";
import WhatWeCanFixForYou from "@/app/components/WhatWeCanFixForYou";
import React from "react";

const page = () => {
   return (
      <>
         <OnScrollPop />
         <Navbar />
         <SmartphoneHero
            image="/iphone-repair.webp"
            title="iPhone repairs"
            description="iPhone not working? Our trusted experts can provide reliable repairs—fast."
         />
         <CompaniesInRepair />
         <RepairsReplacements />
         <RepairsAreSimple />
         <AnySmartphonesNewOrOld />
         <VideoBlock />
         <WhatWeCanFixForYou />
         <SmartPhones />
         <Footer />
      </>
   );
};

export default page;
