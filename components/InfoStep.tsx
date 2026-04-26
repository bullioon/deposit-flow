"use client";
import { useEffect, useState } from "react";
type Props = {
  onContinue: () => void;
};
export default function InfoStep({ onContinue }: Props) {
  const [usd, setUsd] = useState("25,000");
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
    <div className="w-full text-center">
      <div className="mx-auto mb-[24px] flex h-[170px] w-[240px] items-center justify-center">
        <div className="relative h-[145px] w-[210px]">
          <div className="absolute bottom-[26px] left-[18px] h-[86px] w-[122px] bg-[#5a86f7]" />
          <div className="absolute bottom-[26px] left-[128px] h-[86px] w-[64px] skew-x-[-18deg] bg-[#49cde5]" />
          <div className="absolute left-[80px] top-[12px] h-[56px] w-[40px] rounded-t-full bg-[#5a86f7]" />
          <div className="absolute left-[94px] top-[34px] h-[17px] w-[17px] rounded-full border-[4px] border-[#050607]" />
          <div className="absolute right-[8px] top-[18px] h-[52px] w-[126px] rotate-[-8deg] rounded-full bg-[#40cdea]" />
          <div className="absolute right-[50px] top-[60px] h-[52px] w-[34px] rotate-[18deg] bg-[#43c47c]" />
          <div className="absolute right-[60px] top-[42px] h-[25px] w-[25px] rounded-full bg-[#f2cf55]" />
          <div className="absolute right-[26px] top-[54px] h-[25px] w-[25px] rounded-full bg-[#f2cf55]" />
          <div className="absolute left-[23px] top-[62px] h-[62px] w-[96px] rounded-full border-[4px] border-white/90 border-b-transparent border-r-transparent" />
        </div>
      </div>
      <h1 className="mb-[10px] text-[32px] font-[700] leading-[40px] tracking-[-0.03em] text-white">
        You’re verified
      </h1>
      <p className="mx-auto mb-[24px] max-w-[390px] text-[16px] font-[500] leading-[24px] text-[#8f96a3]">
        The deposit amount to confirm is 25,000 USDC.
      </p>
      <div className="mb-[22px] rounded-[18px] bg-[#14151a] px-[22px] py-[20px] text-left">
        <label className="mb-[10px] block text-[15px] font-[700] text-white">
          Amount
        </label>
        <div className="flex items-center gap-3">
          <span className="text-[34px] font-[700] text-white">$</span>
          <input
            value={usd}
            onChange={(e) => setUsd(e.target.value)}
            inputMode="decimal"
            className="w-full bg-transparent text-[42px] font-[700] text-white outline-none"
          />
        </div>
        <p className="mt-[14px] text-[16px] font-[600] text-[#8f96a3]">
          ≈ {solAmount} SOL
        </p>
        <p className="mt-[6px] text-[13px] text-[#6b7280]">
          {solPrice ? `Live SOL price: $${solPrice}` : "Loading SOL price..."}
        </p>
      </div>
      <button
        onClick={onContinue}
        className="mx-auto block h-[62px] w-full max-w-[480px] rounded-full bg-[#3151a3] text-[17px] font-[700] text-black transition hover:bg-[#4778ff]"
      >
        Continue to the next step
      </button> 
    </div>
  );
}