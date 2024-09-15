import { Button, Stack, TextField, Typography } from "@mui/material";

import CustomDialog from "@/components/CustomDialog";
import CustomTable, { ColDef } from "@/components/CustomTable";
import UserForm from "@/components/Form/UserForm";
import { DialogContext } from "@/components/CustomDialog/DialogContext";
import useFetchUsers from "@/hooks/useFetchUsers";
import { AddCircle } from "@mui/icons-material";
import { useContext } from "react";
import { Customer, User, UserRole } from "../types/user";
import ConfirmDialog from "@/components/CustomDialog/ConfirmDialog";
import useDeleteUser from "@/hooks/useDeleteUser";

const columns: ColDef<User>[] = [
  { field: "name", headerName: "Họ và tên", flex: 1 },
  { field: "phone", headerName: "Số điện thoại", width: 150 },
  { field: "dob", headerName: "Ngày sinh", width: 150 },
  { field: "address", headerName: "Địa chỉ", width: 350 },
];

type UserPageProps = {
  role: UserRole;
};

export default function UserPage({ role }: UserPageProps) {
  const { data, isLoading, isError, keyword, setKeyword } = useFetchUsers({ role });
  const { mutate } = useDeleteUser({ role });

  const { openDialog, closeDialog, getDialogData } = useContext(DialogContext);

  const handleOpenDialog = (action: string, data?: any) => {
    openDialog(`${role}-${action}`, data);
  };

  const handleCloseDialog = (action: string) => () => {
    closeDialog(`${role}-${action}`);
  };

  const getDialogId = (action: string) => `${role}-${action}`;

  return (
    <Stack direction="column" spacing={3}>
      <Typography variant="h4">Danh mục {role == UserRole.CUSTOMER ? "khách hàng" : "bác sĩ"}</Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <TextField
          sx={{ minWidth: "400px" }}
          label="Tìm theo tên, số điện thoại"
          size="small"
          variant="outlined"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="outlined" color="primary" startIcon={<AddCircle />} onClick={() => handleOpenDialog("create")}>
          Thêm {role == UserRole.CUSTOMER ? "khách hàng" : "bác sĩ"}
        </Button>
      </Stack>

      <CustomTable
        columns={columns}
        rows={data as Customer[]}
        loading={isLoading}
        isError={isError}
        onCellEditClick={(row) => handleOpenDialog("edit", row)}
        onCellDeleteClick={(row) => handleOpenDialog("delete", row)}
      />

      <CustomDialog name={getDialogId("create")} maxWidth="md">
        <UserForm
          role={role}
          user={getDialogData(getDialogId("create")) as User}
          onSettled={handleCloseDialog("create")}
        />
      </CustomDialog>

      <CustomDialog name={getDialogId("edit")} maxWidth="md">
        <UserForm role={role} user={getDialogData(getDialogId("edit")) as User} onSettled={handleCloseDialog("edit")} />
      </CustomDialog>

      <ConfirmDialog
        name={getDialogId("delete")}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa ${role == UserRole.CUSTOMER ? "khách hàng" : "bác sĩ"} ${(getDialogData(getDialogId("delete")) as User)?.name}?`}
        onConfirm={() => {
          mutate((getDialogData(getDialogId("delete")) as User)._id);
          handleCloseDialog("delete")();
        }}
        type="delete"
      />
    </Stack>
  );
}
