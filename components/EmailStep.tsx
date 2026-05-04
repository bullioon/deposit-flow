"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onContinue: () => void;
};

export default function EmailStep({ onContinue }: Props) {
  const email = "davidblanco2bas.base.eth";
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] rounded-[28px] border bg-white shadow-sm p-6">

        {/* HEADER */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[18px] font-[700] text-black">
            Verify it’s you
          </h2>

          <button className="rounded-full p-2 hover:bg-gray-100">
            <X size={18} className="text-black/60" />
          </button>
        </div>

        {/* EMAIL */}
        <p className="mb-6 text-[13px] text-black/50">
          {email}
        </p>

        {/* INPUT BLOCK */}
        <div className="mb-6">
          <label className="mb-2 block text-[13px] font-semibold text-black">
            Password
          </label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && password.length >= 4) {
                onContinue();
              }
            }}
            type="password"
            placeholder="Enter your password"
            className="h-[52px] w-full rounded-[14px] border px-4 text-[14px] text-black outline-none focus:border-black"
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={password.length < 4}
          onClick={onContinue}
          className="w-full rounded-[14px] py-3 bg-[#0052FF] text-white font-semibold disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}