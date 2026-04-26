"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import EmailStep from "./EmailStep";
import InfoStep from "./InfoStep";
import DepositStep from "./DepositStep";

type Step = "email" | "info" | "deposit";

export default function OnboardingModal() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");

  // 🔥 CAMBIA AQUÍ TU DESTINO
  const goHome = () => {

    // 👉 OPCIÓN 2 (externo)
    window.location.href = "https://www.coinbase.com";
  };

  return (
    <div className="min-h-screen bg-[#050607] text-white">
      
      {/* LOGO */}
      <button
        onClick={goHome}
        className="fixed left-[38px] top-[32px] cursor-pointer"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={44}
          height={44}
          priority
          className="h-[44px] w-[44px] object-contain"
        />
      </button>

      {/* CLOSE */}
      <button
        onClick={goHome}
        className="fixed right-[38px] top-[35px] text-white/70 hover:text-white transition"
      >
        <X size={28} strokeWidth={2.2} />
      </button>

      {/* CONTENT */}
      <div className="flex min-h-screen items-center justify-center px-6 -mt-[35px]">
        <div className="w-full max-w-[480px]">

          {step === "email" && (
            <EmailStep onContinue={() => setStep("info")} />
          )}

          {step === "info" && (
            <InfoStep onContinue={() => setStep("deposit")} />
          )}

          {step === "deposit" && <DepositStep />}

        </div>
      </div>
    </div>
  );
}