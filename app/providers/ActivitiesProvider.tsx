"use client";

import { createContext, useEffect, useState } from "react";
import useFetchWithCache from "@/hooks/useFetchWithCache";
import { Activities } from "@/types/globals";

export type ActivitiesContextType = {
  activities: Activities["activities"] | undefined;
  setActivities: React.Dispatch<
    React.SetStateAction<Activities["activities"] | undefined>
  >;
  timestamp: Activities["timestamp"] | undefined;
  setTimestamp: React.Dispatch<
    React.SetStateAction<Activities["timestamp"] | undefined>
  >;
  isActivitiesContextLoading: boolean;
};

const initialActivitiesContextState: ActivitiesContextType = {
  activities: undefined,
  setActivities: () => {},
  timestamp: undefined,
  setTimestamp: () => {},
  isActivitiesContextLoading: true,
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
    useState<ActivitiesContextType["timestamp"]>(undefined);

  const { data, isLoading: isActivitiesContextLoading } = useFetchWithCache<
    Activities | undefined
  >("activities", "/api/activities", undefined);

  useEffect(() => {
    if (!data || !data.activities) return;

    setActivities(data.activities);
    setTimestamp(data.timestamp);
  }, [data]);

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        setActivities,
        timestamp,
        setTimestamp,
        isActivitiesContextLoading,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}
