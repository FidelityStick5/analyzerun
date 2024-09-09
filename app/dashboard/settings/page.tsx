import { Metadata } from "next";
import SettingsForm from "./SettingsForm";
import ActivitiesImport from "./ActivitiesImport";

export const metadata: Metadata = {
  title: "Analyzerun - Changing settings...",
  description: "Improve your running performance easily with Analyzerun",
};

export default function SettingsPage() {
  return (
    <div className="bg-dracula-background p-4 md:rounded">
      <SettingsForm />
      <ActivitiesImport />
    </div>
  );
}
