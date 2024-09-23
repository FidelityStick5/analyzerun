"use client";

import Link from "next/link";
import { useContext } from "react";
import { ActivitiesContext } from "./ActivitiesProvider";
import { SettingsContext } from "../SettingsProvider";
import { Activity } from "@/types/globals";

function ErrorMessage({ text }: { text: string }) {
  return <div className="p-4">{text}</div>;
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
      className={`flex h-16 animate-fadeIn items-center justify-between rounded bg-dracula-selection px-4 opacity-0 transition-colors hover:bg-dracula-purple`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div>{activity.title}</div>
      <div>{activity.distance} km</div>
    </Link>
  );
}

export default function ActivitiesContainer({ page }: { page: number }) {
  const { activities, loading } = useContext(ActivitiesContext);
  const { settings } = useContext(SettingsContext);

  const activitiesPerPage = settings?.activitiesPerPage || 30;

  if (loading) return <ErrorMessage text="Loading activities" />;
  if (!activities || activities.length === 0)
    return <ErrorMessage text="No activities" />;
  if (page >= Math.ceil(activities?.length / activitiesPerPage) || page < 0)
    return <ErrorMessage text="Page does not exist" />;

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
