import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCombo } from "../../../api/combos";

type UseDeleteComboProps = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

export default function useDeleteCombo({ onSuccess, onError }: UseDeleteComboProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCombo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["combos"] });
      alert("Xóa gói xét nghiệm thành công");
      onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      alert("Có lỗi xảy ra khi xóa gói xét nghiệm");
      onError?.(error);
    },
  });
}
