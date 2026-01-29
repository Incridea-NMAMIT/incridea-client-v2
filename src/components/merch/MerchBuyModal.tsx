import { useState } from "react";
import { X, User, Zap, Building2, Package, CheckCircle } from "lucide-react";
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
  productSize?: string;
}

const MerchBuyModal = ({
  isOpen,
  onClose,
  productName,
  productPrice,
  productSize,
}: MerchBuyModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // New state for success view

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MerchPurchaseFormData>({
    resolver: zodResolver(merchPurchaseSchema),
    defaultValues: {
      size: productSize as MerchPurchaseFormData['size'],
    },
  });

  const onSubmit = async (data: MerchPurchaseFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      setIsSubmitting(false);
      setIsSuccess(true); // Trigger success view

      // Close modal automatically after showing success for 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        onClose();
      }, 2500);
    }, 1500);
  };

  // Reset state when modal closes manually
  const handleClose = () => {
    setIsSuccess(false);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4 md:px-6 bg-black/50 backdrop-blur-sm overflow-y-auto py-4 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="w-full max-w-sm sm:max-w-md flex-shrink-0 my-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <LiquidGlassCard className="relative p-4 sm:p-6 md:p-8 max-h-300 overflow-y-auto min-h-[400px]">
              {/* Close Button (only show if not success state) */}
              {!isSuccess && (
                <button
                  onClick={handleClose}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
                  aria-label="Close modal"
                >
                  <X className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 hover:text-white" />
                </button>
              )}

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* SUCCESS ANIMATION VIEW */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                      className="w-24 h-24 bg-[#5924ae] rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(89,36,174,0.5)]"
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl font-bold text-white mb-2"
                    >
                      Payment Successful!
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-300"
                    >
                      Your order for {productName} has been placed.
                    </motion.p>
                  </motion.div>
                ) : (
                  /* FORM VIEW */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Header */}
                    <div className="mb-6 sm:mb-8 pt-2">
                      <h2 className="text-4xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                        {productName}
                      </h2>
                      <p className="text-gray-400">
                        Complete your details to proceed with the payment
                      </p>
                    </div>

                    {/* Price Display */}
                    <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-[#5924ae]/10 to-[#4a1d91]/10 border border-[#5924ae]/30 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 ">Order Total</span>
                        <span className="text-2xl sm:text-3xl font-bold text-[#bca4ff]">
                          ₹{productPrice}
                        </span>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* Name */}
                        <div>
                          <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                            <User className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-[#bca4ff]" />
                            Name
                          </label>
                          <input
                            {...register("name")}
                            type="text"
                            placeholder="Enter your name"
                            className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs sm:text-sm placeholder-gray-500/70 transition-all focus:outline-none group ${errors.name
                                ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500"
                                : "border-white/20 focus:bg-white/15 focus:border-[#bca4ff]/50"
                              }`}
                          />
                          {errors.name && (
                            <p className="text-red-400 text-xs mt-2">{errors.name.message}</p>
                          )}
                        </div>

                        {/* USN */}
                        <div>
                          <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                            <Zap className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-[#bca4ff]" />
                            USN
                          </label>
                          <input
                            {...register("usn")}
                            type="text"
                            placeholder="e.g., NNMXXYYZZZ"
                            className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs sm:text-sm placeholder-gray-500/70 transition-all focus:outline-none ${errors.usn
                                ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500"
                                : "border-white/20 focus:bg-white/15 focus:border-[#bca4ff]/50"
                              }`}
                          />
                          {errors.usn && (
                            <p className="text-red-400 text-xs mt-2">{errors.usn.message}</p>
                          )}
                        </div>
                      </div>

                      {/* College Name */}
                      <div>
                        <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                          <Building2 className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-[#bca4ff]" />
                          College Name
                        </label>
                        <input
                          {...register("collegeName")}
                          type="text"
                          placeholder="Enter your college name"
                          className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs sm:text-sm placeholder-gray-500/70 transition-all focus:outline-none ${errors.collegeName
                              ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500"
                              : "border-white/20 focus:bg-white/15 focus:border-[#bca4ff]/50"
                            }`}
                        />
                        {errors.collegeName && (
                          <p className="text-red-400 text-xs mt-2">{errors.collegeName.message}</p>
                        )}
                      </div>

                      {/* T-Shirt Size & Semester */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* Size */}
                        <div>
                          <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                            <Package className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-[#bca4ff]" />
                            T-Shirt Size
                          </label>
                          <select
                            {...register("size")}
                            className={`w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-3.5 text-sm text-white focus:outline-none focus:border-[#bca4ff]/50 transition-all appearance-none cursor-pointer ${errors.size ? "border-red-500/50" : ""
                              }`}
                          >
                            <option value="">Select a size</option>
                            <option value="XS">Extra Small (XS)</option>
                            <option value="S">Small (S)</option>
                            <option value="M">Medium (M)</option>
                            <option value="L">Large (L)</option>
                            <option value="XL">Extra Large (XL)</option>
                            <option value="XXL">2XL (XXL)</option>
                          </select>
                          {errors.size && (
                            <p className="text-red-400 text-xs mt-2">{errors.size.message}</p>
                          )}
                        </div>

                        {/* Semester */}
                        <div>
                          <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                            <Zap className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-[#bca4ff]" />
                            Semester
                          </label>
                          <select
                            {...register("semester")}
                            className={`w-full bg-slate-950/50 border border-white/10 rounded-lg px-3 py-3.5 text-sm text-white focus:outline-none focus:border-[#bca4ff]/50 transition-all appearance-none cursor-pointer ${errors.semester ? "border-red-500/50" : ""
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
                            <p className="text-red-400 text-xs mt-2">{errors.semester.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Branch */}
                      <div>
                        <label className="flex items-center text-xs sm:text-sm font-black text-white tracking-tight mb-2 sm:mb-3">
                          <Building2 className="w-4 sm:w-5 h-4 sm:h-5 mr-2.5 text-[#bca4ff]" />
                          Branch
                        </label>
                        <input
                          {...register("branch")}
                          type="text"
                          placeholder="e.g., CSE, ECE"
                          className={`w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border text-white text-xs sm:text-sm placeholder-gray-500/70 transition-all focus:outline-none ${errors.branch
                              ? "border-red-500/50 focus:bg-red-500/10 focus:border-red-500"
                              : "border-white/20 focus:bg-white/15 focus:border-[#bca4ff]/50"
                            }`}
                        />
                        {errors.branch && (
                          <p className="text-red-400 text-xs mt-2">{errors.branch.message}</p>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 pt-6 sm:pt-8">
                        <motion.button
                          type="button"
                          onClick={handleClose}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-white/5 border border-white/20 text-gray-200 font-bold text-xs sm:text-sm hover:bg-white/10 transition-all"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#4a1d91] to-[#5924ae] text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-[0_0_30px_rgba(89,36,174,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Processing..." : "Pay"}
                        </motion.button>
                      </div>
                    </form>

                    <p className="text-xs text-gray-500 text-center mt-4 sm:mt-6">
                      ✓ Secure payment • Your information is encrypted
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </LiquidGlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MerchBuyModal;
