import {
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import useGetAllCombos from "../../../../hooks/useGetAllCombos";
import { useSelection } from "../../../ComboPage/hooks/useSelection";
import { Combo } from "../../../../types/combo";

export default function ComboSelectionStep() {
  const { data: combos } = useGetAllCombos();
  const { selectedItems: selectedCombos, toggleItem: toggleCombo } = useSelection<Combo>({
    initialSelectedItems: [],
    getItemId: (combo) => combo._id,
  });

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6">Chọn gói xét nghiệm</Typography>
      <List disablePadding={true} dense component="div" role="list" sx={{ height: 300, overflow: "auto" }}>
        {/* <ListSubheader>Gói xét nghiệm</ListSubheader> */}
        {combos?.map((combo) => (
          <ListItemButton key={combo._id} onClick={() => toggleCombo(combo)} disableGutters={true}>
            <ListItemIcon>
              <Checkbox
                checked={selectedCombos.map((c) => c._id).indexOf(combo._id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": combo._id,
                }}
              />
            </ListItemIcon>
            <ListItemText id={combo._id} primary={combo.name} />
          </ListItemButton>
        ))}
      </List>
    </Stack>
  );
}
