import { useQuery } from "@tanstack/react-query";
import { getAllCombos } from "../../../api/combos";
import { CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Combo } from "../../../types/combo";
import CustomToolbar from "../../../components/CustomToolbar";
import EditIcon from "@mui/icons-material/Edit";

interface ComboListProps {
  onRowEditClick: (row: Combo) => void;
}

export default function ComboList({ onRowEditClick }: ComboListProps) {
  const {
    data: combos,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["combos"],
    queryFn: getAllCombos,
  });

  console.log(combos);

  const columns: GridColDef<Combo>[] = [
    { field: "name", headerName: "Tên gói xét nghiệm", minWidth: 150, flex: 2 },
    { field: "count", headerName: "Số lượng xét nghiệm", width: 150, flex: 1 },
    { field: "price", headerName: "Giá tiền", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Hành động",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => onRowEditClick(row)} color="inherit" />,
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
