"use client";

import { useContext } from "react";
import { ActivitiesContext, ActivitiesContextType } from "./ActivitiesProvider";
import { ActivitiesEndpoint } from "@/types/endpoints";

export default function ActivityUpload() {
  const { setActivities } =
    useContext<ActivitiesContextType>(ActivitiesContext);

  const importActivities = async (data: FormData) => {
    const response = await fetch("/api/activities/import", {
      method: "POST",
      body: data,
    });

    if (!response.ok) return;
    const result: ActivitiesEndpoint.PostResponse = await response.json();
    if (!result.data) return;

    setActivities(result.data);
  };

  return (
    <form action={importActivities} className="flex gap-4">
      <label className="inline-block cursor-pointer rounded bg-dracula-comment p-4 hover:bg-dracula-purple">
        Select file
        <input
          type="file"
          name="file"
          accept=".csv,text/csv"
          className="hidden"
        />
      </label>
      <button
        type="submit"
        className="rounded bg-dracula-comment p-4 hover:bg-dracula-purple"
      >
        Import CSV from Garmin Connect
      </button>
    </form>
  );
}
