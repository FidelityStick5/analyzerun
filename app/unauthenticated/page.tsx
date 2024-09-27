import SessionControl from "@/components/SessionControl";

export default function UnauthenticatedPage() {
  return (
    <div className="bg-background text-text flex h-screen w-screen flex-col items-center justify-center gap-4 text-xl">
      <div className="animate-pulse">⛔ You shouldn't be here ⛔</div>
      <SessionControl
        type="signin"
        label="Unless authenticated of course"
        className="hover:text-cyan underline transition-colors"
      />
    </div>
  );
}
