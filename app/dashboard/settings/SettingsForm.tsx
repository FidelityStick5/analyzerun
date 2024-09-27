"use client";

import { useContext, useState } from "react";
import { SettingsContext } from "../SettingsProvider";
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
      age: parseInt(formData.get("age") as string) || 0,
      activitiesPerPage:
        parseInt(formData.get("activities-per-page") as string) || 20,
      theme: (formData.get("theme") as Settings["theme"]) || "dark",
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
    <form onSubmit={saveSettings} className="flex flex-col gap-4">
      <div className="text-xl font-semibold">User</div>
      <input
        type="number"
        min="1"
        max="100"
        step="1"
        name="age"
        defaultValue={settings?.age}
        placeholder="Your age"
        className="h-12 w-full appearance-none rounded bg-dracula-selection px-4 text-dracula-foreground outline-none"
        required
      />

      <div className="text-xl font-semibold">Dashboard preferences</div>
      <input
        type="number"
        min="1"
        max="100"
        step="1"
        name="activities-per-page"
        defaultValue={settings?.activitiesPerPage}
        placeholder="Activities per page (default 30)"
        className="h-12 w-full appearance-none rounded bg-dracula-selection px-4 text-dracula-foreground outline-none"
        required
      />

      <select
        name="theme"
        value={settings?.theme || "dark"}
        onChange={(e) =>
          setSettings({
            ...settings,
            theme: e.currentTarget.value as "light" | "dark" | "dracula",
          })
        }
        className="h-12 w-full appearance-none rounded bg-dracula-selection px-4 text-dracula-foreground outline-none"
        required
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="dracula">Dracula</option>
      </select>

      <button
        type="submit"
        className="w-full rounded bg-dracula-comment p-4 hover:bg-dracula-purple disabled:bg-dracula-selection"
        disabled={isSaving}
      >
        {isSaving ? "Saving settings..." : "Save settings"}
      </button>
    </form>
  );
}
