import React from 'react'

const RepairSectionFooter = () => {
  return (
     <>
        <div className="mt-8">
           <hr className="border mb-6" />
           <div className="mt-4 flex items-center justify-between containers pb-20">
              <div className="">
                 <img src="/logo.jpg" alt="logo" className="h-8" />
                 <p className="text-[15px] mt-2 tracking-tight">© Letzfix 1992-2024. All rights reserved.</p>
              </div>
              <p className="flex gap-2">
                 <span className="">Privacy Policy</span>
                 <span className="">Terms of Use</span>
              </p>
           </div>
        </div>
     </>
  );
}

export default RepairSectionFooter