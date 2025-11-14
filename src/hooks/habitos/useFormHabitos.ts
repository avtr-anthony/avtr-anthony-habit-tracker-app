"use client";

import { useCreateHabito } from "./useCreateHabitos";

interface UseFormHabitoProps {
  onSuccess?: () => void;
}

export function useFormHabitos({ onSuccess }: UseFormHabitoProps) {
  const { handleCreate, error, loading } = useCreateHabito();

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    const result = await handleCreate(ev);

    if (result === "success" && onSuccess) {
      onSuccess();
    }
  }

  return {
    onSubmit,
    error,
    loading
  };
}
