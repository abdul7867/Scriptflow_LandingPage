"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import SignupModal from "@/components/SignupModal";

interface SignupContextType {
  openSignupModal: () => void;
  closeSignupModal: () => void;
  isModalOpen: boolean;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export function useSignup() {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
}

interface SignupProviderProps {
  children: ReactNode;
}

export function SignupProvider({ children }: SignupProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSignupModal = () => setIsModalOpen(true);
  const closeSignupModal = () => setIsModalOpen(false);

  return (
    <SignupContext.Provider
      value={{ openSignupModal, closeSignupModal, isModalOpen }}
    >
      {children}
      <SignupModal isOpen={isModalOpen} onClose={closeSignupModal} />
    </SignupContext.Provider>
  );
}
