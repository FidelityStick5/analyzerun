"use client";

import { useContext } from "react";
import { ActivitiesContext, ActivitiesContextType } from "./ActivitiesProvider";

export default function ActivityUpload() {
  const { setActivities } =
    useContext<ActivitiesContextType>(ActivitiesContext);

  const importActivities = async (data: FormData) => {
    const response = await fetch("/api/activities/import", {
      method: "POST",
      body: data,
    });

    if (!response.ok) return;
    const result = await response.json();

    setActivities(result);
  };

  return (
    <form action={importActivities}>
      <input type="file" name="file" accept=".csv,text/csv" />
      <button type="submit">Import CSV from Garmin Connect</button>
    </form>
  );
}
