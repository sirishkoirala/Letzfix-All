import React from "react";

const VideoBlock = () => {
   return (
      <>
         <div className="containers">
            <div className="py-10">
               <h1 className="text-[40px] font-light leading-[46px] text-center my-10">Come to a store near you</h1>
            </div>
            <div className="flex test  items-center justify-center mx-auto h-[450px] w-[900px] mb-20 ">
               <iframe
                  width="900"
                  height="450"
                  src="https://www.youtube.com/embed/zKpZlLBB6Cc"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
               ></iframe>
            </div>
         </div>
      </>
   );
};

export default VideoBlock;
