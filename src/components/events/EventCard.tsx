import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';

interface EventCardProps {
  imageUrl?: string;
}

const EventCard = ({
  imageUrl = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
}: EventCardProps) => {
  // The SVG mask data URI
  // This defines the specific S-Curve / notched shape
  const maskImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1452 2447'%3E%3Cpath d='M80 0h1292c44 0 80 36 80 80v2050c0 44-36 80-80 80h-480c-40 0-70 30-90 65-30 55-50 172-110 172H80c-44 0-80-36-80-80V80C0 36 36 0 80 0z'/%3E%3C/svg%3E")`;

  return (
    <div className="flex w-full items-center justify-center p-12 font-sans">

      {/* Positioning Wrapper (Group for hover) */}
      <div className="relative w-[300px] aspect-[1452/2447.19] group">

        {/* Masked Layer (The Card Shape) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          }}
        >
          {/* Inner Content Area (Glass Effect) */}
          <div className="flex h-full w-full flex-col gap-[8px] border border-white/25 bg-white/[0.11] p-[20px_16px_10px] backdrop-blur-[30px]">

            {/* Shimmer Effect */}
            {/* Note: Requires the custom keyframe defined in styles below or tailwind config */}
            <div className="pointer-events-none absolute inset-0 animate-shine bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.09)_50%,transparent_65%)] bg-[length:280%_100%]" />

            {/* Image Block (1080x1350 Ratio) */}
            <div className="mb-[6px] w-full aspect-[1080/1350] rounded-[16px] overflow-hidden bg-black/30 border border-white/20">
              <img
                src={imageUrl}
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Title */}
            {/* Event Title */}
            <div className="ml-1 mt-3 mb-1 text-[13px] font-bold uppercase tracking-[1.5px] text-white/90 truncate">
              EVENT NAME
            </div>

            {/* Details */}
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
        </div>

        {/* CORE (Outside Mask) */}
        <div className="absolute bottom-[1.5%] right-[8%] text-[20px] tracking-[0.25em] text-white/40 group-hover:text-white/60 transition font-bold select-none pointer-events-none z-0">
          CORE
        </div>
      </div>

      {/* Inject custom keyframes for the shimmer animation */}
      <style>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shine {
          animation: shine 12s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default EventCard;