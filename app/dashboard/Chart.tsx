"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { estimateVO2Max } from "@/utils/vo2maxUtils";
import { Activities } from "@/types/globals";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function Chart({
  activities,
}: {
  activities: Activities["activities"];
}) {
  const filteredData = activities
    .filter((activity) => activity.activity_type === "Running")
    .slice(0, 20)
    .reverse();

  const config: ChartOptions<"line"> = {
    elements: {
      point: {
        pointStyle: "rectRounded",
        radius: 10,
        hoverBorderWidth: 10,
        hoverBackgroundColor: getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--background"),
        hoverRadius: 20,
      },
    },
  };

  const data: ChartData<"line"> = {
    labels: filteredData.map((activity) =>
      new Intl.DateTimeFormat(navigator.language, {
        timeStyle: "short",
        dateStyle: "short",
      }).format(new Date(activity.date)),
    ),
    datasets: [
      {
        label: "Running distance",
        data: filteredData.map((activity) => activity.distance),
        borderColor: getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--accent"),
      },
      {
        label: "Estimated VO2Max",
        data: filteredData.map((activity) =>
          estimateVO2Max(activity.distance, activity.time),
        ),
        borderColor: getComputedStyle(
          document.documentElement,
        ).getPropertyValue("--primary"),
      },
    ],
  };

  if (!data || !config) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded border-2 border-secondary bg-background px-4 max-xl:min-h-48">
      <div className="font-black italic text-primary">
        20 most recent running sessions
      </div>
      <Line data={data} options={config} />
    </div>
  );
}
