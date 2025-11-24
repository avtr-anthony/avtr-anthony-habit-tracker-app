"use client";

import Container from "@/features/ui/Container";
import Header from "@/features/ui/Header";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import InputField from "@/features/ui/inputField";
import Button from "@/features/ui/BodyButton";
export default function PerfilPage() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // TODO: aquí luego conectamos la lógica real de actualización

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="hPanel" showUser />
      <Container variant="panel">
        <section className="flex h-full w-full flex-col justify-evenly">
          <h1 className="text-2xl font-bold">Panel de usuario</h1>

          {/* Cambiar nombre de usuario */}
          <div className="bg-surface/30 flex flex-col gap-4 rounded-lg p-4 shadow backdrop-blur-xl">
            <h2 className="mb-2 text-lg font-semibold">Nombre de usuario</h2>
            <InputField
              type="text"
              name="username"
              maxLength={20}
              placeholder="Nuevo nombre de usuario"
              label=""
            />
            <Button label="Guardar nombre de usuario" variant="primary" />
          </div>

          {/* Cambiar correo */}
          <div className="bg-surface/20 flex flex-col gap-4 rounded-lg p-4 shadow backdrop-blur-xl">
            <h2 className="mb-2 text-lg font-semibold">Correo</h2>
            <InputField
              type="email"
              name="email"
              maxLength={35}
              placeholder="Nuevo correo"
              label=""
            />
            <Button label="Guardar correo" variant="primary" />
          </div>

          {/* Cambiar contraseña */}
          <div className="bg-surface/30 flex flex-col gap-4 rounded-lg p-4 shadow backdrop-blur-xl">
            <h2 className="mb-2 text-lg font-semibold">Contraseña</h2>
            <InputField
              type="password"
              name="password"
              maxLength={20}
              placeholder="Nueva contraseña"
              label=""
            />
            <Button label="Guardar contraseña" variant="primary" />
          </div>

          {message && <p className="text-primaryHover text-sm">{message}</p>}
        </section>
      </Container>
    </div>
  );
}
