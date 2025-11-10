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
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className="flex p-2 border rounded-lg border-border focus:outline-border"
    ></input>
  );
}
