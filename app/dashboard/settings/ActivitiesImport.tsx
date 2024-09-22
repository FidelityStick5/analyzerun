"use client";

import { ActivitiesEndpoint } from "@/types/endpoints";
import { useState } from "react";

export default function ActivitiesImport() {
  const [importedCount, setImportedCount] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const importActivities = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const blob = formData.get("file");

    if (!(blob instanceof Blob) || blob.size === 0) return;

    const response = await fetch("/api/activities/import", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw response;
    const result: ActivitiesEndpoint.PostResponse = await response.json();
    if (!result.data) throw response;
    if (!result.data.activities) return result.message;

    localStorage.setItem("activities", JSON.stringify(result.data));
    setImportedCount(result.insertedCount);
    setLoading(false);
  };

  return (
    <div className="flex h-24 items-center gap-4">
      <form onSubmit={importActivities} className="flex gap-4">
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
          className="rounded bg-dracula-comment p-4 hover:bg-dracula-purple disabled:bg-dracula-selection"
          disabled={loading}
        >
          {loading ? "Importing file..." : "Import CSV from Garmin Connect"}
        </button>
      </form>
      {importedCount && <>Successfully imported {importedCount} activities</>}
    </div>
  );
}
