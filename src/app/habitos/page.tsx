"use client";
import Header from "@/features/ui/Header";
import { logoutUser } from "@/lib/authService";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Container from "@/features/ui/Container";
import CardHabitos from "@/features/ui/CardHabitos";
export default function Habitos() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  // Manejo de usuario al login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const res = await fetch(`/api/profile?uid=${user.uid}`);
        if (!res.ok) return;
        const data = await res.json();
        setUsername(data.username);
      } else {
        setUsername("");
      }
    });
    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await logoutUser();

      document.cookie = "token=${idToken}; path=/; expires=Thu,01 Jan 1970 00:00:00 GMT ";
      router.push("/login");
    } catch (error) {
      console.error("error");
    }
  }
  return (
    <>
      <Header
        buttons={[{ label: "Cerrar Sesión", href: "", onClick: handleLogout, variant: "close" }]}
      >
        {username && (
          <p className="text-surface text-2xl font-bold tracking-wide">
            Hola, <span className="text-text">{username}</span>
          </p>
        )}
      </Header>
      <Container>
        <section className="flex h-full w-full">
          <CardHabitos label="Primer habito" description="No te olvides de tomar agua hoy" />
        </section>
      </Container>
    </>
  );
}
