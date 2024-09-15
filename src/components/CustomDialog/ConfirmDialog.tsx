import { useContext } from "react";
import CustomDialog, { DialogContext } from ".";
import { DialogTitle, DialogContent, Typography, DialogActions, Button } from "@mui/material";

type ConfirmationDialogProps = {
  name: string;
  onConfirm: () => void;
  title: string;
  message: string;
  type: "delete" | "edit" | "info";
};

export default function ConfirmDialog({ name, title, message, onConfirm, type }: ConfirmationDialogProps) {
  const { closeDialog } = useContext(DialogContext);

  return (
    <CustomDialog name={name}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDialog(name)} color="primary">
          Bỏ qua
        </Button>
        <Button onClick={onConfirm} color={type == "delete" ? "error" : "info"}>
          Xác nhận
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}
