"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

const wallet = "AVL315ZjNhfzfPsSYAM1U3T1f9sXcEwfKybbZWk5EBTY";

export default function DepositScreen() {
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
    <div className="min-h-screen bg-[#f6f7fb] flex justify-center">
      <div className="w-full max-w-[460px] px-5 pt-6 pb-10">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-[22px] font-[700]">Deposit</h1>
          <span className="text-gray-400 text-xl">⋯</span>
        </div>

        {/* CARD PRINCIPAL */}
        <div className="rounded-[20px] bg-white p-5 shadow-sm">

          {/* BADGE */}
          <div className="mb-4 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
              <img src="/solana.png" className="h-5 w-5" />
              <span className="text-[14px] font-[600]">
                Solana (SOL)
              </span>
            </div>
          </div>

          {/* QR */}
          <div className="mb-4 flex justify-center">
            <img
              src="/qr-code.png"
              className="h-[200px] w-[200px] rounded-[16px] border p-2 bg-white"
            />
          </div>

          {/* TEXT */}
          <p className="mb-4 text-center text-[14px] text-gray-500">
            Send <span className="font-[600] text-black">5.90 SOL</span> to this address
          </p>

          {/* WALLET */}
          <div className="mb-4 flex items-center gap-2 rounded-[12px] bg-gray-100 px-4 py-3">
            <p className="flex-1 truncate text-[14px] font-[600]">
              {wallet}
            </p>

            <button
              onClick={copyWallet}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white"
            >
              <Copy size={16} />
            </button>
          </div>

          {/* STATUS */}
          <div className="mb-4 flex items-center justify-center gap-2 text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-gray-500">
              Waiting for payment...
            </span>
          </div>

          {/* BUTTON */}
          <button className="w-full rounded-full bg-blue-500 py-3 text-[15px] font-[700] text-white">
            I’ve sent the funds
          </button>

          {copied && (
            <p className="mt-2 text-center text-xs text-gray-400">
              Wallet copied
            </p>
          )}
        </div>

        {/* INFO CARD */}
        <div className="mt-5 rounded-[16px] bg-yellow-50 p-4">
          <p className="text-[13px] font-[600] text-yellow-700">
            Minimum balance required: $189 to activate trading
          </p>
        </div>

      </div>
    </div>
  );
}