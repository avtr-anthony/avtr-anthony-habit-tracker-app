import InputField from "@/features/ui/inputField";
import Button from "@/features/ui/BodyButton";
import { useFormHabitos } from "@/hooks/habitos/useFormHabitos";

interface FormHabitoProps {
  onSuccess?: () => void;
}

export default function FormHabito({ onSuccess }: FormHabitoProps) {
  const { onSubmit, error, loading } = useFormHabitos({ onSuccess });

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <h2 className="text-center text-2xl font-bold">Nuevo habito</h2>

      <InputField
        label="Titulo"
        name="label"
        placeholder="Ej: Tomar Agua"
        type="text"
        maxLength={80}
      />
      <InputField
        label="Descripcion"
        name="descripcion"
        placeholder="Ej: Tomare 2 vasos de agua"
        type="text"
        maxLength={120}
      />

      <InputField label="Fecha" name="fecha" type="date" />

      {error && <p className="text-error text-center text-sm">{error}</p>}

      <Button label={loading ? "Guardando" : "Crear Habito"} variant="primary" type="submit" />
    </form>
  );
}
