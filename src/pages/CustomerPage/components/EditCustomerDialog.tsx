import { Button, Card, Dialog, Typography } from "@mui/material";
import CustomerForm from "./CustomerForm";
import { User } from "../../../types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCustomer as editCustomerApi } from "../../../api/customers";

interface CustomerEditDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  defaultData: User;
}

export default function CustomerEditDialog({ isOpen, handleClose, defaultData }: CustomerEditDialogProps) {
  const queryClient = useQueryClient();

  const { mutate: editCustomer, isPending } = useMutation({
    mutationFn: (data: Partial<User>) => editCustomerApi(defaultData._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      alert("Chỉnh sửa khách hàng thành công");
      handleClose();
    },
    onError: (error) => {
      console.error(error);
      alert("Có lỗi xảy ra khi chỉnh sửa khách hàng");
    },
  });

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="md">
      <Card sx={{ px: 2, py: 3 }}>
        <Typography variant="h6" gutterBottom mb={2}>
          Chỉnh sửa thông tin khách hàng
        </Typography>
        <CustomerForm
          defaultValues={defaultData}
          onSubmit={editCustomer}
          SubmitBtn={
            <Button disabled={isPending} type="submit" variant="contained" color="primary">
              {isPending ? "Đang xử lý" : "Chỉnh sửa khách hàng"}
            </Button>
          }
        />
      </Card>
    </Dialog>
  );
}
