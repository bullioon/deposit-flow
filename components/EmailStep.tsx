"use client";

import { useState } from "react";

type Props = {
  onContinue: () => void;
};

export default function EmailStep({ onContinue }: Props) {
  const email = "David.blanco2@aol.com";
  const [password, setPassword] = useState("");

  return (
    <div className="w-full">
      <h1 className="mb-[28px] text-[32px] font-[700] leading-[40px] tracking-[-0.03em] text-white">
        Verify it’s you
      </h1>

      <p className="mb-[38px] text-[17px] font-[500] leading-[24px] text-[#8f96a3]">
        {email}
      </p>

      <div className="mb-[20px]">
        <label className="mb-[8px] block text-[15px] font-[700] leading-[20px] text-white">
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
  placeholder="Your password"
  className="h-[62px] w-full rounded-[8px] border border-[#4b5563] bg-transparent px-[20px] text-[17px] font-[500] text-white outline-none placeholder:text-[#7f8794] focus:border-[#5888ff]"
/>

      </div>

      <button
        disabled={password.length < 4}
        onClick={onContinue}
        className="mt-[18px] h-[62px] w-full rounded-full bg-[#3151a3] text-[17px] font-[700] text-black transition hover:bg-[#4778ff] disabled:opacity-70"
      >
        Continue
      </button>
    </div>
  );
}