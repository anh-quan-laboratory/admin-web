import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTest as createTestApi } from "../../../api/tests";
import { Button, Card, Dialog, Typography } from "@mui/material";
import TestForm from "../../../components/TestForm";

interface CreateTestDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  defaultData: any;
}

export default function CreateTestDialog({ isOpen, handleClose, defaultData }: CreateTestDialogProps) {
  const queryClient = useQueryClient();

  const { mutate: createTest, isPending } = useMutation({
    mutationFn: createTestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
      alert("Thêm xét nghiệm thành công");
      handleClose();
    },
    onError: (error) => {
      console.error(error);
      alert("Có lỗi xảy ra khi thêm xét nghiệm");
    },
  });

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="md">
      <Card sx={{ px: 2, py: 3 }}>
        <Typography variant="h6" gutterBottom mb={2}>
          Thêm xét nghiệm
        </Typography>
        <TestForm
          defaultValues={defaultData}
          onSubmit={createTest}
          SubmitBtn={
            <Button disabled={isPending} type="submit" variant="contained" color="primary">
              {isPending ? "Đang xử lý" : "Thêm xét nghiệm"}
            </Button>
          }
        />
      </Card>
    </Dialog>
  );
}
