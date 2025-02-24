"use client";

import { useContext, useState } from "react";
import { SettingsContext } from "@/providers/SettingsProvider";
import SaveIcon from "@/icons/save.svg";
import { Settings } from "@/types/globals";

export default function SettingsForm() {
  const { settings, setSettings, isSettingsContextLoading } =
    useContext(SettingsContext);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const saveSettings = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    const formData = new FormData(event.currentTarget);
    const data: Settings = {
      activitiesPerPage:
        parseInt(formData.get("activities-per-page") as string) || 30,
      theme: (formData.get("theme") as Settings["theme"]) || "dark-orange",
    };

    const response = await fetch("/api/settings", {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) throw response;

    localStorage.setItem("settings", JSON.stringify(data));
    setSettings(data);
    setIsSaving(false);
  };

  if (isSettingsContextLoading) return <>Loading settings...</>;

  return (
    <form onSubmit={saveSettings} className="flex flex-col gap-6">
      <div className="text-xl font-semibold">Dashboard</div>
      <div className="relative flex items-center">
        <input
          type="number"
          min="1"
          max="120"
          step="1"
          name="activities-per-page"
          value={settings?.activitiesPerPage || ""}
          onChange={(e) =>
            setSettings({
              ...settings,
              activitiesPerPage: parseInt(e.currentTarget.value),
            })
          }
          placeholder="e.g. 30"
          className="peer h-12 w-full rounded border-2 border-primary bg-background px-4 text-text outline-none transition-colors focus:border-accent"
          required
        />
        <label className="pointer-events-none absolute -top-2.5 left-2 rounded bg-primary px-4 py-0.5 text-xs text-background transition-colors peer-focus:bg-accent">
          Activities per page (default 30)
        </label>
      </div>

      <div className="relative flex items-center">
        <select
          name="theme"
          value={settings?.theme || "dark-green"}
          onChange={(e) =>
            setSettings({
              ...settings,
              theme: e.currentTarget.value as Settings["theme"],
            })
          }
          className="peer h-12 w-full rounded border-2 border-primary bg-background px-4 text-text outline-none transition-colors focus:border-accent"
          required
        >
          <option value="dark-green">Dark Green</option>
          <option value="dark-orange">Dark Orange</option>
        </select>
        <label className="pointer-events-none absolute -top-2.5 left-2 rounded bg-primary px-4 py-0.5 text-xs text-background transition-colors peer-focus:bg-accent">
          Theme
        </label>
      </div>

      <button
        type="submit"
        className="flex flex-grow items-center justify-between gap-4 rounded bg-primary p-4 text-background transition-colors hover:border-accent hover:bg-accent disabled:bg-secondary disabled:text-primary"
        disabled={isSaving}
      >
        <span>{isSaving ? "Saving settings..." : "Save settings"}</span>
        <span className="max-sm:hidden">
          <SaveIcon className="fill-secondary" />
        </span>
      </button>
    </form>
  );
}
