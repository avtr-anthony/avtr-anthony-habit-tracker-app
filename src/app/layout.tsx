import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

// Configuración de la fuente Roboto con variable CSS personalizada
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"]
});

// Configuración de la fuente Montserrat con variable CSS personalizada
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"]
});

// Metadata de la aplicación
export const metadata: Metadata = {
  title: "Hábitos Diarios App", // Título de la app
  description: "Lleva un seguimiento de tus hábitos" // Descripción para SEO
};

// Layout raíz de la aplicación
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode; // Contenido de la página que se renderiza dentro del layout
}>) {
  return (
    <html lang="es" className="h-full">
      <body
        className={`${roboto.variable} ${montserrat.variable} background-gradient text-text flex h-full flex-col antialiased`}
      >
        {/* Contexto de autenticación disponible para toda la app */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
