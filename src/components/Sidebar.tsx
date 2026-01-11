import {
  Home,
  Calendar,
  Image,
  Info,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const items = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Calendar, path: "/events", label: "Events" },
    { icon: Image, path: "/gallery", label: "Gallery" },
    { icon: Info, path: "/about", label: "About" },
    { icon: Phone, path: "/contact", label: "Contact" },
    { icon: ShieldCheck, path: "/privacy", label: "Privacy" },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-99999">
      <div
        className="
          flex flex-col gap-6 p-3
          rounded-2xl
          backdrop-blur-xl
        "
      >
        {items.map(({ icon: Icon, path, label }) => (
          <NavLink
            key={path}
            to={path}
            title={label}
            className={({ isActive }) => `
              w-11 h-11 rounded-xl
              flex items-center justify-center
              transition-all duration-300
              ${
                isActive
                  ? "bg-linear-to-b from-purple-500 to-purple-700 text-white shadow-[0_0_22px_rgba(168,85,247,0.5)]  cursor-target"
                  : "bg-white/10 text-purple-200 hover:bg-purple-500/30 hover:shadow-[0_0_14px_rgba(168,85,247,0.5)]  cursor-target"
              }
            `}
          >
            <Icon size={20} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
