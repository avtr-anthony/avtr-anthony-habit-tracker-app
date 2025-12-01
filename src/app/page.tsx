import HomeFeature from "@/features/home/Home";
import { requireNoAuth } from "@/lib/checkSession";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const loggedIn = await requireNoAuth();
  if (loggedIn) redirect("/habitos");

  return <HomeFeature />;
}
