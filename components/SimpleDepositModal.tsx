"use client";

import { Copy, X, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const wallet = "BSFkqcPQFPTRpm3ERVh8D5ytA3TBgE734L8zo4NKgnLX";

const DURATION = 12 * 60 * 60;
const STORAGE_KEY = "deposit_timer_start";

export default function SimpleDepositModal() {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);

  useEffect(() => {
    let start = localStorage.getItem(STORAGE_KEY);

    if (!start) {
      start = Date.now().toString();
      localStorage.setItem(STORAGE_KEY, start);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((now - Number(start)) / 1000);
      const remaining = DURATION - diff;

      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const copyWallet = async () => {
    await navigator.clipboard.writeText(wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">

      <div className="w-full max-w-[420px] rounded-[28px] border bg-white shadow-sm p-6">

        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-[700] text-black">
            Release $125,000 USDC
          </h2>

          <button className="rounded-full p-2 hover:bg-gray-100">
            <X size={18} className="text-black/60" />
          </button>
        </div>

        {/* TIMER BADGE */}
        <div className="mb-5 flex justify-center">
          <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-black/70">
            Expires in {formatTime(timeLeft)}
          </div>
        </div>

        {/* AMOUNT */}
        <div className="mb-2 text-center">
          <p className="text-[14px] text-black">
            Send
          </p>
          <p className="text-[28px] font-[700] text-black leading-tight">
           200 USD = 2.5 SOL
          </p>
        </div>

        <p className="mb-5 text-center text-[13px] text-black/60">
          to complete your deposit
        </p>

        {/* QR CARD */}
        <div className="mb-5 flex justify-center">
          <div className="rounded-[18px] border p-3">
            <img
              src="/qr-code.png"
              className="h-[180px] w-[180px]"
            />
          </div>
        </div>

        {/* WALLET ROW */}
        <div className="mb-4 rounded-[14px] border bg-white px-4 py-3 flex items-center gap-2">
          <p className="flex-1 truncate text-[13px] font-medium text-black">
            {wallet}
          </p>

          <button
            onClick={copyWallet}
            className="h-9 w-9 flex items-center justify-center rounded-full border hover:bg-gray-50"
          >
            <Copy size={15} />
          </button>
        </div>

        {/* NETWORK INFO ROW (Coinbase style) */}
        <div className="mb-6 flex items-center justify-between rounded-[14px] border px-4 py-3">
          <div>
            <p className="text-[13px] font-medium text-black">
              Network
            </p>
            <p className="text-[12px] text-black/60">
              Solana (SOL)
            </p>
          </div>

          <ChevronRight size={16} className="text-black/40" />
        </div>

        {/* STATUS */}
        <div className="mb-5 flex items-center justify-center gap-2 text-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-black/70">
            Waiting for payment...
          </span>
        </div>

        {/* PRIMARY BUTTON (Coinbase style) */}
        <button className="w-full rounded-[14px] bg-black py-3 text-white text-[14px] font-semibold active:scale-[0.99] transition">
          I’ve sent the funds
        </button>

        {/* SECONDARY BUTTON */}
        <button className="mt-3 w-full rounded-[14px] border border-black/10 py-3 text-black text-[14px] font-medium hover:bg-gray-50 transition">
          Copy wallet address
        </button>

        {copied && (
          <p className="mt-2 text-center text-xs text-black/50">
            Wallet copied
          </p>
        )}
      </div>
    </div>
  );
}