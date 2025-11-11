export interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  name?: string;
}

export default function InputField({
  label,
  type = "text",
  placeholder = "",
  name
}: InputFieldProps) {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name} className="text-textSecondary mb-1 text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="border-border focus:ring-primary w-full rounded-lg border p-2 transition focus:ring-2 focus:outline-none sm:p-3"
      />
    </div>
  );
}
