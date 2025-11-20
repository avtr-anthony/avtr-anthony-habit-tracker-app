// Componente funcional Loading
export default function Loading() {
  return (
    // Contenedor principal centrado y con fondo gradiente
    <main className="background-gradient flex min-h-screen flex-col items-center justify-center">
      
      {/* Animación de carga circular */}
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />

      {/* Texto indicativo de carga */}
      <p className="mt-3 text-gray-500">Cargando...</p>
    </main>
  );
}
