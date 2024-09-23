"use client";

import { useContext, useState } from "react";
import { SettingsContext } from "../SettingsProvider";

export default function SettingsForm() {
  const { settings, setSettings } = useContext(SettingsContext);
  const [loading, setLoading] = useState<boolean>(false);

  const saveSettings = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      age: parseInt(formData.get("age") as string) || undefined,
      activitiesPerPage:
        parseInt(formData.get("activities-per-page") as string) || 20,
      theme: (formData.get("theme") as "bright" | "dark" | "dracula") ?? "dark",
    };

    const response = await fetch("/api/settings", {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) throw response;

    localStorage.setItem("settings", JSON.stringify(data));
    setSettings(data);
    setLoading(false);
  };

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
        defaultValue={settings?.theme}
        className="h-12 w-full appearance-none rounded bg-dracula-selection px-4 text-dracula-foreground outline-none"
        required
      >
        <option value="dark">Dark</option>
        <option value="bright">Bright</option>
        <option value="dracula">Dracula</option>
      </select>

      <button
        type="submit"
        className="w-full rounded bg-dracula-comment p-4 hover:bg-dracula-purple disabled:bg-dracula-selection"
        disabled={loading}
      >
        {loading ? "Saving settings..." : "Save settings"}
      </button>
    </form>
  );
}
