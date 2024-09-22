"use client";

import { createContext, useEffect, useState } from "react";
import useFetchWithCache from "@/hooks/useFetchWithCache";
import { Settings } from "@/types/globals";

export type SettingsContextType = {
  settings: Partial<Settings> | undefined;
  setSettings: React.Dispatch<
    React.SetStateAction<Partial<Settings> | undefined>
  >;
};

const initialSettingsContextState: SettingsContextType = {
  settings: undefined,
  setSettings: () => {},
};

export const SettingsContext = createContext<SettingsContextType>(
  initialSettingsContextState,
);

const initialSettings: Partial<Settings> = {
  _id: undefined,
  userId: undefined,
  activitiesPerPage: 30,
  age: undefined,
  theme: "dark",
};

export default function SettingsProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const [settings, setSettings] =
    useState<SettingsContextType["settings"]>(initialSettings);

  const { data } = useFetchWithCache<Partial<Settings>>(
    "settings",
    "/api/settings",
    initialSettings,
  );

  useEffect(() => {
    if (!data._id) return;

    setSettings(data);
  }, [data]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
