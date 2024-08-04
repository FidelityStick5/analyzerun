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
    <ActivitiesProvider>
      <div className="bg-dracula-background p-4 md:rounded">
        <div>
          <ActivityUpload />
        </div>
        <ActivitiesContainer />
      </div>
    </ActivitiesProvider>
  );
}
