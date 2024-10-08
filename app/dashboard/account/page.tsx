import SessionControl from "@/components/SessionControl";

export default function AccountPage() {
  return (
    <div className="flex flex-col gap-4 bg-secondary20 p-4 md:rounded">
      <SessionControl
        type="signout"
        label="Sign out"
        className="underline transition-colors hover:text-accent"
      />
    </div>
  );
}
