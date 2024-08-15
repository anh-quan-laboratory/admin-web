import { Button, Card, Dialog, Typography } from "@mui/material";
import TestForm from "../../../components/TestForm";
import { Test } from "../../../types/test";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTest as editTestApi } from "../../../api/tests";

interface TestEditDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  defaultData: Test;
}

export default function TestEditDialog({ isOpen, handleClose, defaultData }: TestEditDialogProps) {
  const queryClient = useQueryClient();

  const { mutate: editTest, isPending } = useMutation({
    mutationFn: (data: Partial<Test>) => editTestApi(defaultData._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
      alert("Chỉnh sửa xét nghiệm thành công");
      handleClose();
    },
    onError: (error) => {
      console.error(error);
      alert("Có lỗi xảy ra khi chỉnh sửa xét nghiệm");
    },
  });

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="md">
      <Card sx={{ px: 2, py: 3 }}>
        <Typography variant="h6" gutterBottom mb={2}>
          Chỉnh sửa thông tin xét nghiệm
        </Typography>
        <TestForm
          defaultValues={defaultData}
          onSubmit={editTest}
          SubmitBtn={
            <Button disabled={isPending} type="submit" variant="contained" color="primary">
              {isPending ? "Đang xử lý" : "Chỉnh sửa xét nghiệm"}
            </Button>
          }
        />
      </Card>
    </Dialog>
  );
}
