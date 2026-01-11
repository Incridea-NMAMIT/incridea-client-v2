import { Calendar, Users, MapPin } from "lucide-react";

// Path from EventCard.tsx (ViewBox: 0 0 1452 2447)
const cardPath = `M80 0h1292c44 0 80 36 80 80v2050c0 44-36 80-80 80h-480c-40 0-70 30-90 65-30 55-50 172-110 172H80c-44 0-80-36-80-80V80C0 36 36 0 80 0z`;

interface AnimatedGlassCardProps {
  imageUrl?: string;
  title?: string;
}

const AnimatedGlassCard = ({
  imageUrl = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  title = "Event Name",
}: AnimatedGlassCardProps) => {
  return (
    <div className="relative w-[300px] aspect-[1452/2447.19] group perspective-[1200px]">

      {/* SVG GLASS */}
      <svg
        className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.01]"
        viewBox="0 0 1452 2447"
        preserveAspectRatio="none"
      >
        <defs>
          {/* MASK */}
          <mask id="glass-mask">
            <rect width="100%" height="100%" fill="black" />
            <path d={cardPath} fill="white" />
          </mask>

          {/* BLUR (IDLE) */}
          <filter id="glass-blur-idle">
            <feGaussianBlur stdDeviation="30" />
          </filter>

          {/* BLUR (HOVER) */}
          <filter id="glass-blur-hover">
            <feGaussianBlur stdDeviation="40" />
          </filter>

          {/* BASE GLASS */}
          <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.9" />
          </linearGradient>

          {/* SHIMMER (HOVER ONLY) */}
          <linearGradient id="glass-shine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.25" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-1 0"
              to="1 0"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* BORDER */}
          <linearGradient id="border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* GLASS BASE (IDLE) */}
        <rect
          width="100%"
          height="100%"
          fill="url(#glass-grad)"
          filter="url(#glass-blur-idle)"
          mask="url(#glass-mask)"
          className="group-hover:opacity-0 transition-opacity duration-300"
        />

        {/* GLASS BASE (HOVER) */}
        <rect
          width="100%"
          height="100%"
          fill="url(#glass-grad)"
          filter="url(#glass-blur-hover)"
          mask="url(#glass-mask)"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* SHIMMER (ONLY ON HOVER) */}
        <rect
          width="100%"
          height="100%"
          fill="url(#glass-shine)"
          mask="url(#glass-mask)"
          className="opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        />

        {/* BORDER */}
        <path
          d={cardPath}
          fill="none"
          stroke="url(#border-grad)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* CONTENT */}
      <div
        className="absolute inset-0 p-[12px] text-white flex flex-col transition-transform duration-500 group-hover:-translate-y-0.5"
        style={{
          clipPath: 'none',
        }}
      >
        {/* IMAGE: 4:5 Aspect Ratio (1080x1350) */}
        <div className="w-full aspect-[4/5] rounded-[16px] overflow-hidden bg-black/30 shadow-sm border border-white/20">
          <img
            src={imageUrl}
            alt="Event"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* TITLE */}
        <div className="ml-1 mt-3 mb-1 text-[13px] font-bold uppercase tracking-[1.5px] text-white/90 truncate">
          {title}
        </div>

        {/* DETAILS */}
        <div className="mt-auto space-y-2 pb-5 pl-1">
          {/* Date */}
          <div className="flex h-[32px] w-[230px] items-center gap-[8px] rounded-full border border-white/[0.13] bg-white/[0.085] px-3 backdrop-blur-[6px] text-white pl-5">
            <Calendar size={13} className="opacity-80" />
            <span className="text-[11px] font-medium tracking-wide">5 Mar, 9.30 AM</span>
          </div>

          {/* Team */}
          <div className="flex h-[32px] w-[230px] items-center gap-[8px] rounded-full border border-white/[0.13] bg-white/[0.085] px-3 backdrop-blur-[6px] text-white pl-5">
            <Users size={13} className="opacity-80" />
            <span className="text-[11px] font-medium tracking-wide">5 per team</span>
          </div>

          {/* Location */}
          <div className="flex h-[32px] w-[130px] items-center gap-[8px] rounded-full border border-white/[0.13] bg-white/[0.085] px-3 backdrop-blur-[6px] text-white pl-5">
            <MapPin size={13} className="opacity-80" />
            <span className="text-[11px] font-medium tracking-wide">NITTE</span>
          </div>
        </div>
      </div>

      {/* CORE */}
      <div className="absolute bottom-[1.5%] right-[8%] text-[20px] tracking-[0.25em] text-white/40 group-hover:text-white/60 transition font-bold select-none pointer-events-none">
        CORE
      </div>
    </div>
  );
};

export default AnimatedGlassCard;
