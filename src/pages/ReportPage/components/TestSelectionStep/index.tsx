import { Stack, Typography } from "@mui/material";
import TestSelection from "./TestSelection";
import TestPreview from "./TestPreview";

export default function TestSelectionStep() {
  // const { data: tests, isLoading } = useGetAllTests();

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6">Chỉnh sửa xét nghiệm</Typography>

      <Stack direction="row" alignItems="center">
        <TestSelection />
        <TestPreview />
      </Stack>
      {/* <List dense component="div" role="list" sx={{ height: 300, overflow: "auto" }}>
        {tests?.map((test) => (
          <ListItemButton key={test._id} onClick={() => {}}>
            <ListItemIcon>
              <Checkbox
                // checked={selectedTests.map((t) => t._id).indexOf(test._id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": test._id,
                }}
              />
            </ListItemIcon>
            <ListItemText id={test._id} primary={test.name} />
          </ListItemButton>
        ))}
      </List> */}
    </Stack>
  );
}
