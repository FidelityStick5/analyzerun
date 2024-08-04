"use client";

import { createContext, useState } from "react";
import { Activity } from "@/types/globals";

export type ActivitiesContextType = {
  activities: Array<Activity>;
  setActivities: React.Dispatch<React.SetStateAction<Array<Activity>>>;
};

const initialActivitiesContextState: ActivitiesContextType = {
  activities: [],
  setActivities: () => { },
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

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
}
