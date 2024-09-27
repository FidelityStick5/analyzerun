import { Metadata } from "next";
import ActivitiesContainer from "./ActivitiesContainer";
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
    <div className="bg-background grid grid-rows-[1fr,4rem] overflow-auto md:rounded">
      <ActivitiesContainer page={convertedPage} />
      <PageSwitcher page={convertedPage} />
    </div>
  );
}
