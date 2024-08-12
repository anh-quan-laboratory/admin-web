import { AddCircle } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createTest as createTestApi, deleteTest as deleteTestApi, getAllTests as getAllTestsApi } from "../api/tests";
import TestForm from "../components/TestForm";
import useMultipleDialogs from "../hooks/useMultipleDialogs";
import { defaultTest, Test, TestCategory } from "../types/test";

export const Route = createFileRoute("/tests")({
  component: TestPage,
});

function TestPage() {
  const { dialogs, openDialog, closeDialog } = useMultipleDialogs({
    "create-test": { isOpen: false, data: defaultTest },
    "edit-test": { isOpen: false, data: null },
    "delete-test": { isOpen: false, data: null },
  });

  const columns: GridColDef<Test>[] = [
    { field: "name", headerName: "Tên xét nghiệm", minWidth: 250, flex: 1 },
    {
      field: "price",
      headerName: "Giá tiền (VND)",
      width: 200,
      valueGetter: (value, _) => `${value},000`,
      editable: true,
    },
    {
      field: "normalValue",
      headerName: "Giá trị bình thường",
      width: 150,
      valueGetter: (value, row) => (row.category === TestCategory.RANGE ? `${row.min} - ${row.max}` : value),
      editable: true,
    },
    { field: "unit", headerName: "Đơn vị", width: 100 },
    {
      field: "actions",
      type: "actions",
      headerName: "Hành động",
      width: 150,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => openDialog("edit-test", row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => openDialog("delete-test", row)}
            color="error"
          />,
        ];
      },
    },
  ];

  const queryClient = useQueryClient();
  const { data: tests } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => await getAllTestsApi(),
  });

  const { mutate: createTest } = useMutation({
    mutationFn: createTestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
      alert("Thêm xét nghiệm thành công");
      closeDialog("create-test");
    },
    onError: (error) => {
      console.error(error);
      alert("Có lỗi xảy ra khi thêm xét nghiệm");
    },
  });

  const { mutate: deleteTest } = useMutation({
    mutationFn: deleteTestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
      alert("Xoá xét nghiệm thành công");
      closeDialog("delete-test");
    },
    onError: (error) => {
      console.error(error);
      alert("Có lỗi xảy ra khi xoá xét nghiệm");
      closeDialog("delete-test");
    },
  });

  return (
    <Stack direction="column" spacing={3}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="h4">Danh mục xét nghiệm</Typography>
        <Button variant="outlined" color="primary" startIcon={<AddCircle />} onClick={() => openDialog("create-test")}>
          Thêm xét nghiệm
        </Button>
      </Stack>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={tests}
          columns={columns}
          editMode="row"
          getRowId={(row) => row._id}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </div>

      <Dialog
        open={dialogs["edit-test"].isOpen}
        onClose={() => closeDialog("edit-test")}
        fullWidth={true}
        maxWidth="md"
      >
        <Card sx={{ px: 2, py: 3 }}>
          <Typography variant="h6" gutterBottom mb={2}>
            Chỉnh sửa thông tin xét nghiệm
          </Typography>
          <TestForm defaultValues={dialogs["edit-test"].data} onSubmit={createTest} />
        </Card>
      </Dialog>

      <Dialog
        open={dialogs["create-test"].isOpen}
        onClose={() => closeDialog("create-test")}
        fullWidth={true}
        maxWidth="md"
      >
        <Card sx={{ px: 2, py: 3 }}>
          <Typography variant="h6" gutterBottom mb={2}>
            Thêm xét nghiệm
          </Typography>
          <TestForm defaultValues={dialogs["create-test"].data} onSubmit={createTest} />
        </Card>
      </Dialog>

      {/* <ConfirmationDialog /> */}
      <Dialog
        open={dialogs["delete-test"].isOpen}
        onClose={() => closeDialog("delete-test")}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle>
          Bạn có chắc muốn xoá <b>{dialogs["delete-test"].data?.name}</b>{" "}
        </DialogTitle>
        <DialogContent>
          <Typography>Tất cả dữ liệu sẽ bị xoá và không thể khôi phục lại.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog("delete-test")}>No</Button>
          <Button onClick={() => deleteTest(dialogs["delete-test"].data._id)} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
