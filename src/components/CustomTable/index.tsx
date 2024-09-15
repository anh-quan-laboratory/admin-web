import { DeleteOutline, EditOutlined, ErrorOutline } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import StyledTableCell from "./StyledTableCell";
import { useState } from "react";

type GenericObject = Record<string, any>;

export type ColDef<T extends GenericObject> = {
  field: Extract<keyof T, string>;
  headerName: string;
  width?: number;
  minWidth?: number;
  flex?: number;
  getCellValue?: (row: T) => React.ReactNode;
};

type CustomTableProps<T extends GenericObject> = {
  columns: ColDef<T>[];
  rows: T[];
  loading?: boolean;
  isError?: boolean;
  onCellEditClick?: (row: T, col: ColDef<T>) => void;
  onCellDeleteClick?: (row: T, col: ColDef<T>) => void;
};

export default function CustomTable<T extends GenericObject>({
  columns,
  rows,
  loading,
  isError,
  onCellEditClick,
  onCellDeleteClick,
}: CustomTableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getCellStyles = (col?: ColDef<T>) => {
    const defaultStyles = {
      minWidth: 150,
      width: 150,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    };
    return {
      ...defaultStyles,
      ...(col?.minWidth && { minWidth: col.minWidth }),
      ...(col?.flex && { flex: col.flex }),
      ...(col?.width && { width: col.width }),
    };
  };

  const getCellValue = (row: T, col: ColDef<T>) => {
    return col.getCellValue ? col.getCellValue(row) : row[col.field];
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ display: "flex" }}>
            {columns.map((col) => (
              <StyledTableCell sx={getCellStyles(col)} key={col.field}>
                {col.headerName}
              </StyledTableCell>
            ))}

            <StyledTableCell sx={getCellStyles()}>Hành động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <Stack sx={{ height: 300, justifyContent: "center", alignItems: "center" }} spacing={2}>
              <CircularProgress size={50} />
              <Typography>Đang tải dữ liệu...</Typography>
            </Stack>
          )}
          {isError && (
            <Stack sx={{ height: 300, justifyContent: "center", alignItems: "center" }} spacing={2}>
              <ErrorOutline color="error" sx={{ fontSize: 50 }} />
              <Typography color="error">Đã có lỗi xảy ra khi tải dữ liệu</Typography>
            </Stack>
          )}
          {!loading &&
            (rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage) ?? []).map((row) => (
              <TableRow key={row._id} sx={{ display: "flex", justifyContent: "space-between" }}>
                {columns.map((col) => (
                  <TableCell sx={getCellStyles(col)} scope="row" component="th" key={col.field}>
                    {getCellValue(row, col)}
                  </TableCell>
                ))}

                <TableCell sx={getCellStyles()}>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={() => onCellEditClick?.(row, columns[0])}>
                      <EditOutlined />
                    </IconButton>
                    <IconButton size="small" onClick={() => onCellDeleteClick?.(row, columns[0])}>
                      <DeleteOutline color="error" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TablePagination
          component="div"
          count={rows?.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => {
            setPage(newPage);
          }}
          onRowsPerPageChange={(e) => setRowsPerPage(+e.target.value)}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Table>
    </TableContainer>
  );
}
