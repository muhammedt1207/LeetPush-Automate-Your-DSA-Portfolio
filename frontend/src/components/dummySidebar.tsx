"use client";
 
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
 
const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
 
  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
 
  return (
   <>
     <div>
       
         <div className="mb-4 space-y-2">
             
              
                 <button className="w-full flex items-center gap-2 border !border-[#5C50E4] text-sm !rounded-3xl text-[#5C50E4] py-2 px-4 transition">
                   <Image src="/assets/plus.svg" alt="Plus" width={20} height={20} />
                   Create Test
                 </button>
                 <button className="w-full flex items-center gap-2 mt-2 border !border-[#5C50E4] bg-[#5C50E4] text-sm !rounded-3xl text-white py-2 px-4 transition">
                   <Image src="/assets/home.svg" alt="Home" width={20} height={20} />
                   Home
                 </button>
               </div>
       <div className="mt-6 mb-4">
         <p className="text-sm font-semibold text-gray-600">STUDY</p>
       </div>
 
       {/* Dropdowns */}
       {[1, 2, 3, 4].map((item, index) => (
         <div className="mb-2" key={index}>
           <button
             onClick={() => toggleDropdown(index)}
             className="flex justify-between items-center w-full py-2 px-4 "
           >
             <div className="flex gap-2 items-center">
               <Image src="/assets/sidebarico.svg" alt="Icon" width={20} height={20} className="w-4" />
               <p className="text-sm font-medium text-[#000] p-0 m-0">Step {item} - Preclinical</p>
             </div>
             {openDropdown === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
           </button>
           {openDropdown === index && (
             <div className="mt-2 ml-4 space-y-1 text-sm">
               <a href="#" className="block text-gray-700 hover:underline">Item 1</a>
               <a href="#" className="block text-gray-700 hover:underline">Item 2</a>
               <a href="#" className="block text-gray-700 hover:underline">Item 3</a>
             </div>
           )}
         </div>
       ))}
     </div>
 
     {/* Bottom Buttons */}
     <div className="space-y-2 pt-4 mt-6 absolute bottom-0 ">
     <div className="mt-6 mb-4">
         <p className="text-sm font-semibold text-gray-600">SETTINGS</p>
       </div>
       <button className="w-full flex items-center gap-2 text-sm text-gray-700 hover:text-[#5C50E4] transition">
         <Image src="/assets/setting.svg" alt="Settings" width={20} height={20} />
         Settings
       </button>
       <button className="w-full flex items-center gap-2 text-sm  text-red-500 transition">
         <Image src="/assets/Vector.svg" alt="Logout" width={20} height={20} />
         Logout
       </button>
     </div>
   </>
  );
};
 
export default Sidebar;
 
 