import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyzerun - Checking activities...",
  description: "Improve your running performance easily with Analyzerun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-screen h-screen">{children}</main>;
}
