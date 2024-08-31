import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

export default function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <GridToolbarFilterButton />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
          button: { variant: "outlined" },
        }}
      />
    </GridToolbarContainer>
  );
}
