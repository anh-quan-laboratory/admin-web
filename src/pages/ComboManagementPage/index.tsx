import { AddCircle } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import useMultipleDialogs from "../../hooks/useMultipleDialogs";
import { defaultTest } from "../../types/test";
import ComboDataGrid from "./components/ComboDataGrid";

export default function TestManagementPage() {
  const { dialogs, openDialog, closeDialog } = useMultipleDialogs({
    "create-combo": { isOpen: false, data: defaultTest },
    "edit-combo": { isOpen: false, data: null },
    "delete-combo": { isOpen: false, data: null },
  });

  return (
    <Stack direction="column" spacing={3}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="h4">Danh mục gói xét nghiệm</Typography>
        <Button variant="outlined" color="primary" startIcon={<AddCircle />} onClick={() => openDialog("create-test")}>
          Thêm gói xét nghiệm
        </Button>
      </Stack>

      <ComboDataGrid />
    </Stack>
  );
}
