"use client";

export default function SettingsForm() {
  const saveSettings = async (data: FormData) => {
    const response = await fetch("http://localhost:3000/api/settings", {
      method: "PUT",
      body: data,
    });
    if (!response.ok) throw response;
  };

  return (
    <form action={saveSettings} className="flex flex-col gap-4">
      <input
        type="number"
        min="1"
        max="100"
        step="1"
        name="age"
        placeholder="Your age"
        className="h-12 w-full appearance-none rounded bg-dracula-selection px-4 text-dracula-foreground outline-none"
        required
      />

      <select
        name="theme"
        className="h-12 w-full appearance-none rounded bg-dracula-selection px-4 text-dracula-foreground outline-none"
        required
      >
        <option value="dark">Dark</option>
        <option value="bright">Bright</option>
        <option value="dracula">Dracula</option>
      </select>

      <button
        type="submit"
        className="w-full rounded bg-dracula-comment p-4 hover:bg-dracula-purple"
      >
        Save
      </button>
    </form>
  );
}
