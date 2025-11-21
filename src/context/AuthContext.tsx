"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

// Definición de la interfaz para el contexto de autenticación
interface AuthContextType {
  user: User | null; // Usuario actual, null si no hay sesión
  loading: boolean; // Indica si se está verificando la sesión
}

// Crear contexto de autenticación con valores iniciales
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true
});

// Proveedor de contexto que envuelve toda la aplicación
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null); // Estado del usuario actual
  const [loading, setLoading] = useState(true); // Estado de carga inicial

  // Efecto para escuchar cambios en la autenticación de Firebase
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    // onAuthStateChanged escucha cambios en el estado de login
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Actualizar usuario

      // Pequeño retraso para mejorar UX antes de quitar el loading
      setTimeout(() => {
        setLoading(false);
      }, 300);
    });

    // Cleanup: desuscribirse al desmontar el componente
    return () => unsub();
  }, []);

  // Proveer el estado de autenticación a todos los hijos del contexto
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

// Hook personalizado para acceder fácilmente al contexto de auth
export function useAuth() {
  return useContext(AuthContext);
}
