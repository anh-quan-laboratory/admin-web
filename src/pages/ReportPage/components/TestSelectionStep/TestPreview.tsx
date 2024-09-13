import { List, ListItemButton, ListItemText, Stack } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

export default function TestPreview() {
  const { getValues } = useFormContext();
  const selectedTestIds: string[] = useWatch({ name: "tests", defaultValue: [] });

  return (
    <Stack sx={{ width: "50%" }}>
      <List>
        {selectedTestIds.map((testId) => (
          <ListItemButton key={testId} onClick={() => {}}>
            <ListItemText primary={testId} />
          </ListItemButton>
        ))}
      </List>
    </Stack>
  );
}
