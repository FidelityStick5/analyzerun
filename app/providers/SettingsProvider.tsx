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
    "--text": "#0a1112",
    "--background": "#f6fafb",
    "--primary": "#54a5b8",
    "--secondary": "#a0d1de",
    "--secondary20": "#a0d1de",
    "--accent": "#74c3d6",
  },
  dark: {
    "--text": "#dee1ef",
    "--background": "#0c0e17",
    "--primary": "#9fa5d0",
    "--secondary": "#212a56",
    "--secondary20": "#101323",
    "--accent": "#c0f12a",
  },
  dracula: {
    "--text": "#F8F8F2",
    "--background": "#282A36",
    "--primary": "#44475A",
    "--secondary": "#6272A4",
    "--secondary20": "#6272A4",
    "--accent": "#BD93F9",
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
