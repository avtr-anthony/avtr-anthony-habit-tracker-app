export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-20">
      {children}
    </div>
  );
}
