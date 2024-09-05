"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ActivitiesContext, ActivitiesContextType } from "./ActivitiesProvider";

export default function PageSwitcher({ page }: { page: number }) {
  const { activities } = useContext<ActivitiesContextType>(ActivitiesContext);
  const { replace } = useRouter();

  return activities && activities.length !== 0 ? (
    <div className="flex h-16 items-center justify-between border-t-2 border-t-dracula-selection p-4">
      <button
        onClick={() => replace(`/dashboard/activities?page=${page - 1}`)}
        disabled={!(page > 0)}
        className="disabled:text-dracula-comment"
      >
        Previous page
      </button>

      <button
        onClick={() => replace(`/dashboard/activities?page=${page + 1}`)}
        disabled={page + 1 >= Math.ceil(activities.length / 30)}
        className="disabled:text-dracula-comment"
      >
        Next page
      </button>
    </div>
  ) : (
    <></>
  );
}
