import { Card, Dialog, Typography } from "@mui/material";
import ComboForm from "./ComboForm";

interface CreateComboDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

export default function CreateComboDialog({ isOpen, handleClose }: CreateComboDialogProps) {
  return (
    <Dialog scroll="body" open={isOpen} onClose={handleClose} maxWidth="md" fullWidth={true}>
      <Card sx={{ px: 2, py: 3 }}>
        <Typography variant="h6" gutterBottom mb={2}>
          Thêm gói xét nghiệm
        </Typography>

        <ComboForm />
      </Card>
    </Dialog>
  );
}
