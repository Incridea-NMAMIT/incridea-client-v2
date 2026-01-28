import { useState, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiquidGlassCard from "../components/liquidglass/LiquidGlassCard";
import MerchBuyModal from "../components/merch/MerchBuyModal";
import TShirt3DModel from "../components/merch/TShirt3DModel";
import { Sparkles, Box, Shirt, Zap, Rotate3d } from "lucide-react";

// Inline CSS for custom animations
const styles = `
  @keyframes shimmer {
    0% { transform: translateX(-150%); }
    100% { transform: translateX(200%); }
  }
  @keyframes scan {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
  }
  .animate-shimmer {
    animation: shimmer 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-scan {
    animation: scan 4s linear infinite;
  }
`;

const Merch = () => {
  const [showModal, setShowModal] = useState(false);
  const defaultSize = "M";

  // Scroll Animation Hooks
  const { scrollY } = useScroll();
  // Fade out opacity from 1 to 0 as user scrolls from 0px to 300px
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  // Move header up slightly as it fades
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  // Disable pointer events when faded out so it doesn't block clicks
  const headerPointerEvents = useTransform(scrollY, (y) => y > 300 ? 'none' : 'auto');

  const tshirtItem = {
    id: "tshirt",
    name: "Incridea T-Shirt",
    edition: "MK-IV EDITION",
    price: 499,
    description:
      "Premium quality Incridea event t-shirt. Made with comfortable cotton blend fabric. Perfect memorabilia from your event experience.",
    details: [
      { icon: Box, text: "100% Premium Cotton Blend" },
      { icon: Zap, text: "Comfortable fit and durable" },
      { icon: Shirt, text: "Available in 6 sizes (XS - XXL)" },
      { icon: Sparkles, text: "Vibrant Incridea branding" },
    ],
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleBuyClick = () => {
    setShowModal(true);
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <style>{styles}</style>

      {/* Background */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: "url('/eventpagebg/eventbg2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(52,211,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50" />
      </div>

      {/* Container with responsive padding */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        
        {/* HEADER WITH SCROLL ANIMATION */}
        <motion.header
          className="mb-8 sm:mb-12 lg:mb-16 text-center sticky top-0 z-0"
          style={{ 
            opacity: headerOpacity, 
            y: headerY,
            pointerEvents: headerPointerEvents
          }}
          transition={{ duration: 0.8 }}
        >
           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-emerald-400 tracking-tighter uppercase drop-shadow-[0_0_25px_rgba(52,211,153,0.4)] mb-3 sm:mb-4">
              Merch Incridea
            </h1>
          <p className="text-emerald-400/80 font-mono text-[10px] sm:text-xs md:text-sm tracking-widest uppercase">&gt; Exclusive event gear_</p>
        </motion.header>

        {/* UNIFIED CARD - z-10 ensures it slides OVER the fading header */}
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <LiquidGlassCard className="p-0 !rounded-2xl sm:!rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative w-full">
            
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-black/40 to-purple-900/10 pointer-events-none" />

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
              
              {/* LEFT PANEL (Info) */}
              <div className="p-6 sm:p-10 lg:p-12 flex flex-col gap-6 sm:gap-8">
                
                {/* Header Section */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-emerald-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase bg-emerald-950/50 px-2 sm:px-3 py-1.5 rounded-lg border border-emerald-500/20 shadow-inner whitespace-nowrap">
                      {tshirtItem.edition}
                    </span>
                    <span className="px-2 sm:px-3 py-1.5 bg-emerald-500 text-black font-extrabold text-[9px] sm:text-[10px] rounded-full uppercase tracking-wide shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-1 whitespace-nowrap">
                      <Zap size={10} className="fill-black" /> Limited Stock
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none break-words">
                    {tshirtItem.name}
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light border-l-2 border-emerald-500/30 pl-4">
                    {tshirtItem.description}
                  </p>
                </div>

                {/* Specs Section */}
                <div className="bg-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Box className="w-16 h-16 sm:w-24 sm:h-24 text-emerald-500" />
                  </div>
                  <h3 className="text-[10px] sm:text-xs font-bold text-emerald-400 mb-4 sm:mb-6 uppercase tracking-[0.2em] font-mono flex items-center gap-2 relative z-10">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Technical Specs
                  </h3>
                  <div className="space-y-3 sm:space-y-4 relative z-10">
                    {tshirtItem.details.map((detail, idx) => {
                      const Icon = detail.icon;
                      return (
                        <div key={idx} className="flex items-center gap-3 sm:gap-4 group/item p-2 rounded-xl hover:bg-white/5 transition-colors">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-emerald-500/20 group-hover/item:border-emerald-500/40 transition-all duration-300">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                          </div>
                          <span className="text-gray-300 text-sm font-medium group-hover/item:text-white transition-colors">
                            {detail.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sizes Section */}
                <div>
                  <h3 className="text-[10px] sm:text-xs font-bold text-emerald-400 mb-3 sm:mb-5 uppercase tracking-[0.2em] font-mono flex items-center gap-2">
                    <Shirt className="w-4 h-4" />
                    Sizes Available
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-black/40 text-gray-400 font-bold text-xs border border-white/5 hover:border-emerald-500/50 hover:text-white hover:bg-emerald-500/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-default"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL (Visuals & Action) */}
              <div className="p-6 sm:p-10 lg:p-12 flex flex-col gap-6 sm:gap-8 bg-black/20 relative">
                
                {/* 3D Model Card */}
                <div className="relative w-full aspect-square bg-[#0a0b10]/60 backdrop-blur-md rounded-2xl sm:rounded-[2rem] border border-white/10 flex flex-col items-center justify-center overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-emerald-500/5 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(52,211,153,0.03)_50%,transparent_60%)] bg-[length:100%_4px] pointer-events-none animate-scan opacity-30" />
                    
                    {/* Corners */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-emerald-500/40 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-emerald-500/40 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-emerald-500/40 rounded-br-lg" />

                    <div className="relative w-full h-full flex items-center justify-center z-20 cursor-grab active:cursor-grabbing">
                      <Suspense
                        fallback={
                          <div className="flex flex-col items-center justify-center gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
                            <span className="text-emerald-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase animate-pulse">Loading Model_</span>
                          </div>
                        }
                      >
                        <TShirt3DModel modelPath="/models/shirt.glb" />
                      </Suspense>
                    </div>

                    <div className="absolute bottom-6 sm:bottom-8 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <Rotate3d className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 animate-spin-slow" />
                      <span className="text-[8px] sm:text-[10px] text-gray-300 font-mono tracking-wider uppercase">Drag to Rotate</span>
                    </div>

                    <div className="absolute top-6 sm:top-8 text-white/90 font-black text-xl sm:text-2xl tracking-tight z-20 mix-blend-overlay opacity-50 uppercase pointer-events-none">
                      3D Preview
                    </div>
                </div>

                {/* Price & Action Block */}
                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-center px-2">
                      <span className="text-gray-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest">Total Price</span>
                      <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">₹{tshirtItem.price}</span>
                  </div>

                  {/* PARALLELOGRAM BUTTON - Responsive */}
                  <motion.button
                    onClick={handleBuyClick}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="relative w-full py-4 sm:py-5 -skew-x-[20deg] bg-[#00a676]/90 hover:bg-[#00a676] text-white font-black uppercase tracking-[0.15em] text-xs sm:text-sm rounded-lg border border-white/20 shadow-[0_0_30px_rgba(0,166,118,0.3)] hover:shadow-[0_0_50px_rgba(0,166,118,0.5)] backdrop-blur-md transition-all duration-300 overflow-hidden group cursor-pointer"
                  >
                    {/* Content un-skewed */}
                    <span className="relative z-10 flex items-center justify-center gap-2 skew-x-[20deg]">
                      Buy Now <Zap size={16} className="fill-white" />
                    </span>
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full -translate-x-full animate-shimmer skew-x-[20deg]" />
                  </motion.button>
                </div>

              </div>
            </div>
          </LiquidGlassCard>
        </motion.div>

        <MerchBuyModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          productName={tshirtItem.name}
          productPrice={tshirtItem.price}
          productSize={defaultSize} 
        />
      </div>
    </div>
  );
};

export default Merch;
