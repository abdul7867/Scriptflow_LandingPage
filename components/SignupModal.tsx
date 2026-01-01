"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, User, Mail, Instagram, Sparkles, AlertCircle } from "lucide-react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  instagramId: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  instagramId?: string;
  general?: string;
}

interface SignupResponse {
  success: boolean;
  message?: string;
  errors?: string[];
  data?: {
    spotNumber: number;
    totalSpots: number;
    spotsRemaining: number;
  };
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    instagramId: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [spotNumber, setSpotNumber] = useState<number | null>(null);
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.instagramId.trim()) {
      newErrors.instagramId = "Instagram ID is required";
    } else if (!/^@?[\w.]+$/.test(formData.instagramId)) {
      newErrors.instagramId = "Please enter a valid Instagram username";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Format Instagram ID (remove @ if present)
      const instagramId = formData.instagramId.startsWith("@")
        ? formData.instagramId.slice(1)
        : formData.instagramId;

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          instagramId 
        }),
      });

      const result: SignupResponse = await response.json();

      if (!response.ok || !result.success) {
        // Handle specific errors
        if (result.errors && result.errors.length > 0) {
          if (result.errors[0].toLowerCase().includes('email')) {
            setErrors({ email: result.errors[0] });
          } else if (result.errors[0].toLowerCase().includes('instagram')) {
            setErrors({ instagramId: result.errors[0] });
          } else if (result.errors[0].toLowerCase().includes('name')) {
            setErrors({ name: result.errors[0] });
          } else {
            setErrors({ general: result.errors[0] });
          }
        } else {
          setErrors({ general: 'Something went wrong. Please try again.' });
        }
        return;
      }

      // Success!
      if (result.data) {
        setSpotNumber(result.data.spotNumber);
        setSpotsRemaining(result.data.spotsRemaining);
      }
      setIsSuccess(true);

    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      // Reset form after animation
      setTimeout(() => {
        setFormData({ name: "", email: "", instagramId: "" });
        setErrors({});
        setIsSuccess(false);
        setSpotNumber(null);
        setSpotsRemaining(null);
      }, 300);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-acid-lime/20 rounded-full blur-[80px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative p-8">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Header */}
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring" }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-acid-lime/10 border border-acid-lime/20 mb-4"
                      >
                        <Sparkles className="w-8 h-8 text-acid-lime" />
                      </motion.div>
                      <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">
                        Join the Waitlist
                      </h2>
                      <p className="text-zinc-400 text-sm">
                        Be among the first 100 creators to access ScriptFlow.{" "}
                        <span className="text-acid-lime font-medium">
                          100% Free during beta.
                        </span>
                      </p>
                    </div>

                    {/* General Error */}
                    {errors.general && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-400">{errors.general}</p>
                      </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name Field */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="John Doe"
                            disabled={isSubmitting}
                            className={`w-full pl-12 pr-4 py-3.5 bg-black/50 border ${
                              errors.name
                                ? "border-red-500/50"
                                : "border-white/10 focus:border-acid-lime/50"
                            } rounded-xl text-white placeholder-zinc-600 outline-none transition-colors disabled:opacity-50`}
                          />
                        </div>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-400"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="you@example.com"
                            disabled={isSubmitting}
                            className={`w-full pl-12 pr-4 py-3.5 bg-black/50 border ${
                              errors.email
                                ? "border-red-500/50"
                                : "border-white/10 focus:border-acid-lime/50"
                            } rounded-xl text-white placeholder-zinc-600 outline-none transition-colors disabled:opacity-50`}
                          />
                        </div>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-400"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>

                      {/* Instagram ID Field */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Instagram Username
                        </label>
                        <div className="relative">
                          <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                          <input
                            type="text"
                            value={formData.instagramId}
                            onChange={(e) =>
                              handleInputChange("instagramId", e.target.value)
                            }
                            placeholder="@yourusername"
                            disabled={isSubmitting}
                            className={`w-full pl-12 pr-4 py-3.5 bg-black/50 border ${
                              errors.instagramId
                                ? "border-red-500/50"
                                : "border-white/10 focus:border-acid-lime/50"
                            } rounded-xl text-white placeholder-zinc-600 outline-none transition-colors disabled:opacity-50`}
                          />
                        </div>
                        {errors.instagramId && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-400"
                          >
                            {errors.instagramId}
                          </motion.p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className="w-full py-4 bg-acid-lime text-black font-bold text-lg rounded-xl shadow-[0_0_30px_rgba(189,255,0,0.3)] hover:shadow-[0_0_40px_rgba(189,255,0,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Joining...
                          </>
                        ) : (
                          "Secure My Spot"
                        )}
                      </motion.button>

                      {/* Privacy Note */}
                      <p className="text-center text-xs text-zinc-500">
                        🔒 No spam. No credit card required. Your data is secure.
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-acid-lime/20 border-2 border-acid-lime mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-acid-lime" />
                    </motion.div>

                    <h3 className="font-heading font-bold text-2xl text-white mb-3">
                      You&apos;re In! 🎉
                    </h3>
                    
                    {spotNumber && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4 inline-block px-4 py-2 bg-acid-lime/10 border border-acid-lime/20 rounded-full"
                      >
                        <span className="text-acid-lime font-bold">Spot #{spotNumber}</span>
                        <span className="text-zinc-400"> of 100</span>
                      </motion.div>
                    )}

                    <p className="text-zinc-400 mb-2">
                      Welcome aboard, <span className="text-white font-medium">{formData.name}</span>!
                    </p>
                    <p className="text-zinc-500 text-sm mb-6">
                      We&apos;ll notify you at <span className="text-acid-lime">{formData.email}</span> when it&apos;s your turn.
                    </p>

                    {spotsRemaining !== null && spotsRemaining > 0 && (
                      <p className="text-zinc-500 text-xs mb-6">
                        Only <span className="text-white font-bold">{spotsRemaining} spots</span> remaining!
                      </p>
                    )}

                    <motion.button
                      onClick={handleClose}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/10 transition-colors"
                    >
                      Close
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
