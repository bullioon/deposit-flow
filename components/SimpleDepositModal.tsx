"use client";

import { Copy, X, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const wallet = "BSFkqcPQFPTRpm3ERVh8D5ytA3TBgE734L8zo4NKgnLX";

const DURATION = 12 * 60 * 60;
const STORAGE_KEY = "deposit_timer_start";

type Status = "waiting" | "confirming" | "success" | "expired";

export default function SimpleDepositModal() {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [status, setStatus] = useState<Status>("waiting");

  // TIMER
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

      if (remaining <= 0) {
        setTimeLeft(0);
        setStatus("expired");
        return;
      }

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor(sec / 60) % 60;
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

  const statusUI = () => {
    if (status === "expired") {
      return (
        <>
          <X className="text-red-500" size={16} />
          <span className="text-red-500 font-semibold">
            Transaction cancelled
          </span>
        </>
      );
    }

    if (status === "waiting") {
      return (
        <>
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-black">Waiting for payment...</span>
        </>
      );
    }

    if (status === "confirming") {
      return (
        <>
          <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />
          <span className="text-black">Confirming transaction...</span>
        </>
      );
    }

    if (status === "success") {
      return (
        <>
          <CheckCircle2 className="text-green-500" size={16} />
          <span className="text-black font-medium">
            Payment received
          </span>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">

      <div className="w-full max-w-[420px] rounded-[28px] border bg-white shadow-sm p-6">

        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[18px] font-[700] text-black">
            Release 125,000 USDC
          </h2>

          <button className="rounded-full p-2 hover:bg-gray-100">
            <X size={18} className="text-black/60" />
          </button>
        </div>

        {/* TIMER */}
        <div className="mb-4 flex justify-center">
          <div
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              status === "expired"
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-black"
            }`}
          >
            {status === "expired"
              ? "Expired"
              : `Expires in ${formatTime(timeLeft)}`}
          </div>
        </div>

        {/* AMOUNT */}
        <div className="text-center mb-1">
          <p className="text-[13px] text-black">Send</p>
          <p className="text-[32px] font-[700] text-black">
            200 USD = 2.5 SOL
          </p>
        </div>

        <p className="mb-5 text-center text-[13px] text-black">
          to complete your deposit
        </p>

        {/* QR */}
        <div className="mb-5 flex justify-center">
          <div className="rounded-[18px] border p-3">
            <img src="/qr-code.png" className="h-[180px] w-[180px]" />
          </div>
        </div>

        {/* WALLET */}
        <div className="mb-4 flex items-center gap-2 rounded-[14px] border px-4 py-3">
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

        {/* STATUS */}
        <div className="mb-5 flex items-center justify-center gap-2 text-sm">
          {statusUI()}
        </div>

        {/* BUTTON (NO HACE NADA) */}
        <button
          disabled
          className="w-full rounded-[14px] py-3 bg-black text-white font-semibold opacity-60 cursor-not-allowed"
        >
          I’ve sent the funds
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