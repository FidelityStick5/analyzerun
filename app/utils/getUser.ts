import { auth } from "@/auth";
import { User } from "next-auth";

export default async function getUser(): Promise<{
  isAuthenticated: boolean;
  user: User | null;
}> {
  const session = await auth();
  if (!session?.user) return { isAuthenticated: false, user: null };

  return { isAuthenticated: true, user: session.user };
}
