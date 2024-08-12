import { AddCircle } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import useMultipleDialogs from "../../hooks/useMultipleDialogs";
import { defaultTest } from "../../types/test";
import CreateTestDialog from "./components/CreateTestDialog";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import EditTestDialog from "./components/EditTestDialog";
import TestDataGrid from "./components/TestDataGrid";

export default function TestManagementPage() {
  const { dialogs, openDialog, closeDialog } = useMultipleDialogs({
    "create-test": { isOpen: false, data: defaultTest },
    "edit-test": { isOpen: false, data: null },
    "delete-test": { isOpen: false, data: null },
  });

  return (
    <Stack direction="column" spacing={3}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="h4">Danh mục xét nghiệm</Typography>
        <Button variant="outlined" color="primary" startIcon={<AddCircle />} onClick={() => openDialog("create-test")}>
          Thêm xét nghiệm
        </Button>
      </Stack>

      <TestDataGrid
        onRowDeleteClick={(row) => openDialog("delete-test", row)}
        onRowEditClick={(row) => openDialog("edit-test", row)}
      />

      <EditTestDialog
        isOpen={dialogs["edit-test"].isOpen}
        handleClose={() => closeDialog("edit-test")}
        defaultData={dialogs["edit-test"].data}
      />

      <CreateTestDialog
        isOpen={dialogs["create-test"].isOpen}
        handleClose={() => closeDialog("create-test")}
        defaultData={defaultTest}
      />

      <DeleteConfirmDialog
        isOpen={dialogs["delete-test"].isOpen}
        handleClose={() => closeDialog("delete-test")}
        data={dialogs["delete-test"].data}
      />
    </Stack>
  );
}
