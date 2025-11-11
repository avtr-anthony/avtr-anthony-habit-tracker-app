import InputField, { type InputFieldProps } from "@/features/ui/inputField";
import Button, { type ButtonProps } from "@/features/ui/BodyButton";

interface CardProps {
  title?: string;
  inputs: InputFieldProps[];
  button: ButtonProps;
  footerText?: string;
  footerLinkText?: string;
  footerHref?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CardAuth({
  title,
  inputs,
  button,
  footerText,
  footerLinkText,
  footerHref,
  onSubmit,
}: CardProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col bg-surface rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md border border-border"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 text-center sm:text-left">
        {title || "Default"}
      </h1>

      <div className="flex flex-col gap-4 text-left">
        {inputs.map((input, index) => (
          <InputField key={index} {...input} />
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <Button {...button} type="submit" />
      </div>

      {footerText && footerLinkText && footerHref && (
        <p className="text-sm text-textSecondary mt-6 text-center">
          {footerText}{" "}
          <a
            href={footerHref}
            className="text-primary hover:underline font-medium"
          >
            {footerLinkText}
          </a>
        </p>
      )}
    </form>
  );
}
