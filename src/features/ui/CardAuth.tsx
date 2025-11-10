import InputField, { type InputFieldProps } from "@/features/ui/inputField";
import Button, { type ButtonProps } from "@/features/ui/BodyButton";

interface CardProps {
  title?: string;
  inputs: InputFieldProps[];
  button: ButtonProps;
  footerText?: string;
  footerLinkText?: string;
  footerHref?: string;
}

export default function CardAuth({
  title,
  inputs,
  button,
  footerText,
  footerLinkText,
  footerHref,
}: CardProps) {
  return (
    <div className="flex flex-col bg-surface rounded-lg shadow-xl p-8 w-full max-w-md border border-border">
      <h1 className="text-2xl font-bold text-primary mb-6">
        {title || "Default"}
      </h1>
      <div className="flex flex-col gap-4 text-left">
        {inputs.map((input, index) => (
          <InputField key={index} {...input} />
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <Button {...button} />
      </div>

      {footerText && footerLinkText && footerHref && (
        <p className="text-sm text-text-secondary mt-6 text-center">
          {footerText}{" "}
          <a
            href={footerHref}
            className="text-primary hover:underline font-medium"
          >
            {footerLinkText}
          </a>
        </p>
      )}
    </div>
  );
}
