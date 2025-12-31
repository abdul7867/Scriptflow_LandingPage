import React from "react";

interface IPhoneMockupProps {
  children?: React.ReactNode;
}

export const IPhoneMockup = ({ children }: IPhoneMockupProps) => {
  return (
    <div className="relative w-[300px] h-[600px]">
      {/* Outer Frame (Titanium) */}
      <div className="absolute inset-0 rounded-[55px] bg-[#1c1c1e] shadow-xl border-[6px] border-[#3a3a3c] overflow-hidden">
        
        {/* Inner Bezel */}
        <div className="absolute inset-[2px] rounded-[48px] border-[2px] border-black bg-black overflow-hidden flex flex-col">
          
          {/* Dynamic Island Area */}
          <div className="relative w-full h-8 flex justify-center items-center z-50 mt-3">
             <div className="w-28 h-7 bg-black rounded-full flex items-center justify-center gap-2 border border-zinc-800/50">
                 {/* Camera/Sensors */}
                 <div className="w-2 h-2 rounded-full bg-[#1c1c1e]" />
                 <div className="w-1.5 h-1.5 rounded-full bg-[#1c1c1e]" />
             </div>
          </div>

          {/* Screen Content */}
          <div className="relative flex-1 w-full h-full overflow-hidden bg-zinc-900">
            {children}
          </div>

        </div>

        {/* Buttons (Side) */}
        {/* Volume Up */}
        <div className="absolute top-[120px] -left-[8px] w-[8px] h-[40px] bg-[#3a3a3c] rounded-l-md" />
        {/* Volume Down */}
        <div className="absolute top-[170px] -left-[8px] w-[8px] h-[40px] bg-[#3a3a3c] rounded-l-md" />
        {/* Power */}
        <div className="absolute top-[140px] -right-[8px] w-[8px] h-[70px] bg-[#3a3a3c] rounded-r-md" />
      </div>

       {/* Glare Reflection */}
        <div className="absolute inset-0 rounded-[55px] pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent z-40 opacity-50" />
    </div>
  );
};
