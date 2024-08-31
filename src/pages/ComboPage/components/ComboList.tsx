import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import CustomToolbar from "../../../components/CustomToolbar";
import { Combo } from "../../../types/combo";
import useFetchCombos from "../hooks/useFetchCombos";

interface ComboListProps {
  onRowEditClick: (row: Combo) => void;
  onRowDeleteClick: (row: Combo) => void;
}

export default function ComboList({ onRowEditClick, onRowDeleteClick }: ComboListProps) {
  const { data: combos, isError, isLoading } = useFetchCombos();

  const columns: GridColDef<Combo>[] = [
    { field: "name", headerName: "Tên gói xét nghiệm", minWidth: 150, flex: 1 },
    { field: "price", headerName: "Giá tiền", width: 200 },
    {
      field: "count",
      headerName: "Số lượng xét nghiệm",
      width: 150,
      valueGetter: (_, row) => row.tests.length,
    },
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

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>Error loading combos</Typography>;
  }

  return (
    <div style={{ width: "100%", height: 600 }}>
      <DataGrid
        rows={combos}
        columns={columns}
        getRowId={(row) => row._id}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </div>
  );
}
