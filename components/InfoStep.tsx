"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Props = {
  onContinue: () => void;
};

export default function InfoStep({ onContinue }: Props) {
  const [usd, setUsd] = useState("125,000");
  const [solPrice, setSolPrice] = useState<number | null>(null);

  useEffect(() => {
    async function getSolPrice() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await res.json();
        setSolPrice(data.solana.usd);
      } catch (error) {
        console.error("Error fetching SOL price:", error);
      }
    }

    getSolPrice();
    const interval = setInterval(getSolPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const usdNumber = Number(usd.replace(/,/g, ""));
  const solAmount =
    solPrice && usdNumber ? (usdNumber / solPrice).toFixed(4) : "0.0000";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] rounded-[28px] border bg-white shadow-sm p-6">

        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-[700] text-black">
            You're verified
          </h2>

          <button className="rounded-full p-2 hover:bg-gray-100">
            <X size={18} className="text-black/60" />
          </button>
        </div>

        {/* TEXT */}
        <p className="mb-5 text-[14px] text-black/60 text-center">
          The deposit amount to confirm is 125,000 USDC.
        </p>

        {/* AMOUNT BOX */}
        <div className="mb-5 rounded-[18px] border px-4 py-4">
          <label className="mb-2 block text-[13px] font-semibold text-black">
            Amount
          </label>

          <div className="flex items-center gap-2">
            <span className="text-[24px] font-semibold">$</span>
            <input
              value={usd}
              onChange={(e) => setUsd(e.target.value)}
              className="w-full text-[28px] font-bold outline-none"
            />
          </div>

          <p className="mt-3 text-sm text-black/70">
            ≈ {solAmount} SOL
          </p>

          <p className="text-xs text-black/40">
            {solPrice
              ? `Live SOL price: $${solPrice}`
              : "Loading price..."}
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={onContinue}
          className="w-full rounded-[14px] py-3 bg-[#0052FF] text-white font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}