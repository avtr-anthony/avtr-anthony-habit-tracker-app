export default function Loading() {
  return (
    <main className="background-gradient flex min-h-screen flex-col items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
      <p className="mt-3 text-gray-500">Cargando...</p>
    </main>
  );
}
