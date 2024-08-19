import React from "react";

const Companies = () => {
   return (
      <>
         <div className="flex flex-wrap gap- items-center justify-center containers mt-14 mb-8 mr-4">
            <p className="text-slate-600 text-[14px]">Letzfix is trusted by 400 million worldwide</p>
            <div className="flex justify-center items-center">
               <img src="/Companies/google.png" alt="Google" className="w-[350px] md:border-r-2  " />
               <img src="/Companies/consumer_affairs.png" alt="consumer_affairs" className="w-[350px] md:mx-4 " />
               <img src="/Companies/amazon.png" alt="amazon" className="w-[350px]  md:border-l-2" />
            </div>
         </div>
      </>
   );
};

export default Companies;
