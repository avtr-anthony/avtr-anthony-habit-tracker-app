import InputField from "@/features/ui/inputField";
import Button from "@/features/ui/BodyButton";
import { useFormHabitos } from "@/hooks/habitos/useFormHabitos";
import { Habito } from "@/types/Habito";

// Props del formulario de hábito
interface FormHabitoProps {
  onSuccess?: () => void; // Callback al completar exitosamente
  habito?: Habito | null; // Hábito a editar (opcional)
  defaultDate?: string; // Fecha por defecto cuando se crea uno nuevo
}

// Componente de formulario para crear o editar un hábito
export default function FormHabito({ onSuccess, habito = null, defaultDate }: FormHabitoProps) {
  // Hook personalizado que maneja la lógica de formulario (envío, errores, loading)
  const { onSubmit, error, loading } = useFormHabitos({ onSuccess, habito });

  // Determina si el formulario está en modo edición
  const isEditMode = Boolean(habito?.id_habito);

  // Fecha por defecto (del hábito, fecha seleccionada o hoy)
  const fallbackDate = defaultDate ?? new Date().toISOString().split("T")[0];
  const inputDate = habito?.fecha?.split("T")[0] ?? fallbackDate;

  // Sufijo único para keys de inputs (para forzar re-render si cambia el hábito)
  const keySuffix = habito?.id_habito ?? "new";

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Título del formulario */}
      <h2 className="text-center text-2xl font-bold">
        {isEditMode ? "Editar hábito" : "Nuevo habito"}
      </h2>

      {/* Campo para el título del hábito */}
      <InputField
        key={`label-${keySuffix}`}
        label="Titulo"
        name="label"
        placeholder="Ej: Tomar Agua"
        type="text"
        maxLength={80}
        defaultValue={habito?.label ?? ""}
      />

      {/* Campo para la descripción del hábito */}
      <InputField
        key={`descripcion-${keySuffix}`}
        label="Descripcion"
        name="descripcion"
        placeholder="Ej: Tomare 2 vasos de agua"
        type="text"
        maxLength={120}
        defaultValue={habito?.descripcion ?? ""}
      />

      {/* Campo para la fecha */}
      <InputField
        key={`fecha-${keySuffix}`}
        label="Fecha"
        name="fecha"
        type="date"
        defaultValue={inputDate}
      />

      {/* Mensaje de error si existe */}
      {error && <p className="text-error text-center text-sm">{error}</p>}

      {/* Botón de envío, cambia según loading o modo de edición */}
      <Button
        label={loading ? "Guardando" : isEditMode ? "Actualizar hábito" : "Crear Habito"}
        variant="primary"
        type="submit"
      />
    </form>
  );
}
