export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-20 w-full h-full flex flex-1 flex-col justify-center items-center">
      {children}
    </div>
  );
}
