import { signIn, signOut } from "@/auth";
import SignInIcon from "@/icons/signin.svg";
import SignOutIcon from "@/icons/signout.svg";

export default async function SessionControl({
  type,
  label,
  className,
  isIconVisible,
  iconClassname,
}: {
  type: "signin" | "signout";
  label?: string;
  className?: string;
  isIconVisible?: boolean;
  iconClassname?: string;
}) {
  const formAction = async () => {
    "use server";

    if (type === "signin")
      return await signIn(undefined, { redirectTo: "/dashboard" });

    await signOut({ redirectTo: "/" });
  };

  return (
    <form action={formAction}>
      <button type="submit" className={className}>
        {isIconVisible ? (
          type === "signin" ? (
            <SignInIcon className={iconClassname} />
          ) : (
            <SignOutIcon className={iconClassname} />
          )
        ) : label ? (
          label
        ) : type === "signin" ? (
          "Sign in"
        ) : (
          "Sign out"
        )}
      </button>
    </form>
  );
}
