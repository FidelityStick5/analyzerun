"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ActivitiesContext } from "@/providers/ActivitiesProvider";
import { SettingsContext } from "@/providers/SettingsProvider";

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
    <div className="flex h-16 items-center justify-between border-t-2 border-t-primary p-4">
      <button
        onClick={() => replace(`/dashboard/activities?page=${page - 1}`)}
        disabled={isPreviousDisabled}
        className="transition-colors hover:text-accent disabled:text-secondary"
      >
        Previous page
      </button>

      <button
        onClick={() => replace(`/dashboard/activities?page=${page + 1}`)}
        disabled={isNextDisabled}
        className="transition-colors hover:text-accent disabled:text-secondary"
      >
        Next page
      </button>
    </div>
  );
}
