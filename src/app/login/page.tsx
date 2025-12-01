import { redirect } from "next/navigation";
import { requireNoAuth } from "@/lib/checkSession";
import LoginClient from "@/features/Login/LoginClient";

export default async function Login() {
  const loggedIn = await requireNoAuth();
  if (loggedIn) redirect("/habitos");
  return <LoginClient />;
}
