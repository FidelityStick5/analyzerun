import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "./Navbar";
import SessionControl from "@/components/SessionControl";
import ActivitiesProvider from "@/providers/ActivitiesProvider";
import SettingsProvider from "@/providers/SettingsProvider";
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
      <ActivitiesProvider>
        <main className="grid h-screen w-screen grid-cols-1 grid-rows-[1fr,6rem] bg-background text-text md:grid-cols-[16rem,1fr] md:grid-rows-1 md:gap-4 md:p-4">
          <Navbar>
            <SessionControl
              type="signout"
              label="Sign out"
              className="underline transition-colors hover:text-accent"
            />
          </Navbar>
          {children}
        </main>
      </ActivitiesProvider>
    </SettingsProvider>
  );
}
