import { Metadata } from "next";
import SettingsForm from "./SettingsForm";
import ActivitiesImport from "./ActivitiesImport";

export const metadata: Metadata = {
  title: "Analyzerun - Changing settings...",
  description: "Improve your running performance easily with Analyzerun",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 bg-secondary20 p-4 md:rounded">
      <div className="text-2xl font-semibold">User preferences</div>
      <SettingsForm />
      <div className="text-2xl font-semibold">Data management</div>
      <ActivitiesImport />
    </div>
  );
}
