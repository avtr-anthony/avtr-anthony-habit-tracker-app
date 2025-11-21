import InputField, { type InputFieldProps } from "@/features/ui/inputField";
import Button, { type ButtonProps } from "@/features/ui/BodyButton";

// Props del componente CardAuth
interface CardProps {
  title?: string; // Título del card
  inputs: InputFieldProps[]; // Lista de inputs para el formulario
  button: ButtonProps; // Configuración del botón de envío
  footerText?: string; // Texto del pie de card
  footerLinkText?: string; // Texto del enlace del pie
  footerHref?: string; // Href del enlace del pie
  children?: React.ReactNode; // Elementos hijos opcionales
  onSubmit?: (ev: React.FormEvent<HTMLFormElement>) => void; // Función al enviar el formulario
}

// Componente funcional CardAuth
export default function CardAuth({
  title,
  inputs,
  button,
  footerText,
  children,
  footerLinkText,
  footerHref,
  onSubmit
}: CardProps) {
  return (
    <form
      noValidate
      onSubmit={onSubmit} // Maneja el submit del formulario
      className="bg-surface/30 flex w-full max-w-sm flex-col rounded-2xl p-6 shadow-xl/5 backdrop-blur-xl sm:max-w-md sm:p-8"
    >
      {/* Título del card */}
      <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">{title || "Default"}</h1>

      {/* Inputs del formulario */}
      <div className="flex flex-col gap-4 text-left">
        {inputs.map((input, index) => (
          <InputField key={index} {...input} />
        ))}
      </div>

      {/* Elementos hijos opcionales (por ejemplo mensajes de error) */}
      {children}

      {/* Botón de envío */}
      <div className="mt-6 flex justify-end">
        <Button {...button} type="submit" />
      </div>

      {/* Pie del card con enlace */}
      {footerText && footerLinkText && footerHref && (
        <p className="text-textSecondary mt-6 text-center text-sm">
          {footerText}
          <a href={footerHref} className="text-primary font-medium hover:underline">
            {footerLinkText}
          </a>
        </p>
      )}
    </form>
  );
}
