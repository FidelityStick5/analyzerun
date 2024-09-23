"use client";

import { useContext, useEffect, useState } from "react";
import { ActivitiesContext } from "../ActivitiesProvider";
import { Activity } from "@/types/globals";
import CaloriesIcon from "@/icons/calories.svg";
import DateIcon from "@/icons/time.svg";
import DistanceIcon from "@/icons/distance.svg";
import ElevationIcon from "@/icons/elevation.svg";
import HeartRateIcon from "@/icons/heart_rate.svg";
import Vo2MaxIcon from "@/icons/vo2max.svg";
import TimeIcon from "@/icons/timer.svg";
import TitleIcon from "@/icons/tag.svg";
import SpeedIcon from "@/icons/speed.svg";

function ErrorMessage({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center bg-dracula-background p-4 md:rounded">
      {text}
    </div>
  );
}

function GridTile({
  title,
  data,
  Icon,
  iconColor,
  gridSpan,
}: {
  title: string;
  data: string | number;
  Icon?: React.FC<React.SVGProps<SVGElement>>;
  iconColor?: string;
  gridSpan?: string;
}) {
  return (
    <div
      title={title}
      className={`relative flex items-center justify-center gap-4 overflow-hidden rounded border-2 border-dracula-selection bg-dracula-selection px-8 transition-colors hover:bg-dracula-background max-xl:min-h-24 ${gridSpan}`}
    >
      {Icon && (
        <Icon
          className="pointer-events-none absolute -left-20 h-56 w-auto opacity-20 transition-[height] duration-1000 ease-in-out"
          style={{ fill: iconColor ?? "currentcolor" }}
        />
      )}
      <div className="text-2xl">{data}</div>
    </div>
  );
}

export default function ActivityPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { activities } = useContext(ActivitiesContext);
  const [activity, setActivity] = useState<Activity>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!activities) return setLoading(false);

    const foundActivity: Activity | undefined =
      activities.find(({ _id }) => _id.toString() === slug) ?? undefined;

    setActivity(foundActivity);
    setLoading(false);
  }, [activities]);

  const convertTimeToMinutes = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    return hours * 60 + minutes + seconds / 60;
  };

  const estimateVO2Max = (distance: number, timeString: string): number => {
    const time = convertTimeToMinutes(timeString);
    const velocity = (distance * 1000) / time;
    const vo2maxPercent =
      0.8 +
      0.1894393 * Math.exp(-0.012778 * time) +
      0.2989558 * Math.exp(-0.1932605 * time);
    const vo2 = -4.6 + 0.182258 * velocity + 0.000104 * velocity * velocity;

    return vo2 / vo2maxPercent;
  };

  if (loading) return <ErrorMessage text="Loading activity" />;
  if (!activity) return <ErrorMessage text="No activity found" />;

  return (
    <div className="grid grid-cols-1 gap-4 overflow-auto bg-dracula-background p-4 md:rounded xl:grid-cols-4 xl:grid-rows-6">
      <>
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
          data={new Date(activity.date).toLocaleString()}
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
          title="Estimated burned calories during activity"
          data={activity.calories + " calories"}
          Icon={CaloriesIcon}
          iconColor="#f87171"
          gridSpan="xl:row-span-2"
        />
        <GridTile
          title="Average pace during activity"
          data={activity.average_pace}
          Icon={SpeedIcon}
          iconColor="#fbbf24"
        />
        <GridTile
          title="Best pace during activity"
          data={activity.best_pace}
          Icon={SpeedIcon}
          iconColor="#fbbf24"
        />

        <GridTile
          title="Average heart rate reached during activity"
          data={activity.average_heart_rate}
          Icon={HeartRateIcon}
          iconColor="#ef4444"
        />
        <GridTile
          title="Estimated VO2Max basing on distance and time of activity"
          data={estimateVO2Max(activity.distance, activity.time).toFixed(2)}
          Icon={Vo2MaxIcon}
          iconColor="#a78bfa"
          gridSpan="xl:col-span-2 xl:row-span-2"
        />
        <GridTile
          title="Minimum elevation during activity"
          data={activity.min_elevation}
          Icon={ElevationIcon}
          iconColor="#60a5fa"
        />
        <GridTile
          title="Max heart rate reached during activity"
          data={activity.max_heart_rate}
          Icon={HeartRateIcon}
          iconColor="#ef4444"
        />
        <GridTile
          title="Maximum elevation during activity"
          data={activity.max_elevation}
          Icon={ElevationIcon}
          iconColor="#60a5fa"
        />
      </>
    </div>
  );
}
