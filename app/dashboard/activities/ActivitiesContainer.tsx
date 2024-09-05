"use client";

import Link from "next/link";
import { useContext } from "react";
import { ActivitiesContext, ActivitiesContextType } from "./ActivitiesProvider";
import { Activity } from "@/types/globals";

function ActivityContainer({
  activity,
  delay,
}: {
  activity: Activity;
  delay: number;
}) {
  return (
    <Link
      href={`/dashboard/activities/${activity._id.toString()}`}
      className={`animate-fadeIn flex h-16 items-center justify-between rounded bg-dracula-selection px-4 opacity-0 transition-colors hover:bg-dracula-purple`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div>{activity.title}</div>
      <div>{activity.distance} km</div>
    </Link>
  );
}

export default function ActivitiesContainer({ page }: { page: number }) {
  const { activities } = useContext<ActivitiesContextType>(ActivitiesContext);

  return (
    <div className="grid grid-cols-1 grid-rows-[repeat(auto-fill,4rem)] gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3">
      {activities ? (
        activities.length === 0 ? (
          <>No activities</>
        ) : page >= Math.ceil(activities?.length / 30) || page < 0 ? (
          <>Page does not exist</>
        ) : (
          activities
            .slice(page * 30, (page + 1) * 30)
            .map((activity, index) => (
              <ActivityContainer
                activity={activity}
                delay={20 * index}
                key={activity._id.toString()}
              />
            ))
        )
      ) : (
        <>Loading activities</>
      )}
    </div>
  );
}
