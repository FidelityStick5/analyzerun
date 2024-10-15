"use client";

import { useContext, useEffect, useState } from "react";
import GridTile from "@/components/GridTile";
import CaloriesIcon from "@/icons/calories.svg";
import DateIcon from "@/icons/time.svg";
import DistanceIcon from "@/icons/distance.svg";
import ElevationIcon from "@/icons/elevation.svg";
import HeartRateIcon from "@/icons/heart_rate.svg";
import Vo2MaxIcon from "@/icons/vo2max.svg";
import TimeIcon from "@/icons/timer.svg";
import TitleIcon from "@/icons/tag.svg";
import SpeedIcon from "@/icons/speed.svg";
import { ActivitiesContext } from "@/providers/ActivitiesProvider";
import { estimateVO2Max } from "@/utils/vo2maxUtils";
import { Activity } from "@/types/globals";

function ErrorMessage({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center bg-secondary20 p-4 md:rounded">
      {text}
    </div>
  );
}

export default function ActivityGrid({ id }: { id: string }) {
  const { activities, isActivitiesContextLoading } =
    useContext(ActivitiesContext);
  const [activity, setActivity] = useState<Activity>();

  useEffect(() => {
    if (!activities) return;

    const foundActivity: Activity | undefined =
      activities.find(({ _id }) => _id.toString() === id) ?? undefined;

    setActivity(foundActivity);
  }, [activities]);

  if (isActivitiesContextLoading)
    return <ErrorMessage text="Loading activity" />;
  if (!activity) return <ErrorMessage text="No activity found" />;

  return (
    <div className="grid grid-cols-1 gap-4 overflow-auto bg-secondary20 p-4 md:rounded xl:grid-cols-4 xl:grid-rows-6">
      <GridTile
        title="Activity name"
        data={activity.title}
        Icon={TitleIcon}
        iconColor="#e5e7eb"
        gridSpan="xl:col-span-2 xl:row-span-2"
      />
      <GridTile
        title="Activity type"
        data={activity.activity_type}
        Icon={TitleIcon}
        iconColor="#3b82f6"
        gridSpan="xl:row-span-2"
      />
      <GridTile
        title="Activity date"
        data={[
          new Intl.DateTimeFormat(navigator.language, {
            timeStyle: "short",
          }).format(new Date(activity.date)),
          new Intl.DateTimeFormat(navigator.language, {
            dateStyle: "short",
          }).format(new Date(activity.date)),
        ]}
        Icon={DateIcon}
        iconColor="#818cf8"
        gridSpan="xl:row-span-2"
      />

      <GridTile
        title="Activity distance"
        data={`${activity.distance} km`}
        Icon={DistanceIcon}
        iconColor="#4ade80"
        gridSpan="xl:row-span-2"
      />
      <GridTile
        title="Activity time"
        data={activity.time}
        Icon={TimeIcon}
        iconColor="#2dd4bf"
        gridSpan="xl:row-span-2"
      />
      <GridTile
        title="Average pace"
        data={activity.average_pace}
        Icon={SpeedIcon}
        iconColor="#fbbf24"
      />
      <GridTile
        title="Average heart rate"
        data={activity.average_heart_rate}
        Icon={HeartRateIcon}
        iconColor="#ef4444"
      />
      <GridTile
        title="Best pace"
        data={activity.best_pace}
        Icon={SpeedIcon}
        iconColor="#fbbf24"
      />
      <GridTile
        title="Max heart rate"
        data={activity.max_heart_rate}
        Icon={HeartRateIcon}
        iconColor="#ef4444"
      />

      <GridTile
        title="Minimum elevation"
        data={activity.min_elevation}
        Icon={ElevationIcon}
        iconColor="#60a5fa"
      />

      {activity.activity_type === "Running" && (
        <>
          <GridTile
            title="Maximum elevation"
            data={activity.max_elevation}
            Icon={ElevationIcon}
            iconColor="#60a5fa"
          />
          <GridTile
            title="Estimated VO2Max"
            data={estimateVO2Max(activity.distance, activity.time).toFixed(2)}
            Icon={Vo2MaxIcon}
            iconColor="#a78bfa"
            gridSpan="xl:col-span-2 xl:row-span-2"
          />
        </>
      )}

      <GridTile
        title="Burned calories"
        data={activity.calories + " calories"}
        Icon={CaloriesIcon}
        iconColor="#f87171"
        gridSpan={
          activity.activity_type !== "Running"
            ? "xl:col-span-3 xl:row-span-2"
            : "xl:col-span-2"
        }
      />
      {activity.activity_type !== "Running" && (
        <GridTile
          title="Maximum elevation"
          data={activity.max_elevation}
          Icon={ElevationIcon}
          iconColor="#60a5fa"
        />
      )}
    </div>
  );
}
