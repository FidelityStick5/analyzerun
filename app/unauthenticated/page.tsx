import SessionControl from "@/components/SessionControl";

export default function UnauthenticatedPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-dracula-background text-xl text-dracula-foreground">
      <div className="animate-pulse">⛔ You shouldn't be here ⛔</div>
      <SessionControl
        type="signin"
        label="Unless authenticated of course"
        className="underline transition-colors hover:text-dracula-cyan"
      />
    </div>
  );
}
