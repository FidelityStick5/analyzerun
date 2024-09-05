import { Metadata } from "next";
import ActivitiesContainer from "./ActivitiesContainer";
import ActivityUpload from "./ActivityUpload";
import PageSwitcher from "./PageSwitcher";

export const metadata: Metadata = {
  title: "Analyzerun - Analyzing activities...",
  description: "Improve your running performance easily with Analyzerun",
};

export default function ActivitiesPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const convertedPage = searchParams.page ? parseInt(searchParams.page) : 0;

  return (
    <>
      <div className="grid grid-rows-[6rem,1fr,4rem] overflow-auto bg-dracula-background md:rounded">
        <ActivityUpload />
        <ActivitiesContainer page={convertedPage} />
        <PageSwitcher page={convertedPage} />
      </div>
    </>
  );
}
