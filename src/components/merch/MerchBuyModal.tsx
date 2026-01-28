import { useState } from "react";
import { X, User, Zap, Building2, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LiquidGlassCard from "../liquidglass/LiquidGlassCard";
import { merchPurchaseSchema, type MerchPurchaseFormData } from "../../schemas/merchSchema";

interface MerchBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
}

const MerchBuyModal = ({
  isOpen,
  onClose,
  productName,
  productPrice,
}: MerchBuyModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MerchPurchaseFormData>({
    resolver: zodResolver(merchPurchaseSchema),
  });

  const onSubmit = async (data: MerchPurchaseFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      // TODO: Connect to actual API when ready (point 7)
      setIsSubmitting(false);
      reset();
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4 md:px-6 bg-black/50 backdrop-blur-sm overflow-y-auto py-4 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-sm sm:max-w-md flex-shrink-0 my-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <LiquidGlassCard className="relative p-4 sm:p-6 md:p-8 max-h-300 overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 hover:text-white" />
              </button>

              {/* Header */}
              <div className="mb-6 sm:mb-8 pt-2">
                <h2 className="text-4xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                  {productName}
                </h2>
                <p className="">
                  Complete your details to proceed with the payment
                </p>
              </div>

              {/* Price Display */}
              <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 ">Order Total</span>
                  <span className="text-2xl sm:text-3xl font-bold text-emerald-400">
                    ₹{productPrice}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                {/* Form Grid - 2 columns on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                      <User className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-purple-400" />
                      Name
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Enter your name"
                      className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs sm:text-sm placeholder-gray-500/70 transition-all focus:outline-none group ${
                        errors.name
                          ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                          : "border-white/20 focus:bg-white/15 focus:border-purple-400/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                      }`}
                    />
                    {errors.name && (
                      <motion.p 
                        className="text-red-400 text-xs mt-2"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* USN */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                      <Zap className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-purple-400" />
                      USN
                    </label>
                    <input
                      {...register("usn")}
                      type="text"
                      placeholder="e.g., NNMXXYYZZZ"
                      className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs sm:text-sm placeholder-gray-500/70 transition-all focus:outline-none ${
                        errors.usn
                          ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                          : "border-white/20 focus:bg-white/15 focus:border-purple-400/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                      }`}
                    />
                    {errors.usn && (
                      <motion.p 
                        className="text-red-400 text-xs mt-2"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.usn.message}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                {/* College Name - Full width */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                    <Building2 className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-purple-400" />
                    College Name
                  </label>
                  <input
                    {...register("collegeName")}
                    type="text"
                    placeholder="Enter your college name"
                    className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs sm:text-sm placeholder-gray-500/70 transition-all focus:outline-none ${
                      errors.collegeName
                        ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        : "border-white/20 focus:bg-white/15 focus:border-purple-400/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    }`}
                  />
                  {errors.collegeName && (
                    <motion.p 
                      className="text-red-400 text-xs mt-2"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.collegeName.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* T-Shirt Size & Semester - 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* T-Shirt Size */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                      <Package className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-purple-400" />
                      T-Shirt Size
                    </label>
                   <select
                     {...register("size")}
                    className={`w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white 
                    focus:outline-none focus:border-sky-500/50 transition-all appearance-none cursor-pointer ${
                     errors.size ? "border-red-500/50" : ""
                    }`}>
                        <option value="">Select a size</option>
                        <option value="XS">Extra Small (XS)</option>
                        <option value="S">Small (S)</option>
                        <option value="M">Medium (M)</option>
                        <option value="L">Large (L)</option>
                        <option value="XL">Extra Large (XL)</option>
                        <option value="XXL">2XL (XXL)</option></select>
                    {errors.size && (
                      <motion.p 
                        className="text-red-400 text-xs mt-2"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.size.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Semester */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                      <Zap className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-purple-400" />
                      Semester
                    </label>
                   <select
  {...register("semester")}
  className={`w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white 
  focus:outline-none focus:border-sky-500/50 transition-all appearance-none cursor-pointer ${
    errors.semester ? "border-red-500/50" : ""
  }`}
>
  <option value="">Select semester</option>
  <option value="1">1st Semester</option>
  <option value="2">2nd Semester</option>
  <option value="3">3rd Semester</option>
  <option value="4">4th Semester</option>
  <option value="5">5th Semester</option>
  <option value="6">6th Semester</option>
  <option value="7">7th Semester</option>
  <option value="8">8th Semester</option>
</select>

                    {errors.semester && (
                      <motion.p 
                        className="text-red-400 text-xs mt-2"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.semester.message}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                {/* Branch - Full width */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                    <Building2 className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-purple-400" />
                    Branch
                  </label>
                  <input
                    {...register("branch")}
                    type="text"
                    placeholder="e.g., CSE, ECE"
                    className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs sm:text-sm placeholder-gray-500/70 transition-all focus:outline-none ${
                      errors.branch
                        ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        : "border-white/20 focus:bg-white/15 focus:border-purple-400/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    }`}
                  />
                  {errors.branch && (
                    <motion.p 
                      className="text-red-400 text-xs mt-2"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.branch.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 sm:pt-8">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/20 text-gray-200 font-bold text-xs sm:text-sm hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-xl cursor-target"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] cursor-target"
                  >
                    {isSubmitting ? "Processing..." : "Pay"}
                  </motion.button>
                </div>
              </form>

              {/* Info Text */}
              <p className="text-xs text-gray-500 text-center mt-4 sm:mt-6 font-['Orbitron']">
                ✓ Secure payment • Your information is encrypted and safe
              </p>
            </LiquidGlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MerchBuyModal;
