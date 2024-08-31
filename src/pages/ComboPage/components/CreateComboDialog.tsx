import { Card, Dialog, Typography } from "@mui/material";
import { Combo } from "../../../types/combo";
import ComboForm from "./ComboForm";

interface CreateComboDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  combo?: Combo;
}

export default function CreateComboDialog({ isOpen, handleClose, combo }: CreateComboDialogProps) {
  return (
    <Dialog scroll="body" open={isOpen} onClose={handleClose} maxWidth="md" fullWidth={true}>
      <Card sx={{ px: 2, py: 3 }}>
        <Typography variant="h6" gutterBottom mb={2}>
          Thêm gói xét nghiệm
        </Typography>

        <ComboForm combo={combo} onSubmit={handleClose} />
      </Card>
    </Dialog>
  );
}
