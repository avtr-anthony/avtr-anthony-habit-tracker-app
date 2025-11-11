"use client";
import { auth } from "@/lib/firebase";

export default function TestFirebase() {
  console.log("Firebase Auth conectado:", auth);
  return <p>Firebase listo ✅ (revisa la consola del navegador)</p>;
}
