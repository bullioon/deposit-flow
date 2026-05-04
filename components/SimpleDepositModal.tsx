"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "withdraw_start_time";
const DURATION = 6 * 60 * 60; // 6 hours

type Status = "idle" | "processing" | "success" | "support";

export default function SimpleDepositModal() {
  const [status, setStatus] = useState<Status>("idle");
  const [timeLeft, setTimeLeft] = useState<number>(DURATION);

  // START WITHDRAW
  const startWithdrawal = () => {
    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, now.toString());
    setStatus("processing");
  };

  // TIMER
  useEffect(() => {
    const start = localStorage.getItem(STORAGE_KEY);

    if (!start) return;

    setStatus("processing");

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((now - Number(start)) / 1000);
      const remaining = DURATION - diff;

      if (remaining <= 0) {
        setTimeLeft(0);
        setStatus("support");
        clearInterval(interval);
        return;
      }

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor(s / 60) % 60;
    const sec = s % 60;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

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

        {/* IDLE STATE (FULL DESIGN) */}
        {status === "idle" && (
          <>
            {/* SOL ICON */}
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

            {/* TRANSFER INFO */}
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

            {/* BUTTON */}
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

              <p className="text-sm text-black/60 mt-1">
                Time remaining: {formatTime(timeLeft)}
              </p>
            </div>

            <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0052FF]"
                style={{
                  width: `${(timeLeft / DURATION) * 100}%`,
                }}
              />
            </div>
          </>
        )}

        {/* SUPPORT MODE */}
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