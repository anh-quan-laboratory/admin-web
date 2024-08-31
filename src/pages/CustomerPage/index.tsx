import { Button, Stack, Typography } from "@mui/material";

import { AddCircle } from "@mui/icons-material";
import useMultipleDialogs from "../../hooks/useMultipleDialogs";
import { UserRole } from "../../types/user";
import CreateCustomerDialog from "./components/CreateCustomerDialog";
import CustomerList from "./components/CustomerList";
import EditCustomerDialog from "./components/EditCustomerDialog";

export default function CustomerManagementPage() {
  const { dialogs, openDialog, closeDialog } = useMultipleDialogs({
    "create-user": { isOpen: false, data: { name: "", address: "", phone: "", dob: "", role: UserRole.CUSTOMER } },
    "edit-user": { isOpen: false, data: null },
    "delete-user": { isOpen: false, data: null },
  });

  return (
    <Stack direction="column" spacing={3}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="h4">Danh mục khách hàng</Typography>
        <Button variant="outlined" color="primary" startIcon={<AddCircle />} onClick={() => openDialog("create-user")}>
          Thêm khách hàng
        </Button>
      </Stack>

      <CustomerList onRowEditClick={(row) => openDialog("edit-user", row)} />

      <CreateCustomerDialog
        isOpen={dialogs["create-user"].isOpen}
        handleClose={() => closeDialog("create-user")}
        defaultData={dialogs["create-user"].data}
      />

      <EditCustomerDialog
        isOpen={dialogs["edit-user"].isOpen}
        handleClose={() => closeDialog("edit-user")}
        defaultData={dialogs["edit-user"].data}
      />
    </Stack>
  );
}
