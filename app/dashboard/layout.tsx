import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";
import SettingsProvider from "./SettingsProvider";
import getUser from "@/utils/getUser";

export const metadata: Metadata = {
  title: "Analyzerun",
  description: "Improve your running performance easily with Analyzerun",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = await getUser();
  if (!isAuthenticated) return redirect("/unauthenticated");

  return (
    <SettingsProvider>
      <main className="grid h-screen w-screen grid-cols-1 grid-rows-[1fr,6rem] bg-dracula-selection text-dracula-foreground md:grid-cols-[16rem,1fr] md:grid-rows-1 md:gap-4 md:p-4">
        <Navbar />
        {children}
      </main>
    </SettingsProvider>
  );
}
