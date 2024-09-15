import { deleteUser } from "@/api/userApi";
import { UserRole } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteUser({ role }: { role: UserRole }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      alert(`Xóa ${role == UserRole.CUSTOMER ? "khách hàng" : "bác sĩ"} thành công`);
    },
    onError: () => {
      alert(`Có lỗi xảy ra khi xóa ${role == UserRole.CUSTOMER ? "khách hàng" : "bác sĩ"}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users", { role }] });
    },
  });
  return mutation;
}
