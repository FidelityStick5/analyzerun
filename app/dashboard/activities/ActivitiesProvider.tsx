"use client";

import { createContext, useEffect, useState } from "react";
import { ActivitiesEndpoint } from "@/types/endpoints";
import { Activities } from "@/types/globals";

export type ActivitiesContextType = {
  activities: Activities["activities"] | undefined;
  setActivities: React.Dispatch<
    React.SetStateAction<Activities["activities"] | undefined>
  >;
  timestamp: Activities["timestamp"];
  setTimestamp: React.Dispatch<React.SetStateAction<Activities["timestamp"]>>;
};

const initialActivitiesContextState: ActivitiesContextType = {
  activities: undefined,
  setActivities: () => {},
  timestamp: 0,
  setTimestamp: () => {},
};

export const ActivitiesContext = createContext<ActivitiesContextType>(
  initialActivitiesContextState,
);

export default function ActivitiesProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const [activities, setActivities] =
    useState<ActivitiesContextType["activities"]>(undefined);
  const [timestamp, setTimestamp] =
    useState<ActivitiesContextType["timestamp"]>(0);

  useEffect(() => {
    let isMounted = true;
    if (!isMounted) return;

    (async () => {
      const localStorageActivities = localStorage.getItem("activities");
      if (localStorageActivities) {
        const activities: Activities = JSON.parse(
          localStorageActivities || "{}",
        );
        if (!activities) return setActivities([]);

        setTimestamp(activities.timestamp);
        setActivities(activities.activities);

        return;
      }

      const response = await fetch("/api/activities", { method: "GET" });
      if (!response.ok) throw response;
      const result: ActivitiesEndpoint.GetResponse = await response.json();
      if (!result.data) {
        setActivities([]);

        return;
      }

      setTimestamp(result.data.timestamp);
      setActivities(result.data.activities);

      localStorage.setItem("activities", JSON.stringify(result.data));
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ActivitiesContext.Provider
      value={{ activities, setActivities, timestamp, setTimestamp }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}
