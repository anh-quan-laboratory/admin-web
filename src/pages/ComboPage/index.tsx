import { AddCircle } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import useMultipleDialogs from "../../hooks/useMultipleDialogs";
import ComboList from "./components/ComboList";
import CreateComboDialog from "./components/CreateComboDialog";

enum ComboDialog {
  CREATE_COMBO = "create-combo",
  EDIT_COMBO = "edit-combo",
  DELETE_COMBO = "delete-combo",
}

export default function ComboPage() {
  const { dialogs, openDialog, closeDialog } = useMultipleDialogs({
    [ComboDialog.CREATE_COMBO]: { isOpen: false, data: null },
  });

  return (
    <Stack direction="column" spacing={3}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="h4">Danh mục gói xét nghiệm</Typography>
        <Button variant="outlined" startIcon={<AddCircle />} onClick={() => openDialog(ComboDialog.CREATE_COMBO)}>
          Thêm gói xét nghiệm
        </Button>
      </Stack>

      <CreateComboDialog
        isOpen={dialogs[ComboDialog.CREATE_COMBO].isOpen}
        handleClose={() => closeDialog(ComboDialog.CREATE_COMBO)}
      />

      <ComboList onRowEditClick={() => openDialog(ComboDialog.CREATE_COMBO)} />
    </Stack>
  );
}
