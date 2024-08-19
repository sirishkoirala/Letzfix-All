import React from "react";
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

const page = () => {
   return (
      <>
         <OnScrollPop />
         <Navbar />
         <SmartphoneHero
            image="/devicePage/smartphone-repair-feature-half.jpg"
            title="Samsung Galaxy repairs"
            description="Broken Samsung Galaxy? Our trusted experts can provide reliable repairs—fast."
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
