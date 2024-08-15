"use client";

import { createContext, useEffect, useState } from "react";
import { ActivitiesEndpoint } from "@/types/endpoints";
import { Activity } from "@/types/globals";

export type ActivitiesContextType = {
  activities: Array<Activity>;
  setActivities: React.Dispatch<React.SetStateAction<Array<Activity>>>;
};

const initialActivitiesContextState: ActivitiesContextType = {
  activities: [],
  setActivities: () => {},
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

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/activities");
      if (!response.ok) throw response;
      const result: ActivitiesEndpoint.GetResponse = await response.json();
      if (!result.data) throw response;

      setActivities(result.data);
    })();
  }, []);

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
}
