import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coinbase Wallet",
  description: "Deposit Flow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="
          min-h-full
          bg-white
          text-black
          font-sans
        "
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Inter, Roboto, sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}