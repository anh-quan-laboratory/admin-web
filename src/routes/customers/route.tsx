import {
  Button,
  Card,
  Chip,
  CircularProgress,
  debounce,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

import { AddCircle, EditOutlined, SearchOutlined } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { getAllCustomers } from "../../api/customers";
import CustomerDialog from "../../components/CustomerDialog";
import StyledTableCell from "../../components/StyledTableCell";
import { MuiColorOption } from "../../types/common";
import { User, UserDialogType, UserRole, UserRoleOption } from "../../types/user";

type CustomerSearch = {
  keyword: string;
  role?: UserRoleOption;
};

export const Route = createFileRoute("/customers")({
  component: CustomerList,
  validateSearch: (search: any): CustomerSearch => {
    return {
      keyword: search.q || "",
      role: Object.values(UserRoleOption).includes(search?.role) ? search?.role : UserRoleOption.ALL,
    };
  },
});

const defaultSelectedUser: User = { _id: "", name: "", address: "", phone: "", dob: "", role: UserRole.CUSTOMER };

const UserRoleOptionConfigs = {
  [UserRoleOption.ALL]: {
    id: UserRoleOption.ALL,
    label: "Tất cả",
    shortLabel: "Tất cả",
    color: "default",
  },
  [UserRoleOption.CUSTOMER]: {
    id: UserRole.CUSTOMER,
    label: "Khách hàng",
    shortLabel: "KH",
    color: "success",
  },
  [UserRoleOption.DOCTOR]: {
    id: UserRole.DOCTOR,
    label: "Bác sĩ",
    shortLabel: "BS",
    color: "primary",
  },
};

function CustomerList() {
  // Handle search by keywrod
  const { keyword, role } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const handleKeywordChange = useCallback(
    debounce((e) => navigate({ search: (prev) => ({ ...prev, q: e.target.value }) }), 300),
    []
  );

  const handleFilterChange = (e: any) => navigate({ search: (prev) => ({ ...prev, role: e.target.value }) });

  // Handle toggle dialog
  const [openedDialogId, setOpenedDialogId] = useState<UserDialogType | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<User>(defaultSelectedUser);

  const handleOpenEditDialog = (row: User) => {
    setSelectedCustomer(row);
    setOpenedDialogId(UserDialogType.EDIT);
  };

  const handleOpenCreateDialog = () => {
    setSelectedCustomer(defaultSelectedUser);
    setOpenedDialogId(UserDialogType.CREATE);
  };

  const handleCloseDialog = () => {
    setSelectedCustomer(defaultSelectedUser);
    setOpenedDialogId(null);
  };

  // Handle load data
  const { data, isLoading } = useQuery({
    queryKey: ["customers", { keyword, role }],
    queryFn: () => getAllCustomers(keyword, role),
  });

  // Handle pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handlePageChange = (_: any, newPage: number) => setPage(newPage);
  const handleRowsPerPageChange = (e: any) => setRowsPerPage(parseInt(e.target.value, 10));

  const paginatedData = useMemo(
    () => data?.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [page, data, rowsPerPage]
  );

  if (isLoading) return <CircularProgress />;

  return (
    <Stack direction="column" spacing={3}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="h4">Danh mục khách hàng</Typography>
        <Button variant="outlined" color="primary" startIcon={<AddCircle />} onClick={handleOpenCreateDialog}>
          Thêm khách hàng
        </Button>
      </Stack>

      <Stack direction="row" spacing={3}>
        <OutlinedInput
          defaultValue={keyword}
          fullWidth
          placeholder="Tìm khách hàng theo tên, số điện thoại"
          onChange={handleKeywordChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined fontSize="medium" />
            </InputAdornment>
          }
          sx={{ maxWidth: "500px" }}
        />
        <ToggleButtonGroup value={role}>
          {Object.values(UserRoleOptionConfigs).map((option) => (
            <ToggleButton key={option.id} value={option.id} onChange={handleFilterChange}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      <Card>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Họ và tên</StyledTableCell>
              <StyledTableCell>Ngày sinh</StyledTableCell>
              <StyledTableCell>Số điện thoại</StyledTableCell>
              <StyledTableCell>Địa chỉ</StyledTableCell>
              <StyledTableCell sx={{ textAlign: "center" }}>Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.map((row) => {
              return (
                <TableRow hover key={row._id}>
                  <TableCell>
                    <Chip
                      label={UserRoleOptionConfigs[row.role].shortLabel}
                      size="small"
                      color={UserRoleOptionConfigs[row.role].color as MuiColorOption}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.dob}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton color="primary" size="small" onClick={() => handleOpenEditDialog(row)}>
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      {/*// TODO: Implement delete user function */}
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data?.length || 0}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[3, 5, 10]}
        />
      </Card>

      {!!openedDialogId && (
        <CustomerDialog
          open={!!openedDialogId}
          onClose={handleCloseDialog}
          defaultValues={selectedCustomer}
          type={openedDialogId}
        />
      )}
    </Stack>
  );
}
