import SessionControl from "@/components/SessionControl";

export default function UnauthenticatedPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background text-xl text-text">
      <div className="animate-pulse">⛔ You shouldn&apos;t be here ⛔</div>
      <SessionControl
        type="signin"
        label="Unless authenticated of course"
        className="underline transition-colors hover:text-accent"
      />
    </div>
  );
}
