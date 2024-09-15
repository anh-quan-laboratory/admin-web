import { styled, TableCell, tableCellClasses } from "@mui/material";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
  },
}));

export default StyledTableCell;
