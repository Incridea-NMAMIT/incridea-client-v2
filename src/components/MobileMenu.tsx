import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, ChevronLeft, Home, Calendar, Image, Info, Phone, Music } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import GlassSurface from "./GlassSurface";

interface MobileMenuProps {
    onLogout: () => void;
    isAuthenticated: boolean;
}

const MobileMenu = ({ onLogout, isAuthenticated }: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const links = [
        { icon: Home, path: "/", label: "Home" },
        { icon: Calendar, path: "/events", label: "Events" },
        { icon: Music, path: "/pronite", label: "Pronite" },
        { icon: Image, path: "/gallery", label: "Gallery" },
        { icon: Info, path: "/about", label: "About" },
        { icon: Phone, path: "/contact", label: "Contact" },
    ];

    // Animation Variants
    const drawerVariants: Variants = {
        initial: { x: "100%" },
        animate: {
            x: 0,
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 300
            }
        },
        exit: {
            x: "100%",
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 300,
                when: "afterChildren"
            }
        }
    };

    const contentVariants: Variants = {
        initial: { opacity: 1 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.02
            }
        },
        exit: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
                staggerDirection: -1 // Reverse order (bottom to top)
            }
        }
    };

    const itemVariants: Variants = {
        initial: { opacity: 0, x: 50 },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            x: 50,
            transition: {
                duration: 0.05,
                ease: "easeIn"
            }
        }
    };

    return (
        <div className="lg:hidden">
            {/* Toggle Button */}
            <button
                onClick={toggleMenu}
                className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:text-purple-300 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            >
                <Menu size={24} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/10 z-40"
                            onClick={toggleMenu}
                        />

                        {/* Drawer content wrapped in GlassSurface */}
                        <motion.div
                            key="drawer"
                            variants={drawerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="fixed inset-0 z-50 flex"
                        >
                            <GlassSurface
                                width="100%"
                                height="100%"
                                borderRadius={0}
                                opacity={0.6}
                                blur={20}
                                backgroundOpacity={0.8}
                                className="w-full h-full"
                                forceDark
                            >
                                <motion.div
                                    variants={contentVariants}
                                    className="flex flex-col w-full h-full pt-6 pb-10 px-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
                                >
                                    {/* Header: Back Arrow */}
                                    <motion.div className="flex justify-start mb-8">
                                        <button
                                            onClick={toggleMenu}
                                            className="p-2 -ml-2 text-white/80 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            <ChevronLeft size={32} />
                                        </button>
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold text-white mb-10 tracking-tight">Menu</motion.h1>

                                    {/* Main Navigation */}
                                    <div className="flex flex-col gap-6 md:gap-10 w-full flex-grow">
                                        {links.map(({ icon: Icon, path, label }) => (
                                            <motion.div
                                                key={path}
                                                variants={itemVariants}
                                                className="w-full"
                                            >
                                                <NavLink
                                                    to={path}
                                                    onClick={toggleMenu}
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-5 text-2xl md:text-4xl font-medium transition-colors ${isActive ? "text-purple-300" : "text-white/80 hover:text-white"
                                                        }`
                                                    }
                                                >
                                                    <Icon className="w-6 h-6 md:w-10 md:h-10" strokeWidth={1.5} />
                                                    {label}
                                                </NavLink>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Footer Links (Privacy, Logout, etc) */}
                                    <div className="flex flex-col gap-4 md:gap-6 mt-8 pt-8 border-t border-white/10">
                                        {[
                                            { path: "/privacy", label: "Privacy Policy" },
                                            { path: "/rules", label: "Terms & Conditions" },
                                            { path: "/guidelines", label: "Guidelines" },
                                            { path: "/refund", label: "Refund Policy" },
                                        ].map(({ path, label }) => (
                                            <motion.div key={path} variants={itemVariants}>
                                                <NavLink
                                                    to={path}
                                                    onClick={toggleMenu}
                                                    className="text-base md:text-2xl font-medium text-white/60 hover:text-white transition-colors"
                                                >
                                                    {label}
                                                </NavLink>
                                            </motion.div>
                                        ))}



                                        {isAuthenticated ? (
                                            <motion.button
                                                variants={itemVariants}
                                                onClick={() => {
                                                    onLogout();
                                                    toggleMenu();
                                                }}
                                                className="text-xl md:text-3xl font-bold text-white flex items-center gap-3 mt-4 hover:opacity-70 transition-opacity"
                                            >
                                                Logout
                                            </motion.button>
                                        ) : (
                                            <motion.div variants={itemVariants}>
                                                <NavLink
                                                    to="/login"
                                                    onClick={toggleMenu}
                                                    className="text-xl md:text-3xl font-bold text-white flex items-center gap-3 mt-4 hover:opacity-70 transition-opacity"
                                                >
                                                    Sign In
                                                </NavLink>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            </GlassSurface>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileMenu;
