import InputField from "@/features/ui/inputField";
import Button from "@/features/ui/BodyButton";
import { useFormHabitos } from "@/hooks/habitos/useFormHabitos";
import { Habito } from "@/types/Habito";

interface FormHabitoProps {
  onSuccess?: () => void;
  habito?: Habito | null;
}

export default function FormHabito({ onSuccess, habito = null }: FormHabitoProps) {
  const { onSubmit, error, loading } = useFormHabitos({ onSuccess, habito });
  const isEditMode = Boolean(habito?.id_habito);
  const defaultDate = habito?.fecha?.split("T")[0] ?? new Date().toISOString().split("T")[0];
  const keySuffix = habito?.id_habito ?? "new";

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <h2 className="text-center text-2xl font-bold">
        {isEditMode ? "Editar hábito" : "Nuevo habito"}
      </h2>

      <InputField
        key={`label-${keySuffix}`}
        label="Titulo"
        name="label"
        placeholder="Ej: Tomar Agua"
        type="text"
        maxLength={80}
        defaultValue={habito?.label ?? ""}
      />
      <InputField
        key={`descripcion-${keySuffix}`}
        label="Descripcion"
        name="descripcion"
        placeholder="Ej: Tomare 2 vasos de agua"
        type="text"
        maxLength={120}
        defaultValue={habito?.descripcion ?? ""}
      />

      <InputField
        key={`fecha-${keySuffix}`}
        label="Fecha"
        name="fecha"
        type="date"
        defaultValue={defaultDate}
      />

      {error && <p className="text-error text-center text-sm">{error}</p>}

      <Button
        label={loading ? "Guardando" : isEditMode ? "Actualizar hábito" : "Crear Habito"}
        variant="primary"
        type="submit"
      />
    </form>
  );
}
