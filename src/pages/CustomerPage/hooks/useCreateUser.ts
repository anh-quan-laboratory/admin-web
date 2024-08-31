import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "../../../api/customers";

interface CreateUserProps {
  handleSucess?: () => void;
  handleError?: (error: Error) => void;
}

export default function useCreateUser({ handleSucess, handleError }: CreateUserProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      alert("Thêm khách hàng/bác sĩ thành công");
      if (handleSucess) handleSucess();
    },
    onError: (error) => {
      console.error(error);
      alert("Có lỗi xảy ra khi thêm khách hàng/bác sĩ");
      if (handleError) handleError(error);
    },
  });

  return mutation;
}
