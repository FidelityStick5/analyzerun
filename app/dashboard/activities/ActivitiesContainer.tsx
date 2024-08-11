"use client";

import Link from "next/link";
import { useContext } from "react";
import { ActivitiesContext, ActivitiesContextType } from "./ActivitiesProvider";
import { Activity } from "@/types/globals";

function ActivityContainer(data: Activity) {
  return (
    <Link
      href={`/dashboard/activities/${data._id.toString()}`}
      className="flex h-16 items-center border-b-2 border-b-dracula-selection px-4"
    >
      {data.title}
    </Link>
  );
}

export default function ActivitiesContainer() {
  const { activities } = useContext<ActivitiesContextType>(ActivitiesContext);

  return activities.map((activity) => (
    <ActivityContainer {...activity} key={activity._id.toString()} />
  ));
}
