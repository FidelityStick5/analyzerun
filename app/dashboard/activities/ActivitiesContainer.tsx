"use client";

import Link from "next/link";
import { useContext } from "react";
import { ActivitiesContext } from "@/providers/ActivitiesProvider";
import { SettingsContext } from "@/providers/SettingsProvider";
import { Activity } from "@/types/globals";

function ErrorMessage({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="row-span-2 flex items-center justify-center gap-1 p-4">
      {children}
    </div>
  );
}

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
      className={`flex h-16 animate-fadeIn items-center justify-between rounded bg-primary px-4 text-background opacity-0 transition-colors hover:bg-accent`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div>{activity.title}</div>
      <div>{activity.distance} km</div>
    </Link>
  );
}

export default function ActivitiesContainer({ page }: { page: number }) {
  const { activities, isActivitiesContextLoading } =
    useContext(ActivitiesContext);
  const { settings } = useContext(SettingsContext);

  const activitiesPerPage = settings?.activitiesPerPage || 30;

  if (isActivitiesContextLoading)
    return <ErrorMessage>Loading activities</ErrorMessage>;
  if (!activities || activities.length === 0)
    return (
      <ErrorMessage>
        <span>No activities found, You can import activities in</span>

        <Link
          className="underline transition-colors hover:text-accent"
          href="/dashboard/settings"
        >
          dashboard settings
        </Link>
      </ErrorMessage>
    );
  if (page >= Math.ceil(activities?.length / activitiesPerPage) || page < 0)
    return <ErrorMessage>Page does not exist</ErrorMessage>;

  return (
    <div className="grid grid-cols-1 grid-rows-[repeat(auto-fill,4rem)] gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3">
      {activities
        .slice(page * activitiesPerPage, (page + 1) * activitiesPerPage)
        .map((activity, index) => (
          <ActivityContainer
            activity={activity}
            delay={20 * index}
            key={activity._id.toString()}
          />
        ))}
    </div>
  );
}
