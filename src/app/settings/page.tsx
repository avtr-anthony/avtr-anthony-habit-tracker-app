"use client";

import Container from "@/features/ui/Container";
import Header from "@/features/ui/Header";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import InputField from "@/features/ui/inputField";
import Button from "@/features/ui/BodyButton";
import { useLogout } from "@/hooks/useLogOut";
import Loading from "@/features/ui/Loading";
import { useGetUsername } from "@/hooks/useGetUsername";
export default function PerfilPage() {
  const { user } = useAuth();
  const { logout, loading: authLoading } = useLogout();
  const currentUsername = useGetUsername();
  const [username, setUsername] = useState(currentUsername ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePendingUpdate = (field: string) => {
    setMessage(`La actualización de ${field} estará disponible muy pronto.`);
  };


  if (authLoading) return <Loading />;

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="hPanel" showUser onClick={logout} />
      <Container variant="panel">
        <section className="flex h-full w-full flex-col justify-between gap-4 md:max-w-xl">
          <div className="bg-surface/20 w-full rounded-xl p-4 shadow-xl/5 backdrop-blur-2xl">
            <h1 className="text-2xl font-bold">Panel de usuario</h1>
          </div>

          {/* Cambiar nombre de usuario */}
          <div className="bg-surface/30 flex flex-col gap-4 rounded-lg p-4 shadow backdrop-blur-xl">
            <h2 className="flex flex-col text-lg font-semibold">
              Nombre de usuario actual <span className="text-primaryHover">{currentUsername}</span>
            </h2>
            <InputField
              type="text"
              name="username"
              maxLength={20}
              placeholder={"Nuevo nombre de usuario"}
              value={username}
              onChange={setUsername}
            />
            <Button
              label="Guardar nombre de usuario"
              variant="primary"
              onClick={() => handlePendingUpdate("nombre de usuario")}
            />
          </div>

          {/* Cambiar correo */}
          <div className="bg-surface/0 flex flex-col gap-4 rounded-lg p-4 shadow backdrop-blur-xl">
            <h2 className="flex flex-col text-lg font-semibold">
              Correo actual<span className="text-primaryHover">{user?.email}</span>
            </h2>
            <InputField
              type="email"
              name="email"
              maxLength={35}
              placeholder="Nuevo correo"
              value={email}
              onChange={setEmail}
            />
            <Button
              label="Guardar correo"
              variant="primary"
              onClick={() => handlePendingUpdate("correo")}
            />
          </div>

          {/* Cambiar contraseña */}
          <div className="bg-surface/30 flex flex-col gap-4 rounded-lg p-4 shadow backdrop-blur-xl">
            <h2 className="text-lg font-semibold">Contraseña</h2>
            <InputField
              type="password"
              name="password"
              maxLength={20}
              placeholder="Nueva contraseña"
              label=""
              value={password}
              onChange={setPassword}
            />
            <Button
              label="Guardar contraseña"
              variant="primary"
              onClick={() => handlePendingUpdate("contraseña")}
            />
          </div>

          {message && <p className="text-primaryHover text-sm">{message}</p>}
        </section>
      </Container>
    </div>
  );
}
