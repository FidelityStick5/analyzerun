"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import DeleteIcon from "@/icons/delete.svg";
import { ActivitiesContext } from "@/providers/ActivitiesProvider";
import { ActivitiesEndpoint } from "@/types/endpoints";
import { Activities } from "@/types/globals";

export default function ActivityActions({ id }: { id: string }) {
  const { setActivities } = useContext(ActivitiesContext);
  const router = useRouter();

  const deleteActivity = async () => {
    const response = await fetch("/api/activity", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (!response.ok) throw response;
    const result: ActivitiesEndpoint.DeleteResponse = await response.json();
    if (!result.deletedCount || result.deletedCount === 0)
      return result.message;

    const data: Activities = JSON.parse(
      localStorage.getItem("activities") || "",
    );

    data.activities = data.activities.filter(
      (activity) => activity._id.toString() !== id,
    );

    localStorage.setItem("activities", JSON.stringify(data));
    setActivities(data.activities);

    router.replace("/dashboard/activities");
  };

  return (
    <button
      onClick={deleteActivity}
      className="flex items-center justify-between gap-4 rounded bg-primary p-4 text-background transition-colors hover:border-accent hover:bg-accent"
    >
      <span>Delete activity</span>
      <span className="max-sm:hidden">
        <DeleteIcon className="fill-secondary" />
      </span>
    </button>
  );
}
