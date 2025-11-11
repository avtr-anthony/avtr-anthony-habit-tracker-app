import InputField, { type InputFieldProps } from "@/features/ui/inputField";
import Button, { type ButtonProps } from "@/features/ui/BodyButton";

interface CardProps {
  title?: string;
  inputs: InputFieldProps[];
  button: ButtonProps;
  footerText?: string;
  footerLinkText?: string;
  footerHref?: string;
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CardAuth({
  title,
  inputs,
  button,
  footerText,
  children,
  footerLinkText,
  footerHref,
  onSubmit,
}: CardProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-surface border-border flex w-full max-w-sm flex-col rounded-2xl border p-6 shadow-xl sm:max-w-md sm:p-8"
    >
      <h1 className="text-primary mb-6 text-center text-2xl font-bold sm:text-left sm:text-3xl">
        {title || "Default"}
      </h1>

      <div className="flex flex-col gap-4 text-left">
        {inputs.map((input, index) => (
          <InputField key={index} {...input} />
        ))}
      </div>
      {children}
      <div className="mt-6 flex justify-end">
        <Button {...button} type="submit" />
      </div>

      {footerText && footerLinkText && footerHref && (
        <p className="text-textSecondary mt-6 text-center text-sm">
          {footerText}
          <a
            href={footerHref}
            className="text-primary font-medium hover:underline"
          >
            {footerLinkText}
          </a>
        </p>
      )}
    </form>
  );
}
