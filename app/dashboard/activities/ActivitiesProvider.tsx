"use client";

import { createContext, useEffect, useState } from "react";
import { ActivitiesEndpoint } from "@/types/endpoints";
import { Activities } from "@/types/globals";

export type ActivitiesContextType = {
  activities: Activities["activities"];
  setActivities: React.Dispatch<React.SetStateAction<Activities["activities"]>>;
  timestamp: Activities["timestamp"];
  setTimestamp: React.Dispatch<React.SetStateAction<Activities["timestamp"]>>;
};

const initialActivitiesContextState: ActivitiesContextType = {
  activities: [],
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
  const [activities, setActivities] = useState<
    ActivitiesContextType["activities"]
  >([]);
  const [timestamp, setTimestamp] =
    useState<ActivitiesContextType["timestamp"]>(0);

  useEffect(() => {
    let isMounted = true;

    if (!isMounted) return;

    (async () => {
      const response = await fetch("/api/activities", { method: "GET" });
      if (!response.ok) throw response;
      const result: ActivitiesEndpoint.GetResponse = await response.json();
      if (!result.data) return;

      setTimestamp(result.data.timestamp);
      setActivities(result.data.activities);
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
