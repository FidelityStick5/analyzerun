import ActivityActions from "./ActivityActions";
import ActivityGrid from "./ActivityGrid";

export default function ActivityPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <div className="grid grid-cols-1 grid-rows-[1fr,4rem] gap-4 p-4">
      <ActivityGrid id={slug} />
      <ActivityActions id={slug} />
    </div>
  );
}
