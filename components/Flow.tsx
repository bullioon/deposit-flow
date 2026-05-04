"use client";

import { useState } from "react";
import EmailStep from "./EmailStep";
import InfoStep from "./InfoStep";
import SimpleDepositModal from "./SimpleDepositModal";

export default function Flow() {
  const [step, setStep] = useState<"email" | "info" | "deposit">("email");

  return (
    <>
      {step === "email" && (
        <EmailStep onContinue={() => setStep("info")} />
      )}

      {step === "info" && (
        <InfoStep onContinue={() => setStep("deposit")} />
      )}

      {step === "deposit" && <SimpleDepositModal />}
    </>
  );
}