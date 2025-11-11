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
  name,
}: InputFieldProps) {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className="mb-1 text-sm font-medium text-textSecondary"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full p-2 sm:p-3 border rounded-lg border-border focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </div>
  );
}
