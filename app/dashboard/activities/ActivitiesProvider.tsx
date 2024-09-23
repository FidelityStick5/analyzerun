"use client";

import { createContext, useEffect, useState } from "react";
import useFetchWithCache from "@/hooks/useFetchWithCache";
import { Activities } from "@/types/globals";

export type ActivitiesContextType = {
  activities: Activities["activities"] | undefined;
  setActivities: React.Dispatch<
    React.SetStateAction<Activities["activities"] | undefined>
  >;
  timestamp: Activities["timestamp"];
  setTimestamp: React.Dispatch<React.SetStateAction<Activities["timestamp"]>>;
  loading: boolean;
};

const initialActivitiesContextState: ActivitiesContextType = {
  activities: undefined,
  setActivities: () => {},
  timestamp: 0,
  setTimestamp: () => {},
  loading: true,
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
  const [_, setLoading] = useState<boolean>(true);

  const { data, loading } = useFetchWithCache<Activities | undefined>(
    "activities",
    "/api/activities",
    undefined,
  );

  useEffect(() => {
    if (!data || !data.activities) return;

    setActivities(data.activities);
    setTimestamp(data.timestamp);
    setLoading(loading);
  }, [data]);

  return (
    <ActivitiesContext.Provider
      value={{ activities, setActivities, timestamp, setTimestamp, loading }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}
