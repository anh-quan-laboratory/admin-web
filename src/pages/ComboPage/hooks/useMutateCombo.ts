import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCombo, updateCombo } from "../../../api/combos";
import { ComboSchema } from "../../../types/combo";

type UseMutateComboProps = {
  comboId?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

enum Mode {
  CREATE = "create",
  UPDATE = "update",
}

export default function useMutateCombo({ comboId, onSuccess, onError }: UseMutateComboProps) {
  const mode = comboId ? Mode.UPDATE : Mode.CREATE;
  const queryClient = useQueryClient();

  const mutationFn = (data: ComboSchema) => {
    if (mode == Mode.CREATE) {
      return createCombo(data);
    }

    return updateCombo(comboId as string, data);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["combos"] });
      alert(`Gói xét nghiệm đã được ${mode == "create" ? "tạo mới" : "cập nhật"}`);
      onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      alert(`Có lỗi xảy ra khi ${mode == "create" ? "tạo mới" : "cập nhật"} gói xét nghiệm`);
      onError?.(error);
    },
  });
}
