import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Combo } from "../../../types/combo";
import useDeleteCombo from "../hooks/useDeleteCombo";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  combo: Combo;
}

export default function DeleteConfirmDialog({ isOpen, handleClose, combo }: DeleteConfirmDialogProps) {
  const { mutate: deleteCombo, isPending } = useDeleteCombo({
    onSuccess: () => handleClose(),
    onError: () => handleClose(),
  });

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm">
      <DialogTitle>Xóa gói xét nghiệm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn xóa gói xét nghiệm <b>{combo.name}</b> không? Hành động này không thể hoàn tác.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
        <Button onClick={() => deleteCombo(combo._id)} color="error" variant="contained" disabled={isPending}>
          {isPending ? "Đang xử lý" : "Xóa"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
