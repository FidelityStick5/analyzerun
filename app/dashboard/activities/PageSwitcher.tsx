"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ActivitiesContext } from "./ActivitiesProvider";
import { SettingsContext } from "../SettingsProvider";

export default function PageSwitcher({ page }: { page: number }) {
  const { activities } = useContext(ActivitiesContext);
  const { settings } = useContext(SettingsContext);
  const { replace } = useRouter();

  if (!activities || activities.length === 0) return null;

  const activitiesPerPage = settings?.activitiesPerPage || 30;
  const totalPages = Math.ceil(activities.length / activitiesPerPage);

  const isPreviousDisabled = page <= 0;
  const isNextDisabled = page + 1 >= totalPages;

  return (
    <div className="flex h-16 items-center justify-between border-t-2 border-t-dracula-selection p-4">
      <button
        onClick={() => replace(`/dashboard/activities?page=${page - 1}`)}
        disabled={isPreviousDisabled}
        className="disabled:text-dracula-comment"
      >
        Previous page
      </button>

      <button
        onClick={() => replace(`/dashboard/activities?page=${page + 1}`)}
        disabled={isNextDisabled}
        className="disabled:text-dracula-comment"
      >
        Next page
      </button>
    </div>
  );
}
