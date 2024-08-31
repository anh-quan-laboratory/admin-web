import { AddCircle } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import useMultipleDialogs from "../../hooks/useMultipleDialogs";
import ComboList from "./components/ComboList";
import CreateComboDialog from "./components/CreateComboDialog";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";

enum ComboDialog {
  CREATE_COMBO = "create-combo",
  EDIT_COMBO = "edit-combo",
  DELETE_COMBO = "delete-combo",
}

export default function ComboPage() {
  const { dialogs, openDialog, closeDialog } = useMultipleDialogs({
    [ComboDialog.CREATE_COMBO]: { isOpen: false, data: null },
    [ComboDialog.DELETE_COMBO]: { isOpen: false, data: null },
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
        combo={dialogs[ComboDialog.CREATE_COMBO].data}
      />

      {dialogs[ComboDialog.DELETE_COMBO].isOpen && (
        <DeleteConfirmDialog
          isOpen={dialogs[ComboDialog.DELETE_COMBO].isOpen}
          handleClose={() => closeDialog(ComboDialog.DELETE_COMBO)}
          combo={dialogs[ComboDialog.DELETE_COMBO].data}
        />
      )}

      <ComboList
        onRowEditClick={(row) => openDialog(ComboDialog.CREATE_COMBO, row)}
        onRowDeleteClick={(row) => openDialog(ComboDialog.DELETE_COMBO, row)}
      />
    </Stack>
  );
}
