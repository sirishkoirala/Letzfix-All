import React from "react";
import OnScrollPop from "../components/OnScrollPop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmartphoneHero from "../components/SmartphoneHero";
import CompaniesInRepair from "../components/CompaniesInRepair";
import WhatWeCanFixForYou from "../components/WhatWeCanFixForYou";
import VideoBlock from "../components/VideoBlock";
import RepairsReplacements from "../components/RepairsReplacements";
import SmartPhones from "../components/SmartPhones";
import AnySmartphonesNewOrOld from "../components/AnySmartphonesNewOrOld";
import RepairsAreSimple from "../components/RepairsAreSimple";

const page = () => {
   return (
      <>
         <OnScrollPop />
         <Navbar />
         <SmartphoneHero
            image="/devicePage/smartphone-repair-feature-half.jpg"
            title="Smartphone repairs"
            description="Broken Smartphone? Our trusted experts can provide reliable repairs—fast."
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
