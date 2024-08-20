"use client";

import { useContext, useEffect, useState } from "react";
import {
  ActivitiesContext,
  ActivitiesContextType,
} from "../ActivitiesProvider";
import { Activity } from "@/types/globals";

export default function ActivityPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { activities } = useContext<ActivitiesContextType>(ActivitiesContext);
  const [activity, setActivity] = useState<Activity>();

  useEffect(() => {
    const foundActivity: Activity | undefined =
      activities.find(({ _id }) => _id.toString() === slug) ?? undefined;

    setActivity(foundActivity);
  }, [activities]);

  return (
    <div className="overflow-auto bg-dracula-background p-4 md:rounded">
      {activity && activity.date.toString()}
    </div>
  );
}
