import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTest as deleteTestApi } from "../../../api/tests";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  data: any;
}

export default function DeleteConfirmDialog({ isOpen, handleClose, data }: DeleteConfirmDialogProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteTest } = useMutation({
    mutationFn: deleteTestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
      alert("Xoá xét nghiệm thành công");
    },
    onError: (error) => {
      console.error(error);
      alert("Có lỗi xảy ra khi xoá xét nghiệm");
    },
    onSettled: () => {
      handleClose();
    },
  });

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm">
      <DialogTitle>
        Bạn có chắc muốn xoá <b>{data?.name}</b>{" "}
      </DialogTitle>
      <DialogContent>
        <Typography>Tất cả dữ liệu sẽ bị xoá và không thể khôi phục lại.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={() => deleteTest(data._id)} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
