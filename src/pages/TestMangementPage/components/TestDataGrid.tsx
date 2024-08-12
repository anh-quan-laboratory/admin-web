import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getAllTests as getAllTestsApi } from "../../../api/tests";
import { Test, TestCategory } from "../../../types/test";

interface TestDataGridProps {
  onRowEditClick: (row: Test) => void;
  onRowDeleteClick: (row: Test) => void;
}

export default function TestDataGrid({ onRowEditClick, onRowDeleteClick }: TestDataGridProps) {
  const { data: tests } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => await getAllTestsApi(),
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
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => onRowEditClick(row)} color="inherit" />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onRowDeleteClick(row)}
            color="error"
          />,
        ];
      },
    },
  ];

  return (
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
  );
}
