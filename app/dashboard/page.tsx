import { Metadata } from "next";
import Summary from "./Summary";

export const metadata: Metadata = {
  title: "Analyzerun - Checking performance...",
  description: "Improve your running performance easily with Analyzerun",
};

export default function DashboardPage() {
  return <Summary />;
}
