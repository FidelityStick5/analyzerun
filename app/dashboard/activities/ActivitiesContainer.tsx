"use client";

import { useContext } from "react";
import { ActivitiesContext, ActivitiesContextType } from "./ActivitiesProvider";
import { Activity } from "@/types/globals";

function ActivityContainer(data: Activity) {
  return <div>{data.title}</div>;
}

export default function ActivitiesContainer() {
  const { activities } = useContext<ActivitiesContextType>(ActivitiesContext);

  return activities.map((activity) => <ActivityContainer {...activity} />);
}
