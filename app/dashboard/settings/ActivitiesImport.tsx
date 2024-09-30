"use client";

import { useContext, useState } from "react";
import ImportFileIcon from "@/icons/file.svg";
import UploadFileIcon from "@/icons/upload.svg";
import { ActivitiesContext } from "@/providers/ActivitiesProvider";
import { ActivitiesEndpoint } from "@/types/endpoints";

export default function ActivitiesImport() {
  const { setActivities, setTimestamp } = useContext(ActivitiesContext);
  const [importedCount, setImportedCount] = useState<number | undefined>(
    undefined,
  );
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [filename, setFilename] = useState<string | undefined>(undefined);

  const importActivities = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsImporting(true);

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
    setActivities(result.data.activities);
    setTimestamp(result.data.timestamp);
    setImportedCount(result.insertedCount);
    setIsImporting(false);
  };

  if (importedCount)
    return <span>Successfully imported {importedCount} activities</span>;

  return (
    <div className="flex flex-col items-center gap-4">
      <form onSubmit={importActivities} className="flex w-full gap-4">
        <label className="flex flex-grow cursor-pointer items-center justify-between gap-4 rounded bg-primary p-4 text-center text-background transition-colors hover:border-accent hover:bg-accent disabled:bg-secondary disabled:text-primary">
          <span>{filename ? `Selected file: ${filename}` : "Select file"}</span>
          <span className="max-sm:hidden">
            <ImportFileIcon className="fill-secondary" />
          </span>

          <input
            type="file"
            name="file"
            accept=".csv,text/csv"
            multiple={false}
            className="hidden"
            onChange={(e) => {
              const files = e.currentTarget.files;
              if (!files || files.length === 0 || files.length > 1) return;

              setFilename(files[0].name);
            }}
          />
        </label>
        <button
          type="submit"
          className="flex flex-grow items-center justify-between gap-4 rounded bg-primary p-4 text-background transition-colors hover:border-accent hover:bg-accent disabled:bg-secondary disabled:text-primary"
          disabled={isImporting}
        >
          <span>
            {isImporting
              ? "Importing file..."
              : "Import CSV from Garmin Connect"}
          </span>
          <span className="max-sm:hidden">
            <UploadFileIcon className="fill-secondary" />
          </span>
        </button>
      </form>
    </div>
  );
}
