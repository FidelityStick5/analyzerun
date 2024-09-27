import type { Metadata } from "next";
import ActivitiesProvider from "@/providers/ActivitiesProvider";

export const metadata: Metadata = {
  title: "Analyzerun",
  description: "Improve your running performance easily with Analyzerun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ActivitiesProvider>{children}</ActivitiesProvider>;
}
