import { redirect } from "next/navigation";
import { requireNoAuth } from "@/lib/checkSession";
import RegisterClient from "@/features/Register/RegisterClient";

export default async function Register() {
  const loggedIn = await requireNoAuth();
  if (loggedIn) redirect("/habitos");
  return <RegisterClient />;
}
