"use client";

import { useContext, useEffect, useState } from "react";
import GridTile from "@/components/GridTile";
import { ActivitiesContext } from "@/providers/ActivitiesProvider";
import { estimateVO2Max } from "@/utils/vo2maxUtils";
import { UserSummary } from "@/types/globals";

function ErrorMessage({ text }: { text: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-secondary20 p-4 md:rounded">
      {text}
    </div>
  );
}

export default function Summary() {
  const { activities, isActivitiesContextLoading } =
    useContext(ActivitiesContext);
  const [summary, setSummary] = useState<UserSummary | undefined>(undefined);

  useEffect(() => {
    if (!activities || activities.length === 0) return;

    let activityTypeFrequencyMap: { [key: string]: number } = {};
    let totalVO2Max = 0;
    let runningActivitiesCount = 0;
    let mostFrequentActivityType = "";
    let maxCount = 0;

    for (const activity of activities) {
      const { activity_type, distance, time } = activity;

      activityTypeFrequencyMap[activity_type] =
        (activityTypeFrequencyMap[activity_type] || 0) + 1;

      if (activityTypeFrequencyMap[activity_type] > maxCount) {
        mostFrequentActivityType = activity_type;
        maxCount = activityTypeFrequencyMap[activity_type];
      }

      if (activity_type !== "Running") continue;

      totalVO2Max += estimateVO2Max(distance, time);
      runningActivitiesCount++;
    }

    const averageVO2Max =
      runningActivitiesCount > 0 ? totalVO2Max / runningActivitiesCount : 0;

    setSummary({
      averageVO2Max: averageVO2Max,
      favoriteActivity: {
        name: mostFrequentActivityType,
        count: maxCount,
      },
    });
  }, [activities]);

  if (isActivitiesContextLoading)
    return <ErrorMessage text="Loading your summary" />;
  if (!activities || activities.length === 0 || !summary)
    return (
      <ErrorMessage text="To see your summary and overall performance import activities" />
    );

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-4 bg-secondary20 p-4 md:rounded">
      <GridTile
        title="Average VO2Max of your running sessions"
        data={summary.averageVO2Max.toFixed(2)}
        gridSpan="col-span-2"
      />

      <GridTile
        title="Favorite activity"
        data={[
          summary.favoriteActivity.name,
          summary.favoriteActivity.count.toString(),
        ]}
        gridSpan="col-span-2"
      />
    </div>
  );
}
