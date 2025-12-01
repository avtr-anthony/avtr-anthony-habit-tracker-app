"use client";

import Container from "@/features/ui/Container";
import Header from "@/features/ui/Header";
import { useAuth } from "@/context/AuthContext";
import InputField from "@/features/ui/inputField";
import Button from "@/features/ui/Button";
import { useLogout } from "@/hooks/useLogOut";
import Loading from "@/features/ui/Loading";
import { useGetUsername } from "@/hooks/useGetUsername";
import { useUpdateEmail } from "@/hooks/profile/useUpdateEmail";
import { useUpdatePassword } from "@/hooks/profile/useUpdatePassword";
import { useUpdateUsername } from "@/hooks/profile/useUpdateUsername";
import ModalDialog from "@/features/ui/ModalDialog";
import { useState } from "react";

// Página de panel de usuario (/profile).
// Desde aquí el usuario puede:
// - Ver su nombre de usuario actual y actualizarlo.
// - Ver su correo actual, proponer uno nuevo y confirmar con contraseña actual.
// - Cambiar su contraseña (requiere contraseña actual + confirmación).
// Además, después de cambios sensibles se muestra un modal para sugerir re-login.
export default function PerfilPage() {
  const { user } = useAuth();
  const { logout, loading: authLoading } = useLogout();
  const currentUsername = useGetUsername();
  const [showReauthModal, setShowReauthModal] = useState(false);
  // Hooks de actualización para cada sección del panel.
  const {
    loading: updateUsernameLoading,
    message: updateUsernameMessage,
    handleUpdateUsername
  } = useUpdateUsername(); // Solo toca la columna username en BD.
  const {
    loading: updateEmailLoading,
    message: updateEmailMessage,
    handleUpdateEmail
  } = useUpdateEmail(() => setShowReauthModal(true)); // Al terminar bien, abre el modal de re-login.
  const {
    loading: updatePasswordLoading,
    message: updatePasswordMessage,
    handleUpdatePassword
  } = useUpdatePassword(() => setShowReauthModal(true)); // Idem para contraseña.

  if (authLoading) return <Loading />; // Mientras se resuelve el logout o auth inicial.

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="hPanel" showUser onClick={logout} />
      <Container variant="panel">
        <section className="flex w-full flex-col justify-between gap-4">
          <div className="bg-surface/20 w-full rounded-xl p-4 shadow-xl/5 backdrop-blur-2xl">
            <h1 className="text-2xl font-bold">Panel de usuario</h1>
          </div>
          {/* Grid principal: lado izquierdo datos de perfil y correo, lado derecho contraseña */}
          <div className="flex h-full w-full flex-col gap-4 md:flex-row">
            {/* Cambiar nombre de usuario */}
            <div className="flex h-full w-full flex-col gap-4">
              <form
                onSubmit={handleUpdateUsername}
                className="bg-surface/30 flex w-full flex-col justify-between gap-4 rounded-lg p-4 shadow backdrop-blur-xl"
              >
                <h2 className="flex flex-col text-lg font-semibold">
                  Nombre de usuario actual{" "}
                  <span className="text-primaryHover">{currentUsername}</span>
                </h2>
                <InputField
                  type="text"
                  name="username"
                  maxLength={20}
                  placeholder="Nuevo nombre de usuario"
                />
                {updateUsernameMessage && (
                  <p className="text-primaryHover text-sm">{updateUsernameMessage}</p>
                )}
                <Button
                  label={updateUsernameLoading ? "Guardando..." : "Guardar nombre de usuario"}
                  variant="primary"
                  type="submit"
                />
              </form>

              {/* Cambiar correo (requiere contraseña actual) */}
              <form
                onSubmit={handleUpdateEmail}
                className="bg-surface/30 flex w-full flex-col justify-between gap-4 rounded-lg p-4 shadow backdrop-blur-xl"
              >
                <h2 className="flex flex-col text-lg font-semibold">
                  Correo actual<span className="text-primaryHover">{user?.email}</span>
                </h2>
                <div className="flex flex-col gap-2">
                  <InputField
                    type="email"
                    name="email"
                    maxLength={35}
                    placeholder="Nuevo correo"
                    label="Nuevo correo"
                  />
                  <InputField
                    id="currentPassword-email"
                    type="password"
                    name="currentPassword"
                    maxLength={20}
                    placeholder="Tu contraseña actual"
                    label="Contraseña actual"
                  />
                </div>
                {updateEmailMessage && (
                  <p className="text-primaryHover text-sm">{updateEmailMessage}</p>
                )}
                <Button
                  label={updateEmailLoading ? "Guardando..." : "Guardar correo"}
                  variant="primary"
                  type="submit"
                />
              </form>
            </div>
            {/* Cambiar contraseña (requiere contraseña actual + confirmación) */}
            <form
              onSubmit={handleUpdatePassword}
              className="bg-surface/30 flex w-full flex-col justify-between gap-4 rounded-lg p-4 shadow backdrop-blur-xl"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Contraseña</h2>

                <InputField
                  id="currentPassword-password"
                  type="password"
                  name="currentPassword"
                  maxLength={20}
                  placeholder="Tu contraseña actual"
                  label="Contraseña actual"
                />
                <InputField
                  type="password"
                  name="password"
                  maxLength={20}
                  placeholder="Nueva contraseña"
                  label="Nueva contraseña"
                />
                <InputField
                  type="password"
                  name="confirmPassword"
                  maxLength={20}
                  placeholder="Repite la nueva contraseña"
                  label="Confirmar contraseña"
                />
              </div>
              {updatePasswordMessage && (
                <p className="text-primaryHover text-sm">{updatePasswordMessage}</p>
              )}
              <Button
                label={updatePasswordLoading ? "Guardando..." : "Guardar contraseña"}
                variant="primary"
                type="submit"
              />
            </form>
          </div>
        </section>

        {/* Modal para avisar que debe volver a iniciar sesión tras cambios sensibles */}
        <ModalDialog
          open={showReauthModal}
          onClose={() => {
            setShowReauthModal(false);
            logout();
          }}
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Vuelve a iniciar sesión</h2>
            <p className="text-textSecondary text-sm">
              Por seguridad, después de cambiar tu correo o contraseña debes volver a iniciar
              sesión.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                label="Seguir en la cuenta"
                variant="outline"
                type="button"
                onClick={() => setShowReauthModal(false)}
              />
              <Button label="Cerrar sesión ahora" variant="close" type="button" onClick={logout} />
            </div>
          </div>
        </ModalDialog>
      </Container>
    </div>
  );
}
