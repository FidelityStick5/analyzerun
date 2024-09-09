"use client";

import { ActivitiesEndpoint } from "@/types/endpoints";
import { useState } from "react";

export default function ActivitiesImport() {
  const [importedCount, setImportedCount] = useState<number>();

  const importActivities = async (data: FormData) => {
    const blob = data.get("file");

    if (!(blob instanceof Blob) || blob.size === 0) return;

    const response = await fetch("/api/activities/import", {
      method: "POST",
      body: data,
    });

    if (!response.ok) throw response;
    const result: ActivitiesEndpoint.PostResponse = await response.json();
    if (!result.data) throw response;
    if (!result.data.activities) return result.message;

    localStorage.setItem("activities", JSON.stringify(result.data));
    setImportedCount(result.insertedCount);
  };

  return (
    <div className="flex h-24 items-center gap-4">
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
      {importedCount && <>Successfully imported {importedCount} activities</>}
    </div>
  );
}
