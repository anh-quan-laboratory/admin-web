import EditIcon from "@mui/icons-material/Edit";
import { Chip } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../../../api/customers";
import CustomToolbar from "../../../components/CustomToolbar";
import { User, UserRole } from "../../../types/user";

interface CustomerListProps {
  onRowEditClick: (row: User) => void;
}

export default function CustomerList({ onRowEditClick }: CustomerListProps) {
  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => await getAllCustomers(),
  });

  const columns: GridColDef<User>[] = [
    { field: "name", headerName: "Tên khách hàng", minWidth: 150, flex: 1 },
    { field: "dob", headerName: "Ngày sinh", width: 150 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    { field: "address", headerName: "Địa chỉ", minWidth: 250, flex: 1 },
    {
      field: "role",
      headerName: "Vai trò",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value === UserRole.CUSTOMER ? "Khách hàng" : "Bác sĩ"}
          color={params.value === UserRole.CUSTOMER ? "default" : "primary"}
        />
      ),
    },
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

  return (
    <div style={{ width: "100%", height: 600 }}>
      <DataGrid
        rows={customers}
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
