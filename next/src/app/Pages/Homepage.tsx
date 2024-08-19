"use client";
import React from "react";
import Navbar from "../components/Navbar";
import HeroHomePage from "../components/HeroHomePage";
import OnScrollPop from "../components/OnScrollPop";
import Companies from "../components/Companies";
import FeatureTitle from "../components/FeatureTitle";
import FeatureCard from "../components/FeatureCard";
import Feature2 from "../components/Feature2";
import LogoSupports from "../components/LogoSupports";
import BlackBanner from "../components/BlackBanner";
import VideoBlock from "../components/VideoBlock";
import TechRepairDoneRight from "../components/TechRepairDoneRight";
import WhatWeCanFixForYou from "../components/WhatWeCanFixForYou";
import DeviceCardContianer from "../components/DeviceCardContianer";
import SmartPhones from "../components/SmartPhones";
import YourTechFixed from "../components/YourTechFixed";
import Footer from "../components/Footer";

const Homepage: React.FC = () => {
   return (
      <>
         <OnScrollPop />
         <Navbar />
         <HeroHomePage />
         <DeviceCardContianer />
         <Companies />
         <FeatureTitle />
         <FeatureCard />
         <Feature2 />
         <LogoSupports />
         <BlackBanner />
         <VideoBlock />
         <TechRepairDoneRight />
         <WhatWeCanFixForYou />
         <SmartPhones />
         <YourTechFixed />
         <Footer />
      </>
   );
};

export default Homepage;
