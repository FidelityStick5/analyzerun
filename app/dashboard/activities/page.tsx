import { Metadata } from "next";
import ActivitiesContainer from "./ActivitiesContainer";
import ActivitiesProvider from "./ActivitiesProvider";
import ActivityUpload from "./ActivityUpload";

export const metadata: Metadata = {
  title: "Analyzerun - Analyzing activities...",
  description: "Improve your running performance easily with Analyzerun",
};

export default function ActivitiesPage() {
  return (
    <div className="overflow-auto bg-dracula-background md:rounded">
      <div className="flex h-24 items-center justify-end border-b-2 border-b-dracula-selection p-4">
        <ActivityUpload />
      </div>
      <ActivitiesContainer />
    </div>
  );
}
