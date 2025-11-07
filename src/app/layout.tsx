import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";


const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hábitos Diarios App",
  description: "Lleva un seguimiento de tus hábitos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${roboto.variable} ${montserrat.variable} antialiased min-h-screen bg-[#fefefe]`}
      >
        <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
        </main>
      </body>
    </html>
  );
}
