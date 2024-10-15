"use client";

import { ActivitiesContext } from "@/providers/ActivitiesProvider";
import { ActivitiesEndpoint } from "@/types/endpoints";
import DeleteIcon from "@/icons/delete.svg";
import { useContext, useState } from "react";

export default function ActivitiesDeleter() {
  const { activities, setActivities } = useContext(ActivitiesContext);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const deleteActivities = async () => {
    setIsDeleting(true);

    const response = await fetch("/api/activities", {
      method: "DELETE",
    });
    if (!response.ok) throw response;
    const result: ActivitiesEndpoint.DeleteResponse = await response.json();
    if (!result.deletedCount || result.deletedCount === 0)
      return result.message;

    localStorage.removeItem("activities");
    setActivities([]);
    setIsDeleting(false);
    setIsDeleted(true);
  };

  if (isDeleted) return <>Successfully deleted all activities</>;

  return (
    <button
      onClick={deleteActivities}
      className="hover:bg-critical flex h-14 items-center justify-between gap-4 rounded bg-primary p-4 text-background transition-colors hover:border-accent disabled:bg-secondary disabled:text-primary"
      disabled={!activities || isDeleting}
    >
      <span>
        {!activities
          ? "No activities to delete"
          : isDeleting
            ? "Deleting all activities..."
            : "Delete all activities"}
      </span>
      <span className="max-sm:hidden">
        <DeleteIcon className="fill-secondary" />
      </span>
    </button>
  );
}
