"use client";

import { createContext, useEffect, useState } from "react";
import useFetchWithCache from "@/hooks/useFetchWithCache";
import { Settings } from "@/types/globals";

export type SettingsContextType = {
  settings: Partial<Settings> | undefined;
  setSettings: React.Dispatch<
    React.SetStateAction<Partial<Settings> | undefined>
  >;
  isSettingsContextLoading: boolean;
};

const initialSettingsContextState: SettingsContextType = {
  settings: undefined,
  setSettings: () => {},
  isSettingsContextLoading: true,
};

export const SettingsContext = createContext<SettingsContextType>(
  initialSettingsContextState,
);

const themes = {
  light: {
    "--foreground": "#F8F8F2",
    "--background": "#282A36",
    "--selection": "#44475A",
    "--comment": "#6272A4",
    "--purple": "#BD93F9",
  },
  dark: {
    "--foreground": "#F8F8F2",
    "--background": "#282A36",
    "--selection": "#44475A",
    "--comment": "#6272A4",
    "--purple": "#BD93F9",
  },
  dracula: {
    "--foreground": "#F8F8F2",
    "--background": "#282A36",
    "--selection": "#44475A",
    "--comment": "#6272A4",
    "--purple": "#BD93F9",
  },
};

export default function SettingsProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const [settings, setSettings] =
    useState<SettingsContextType["settings"]>(undefined);

  const { data, isLoading: isSettingsContextLoading } = useFetchWithCache<
    Settings | undefined
  >("settings", "/api/settings", undefined);

  useEffect(() => {
    if (!data) return;

    setSettings(data);
  }, [data]);

  useEffect(() => {
    if (!settings?.theme) return;

    Object.entries(themes[settings.theme]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        isSettingsContextLoading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
