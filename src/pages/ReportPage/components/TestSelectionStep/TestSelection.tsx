import {
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
} from "@mui/material";
import useGetAllCombos from "../../../../hooks/useGetAllCombos";
import useGetAllTests from "../../../../hooks/useGetAllTests";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Combo } from "../../../../types/combo";
import { useSelection } from "../../../ComboPage/hooks/useSelection";
import { Test } from "../../../../types/test";

export default function TestSelection() {
  const { data: tests } = useGetAllTests();
  const { data: combos } = useGetAllCombos();

  const [keyword, setKeyword] = useState("");

  const { getValues, setValue } = useFormContext();

  const {
    selectedItems: selectedTests,
    toggleItem: toggleTest,
    addItems: addTests,
  } = useSelection<Test>({
    initialSelectedItems: [],
    getItemId: (test) => test._id,
    onSelectionChange: (tests) =>
      setValue(
        "tests",
        tests.map((test) => test._id)
      ),
  });

  const { selectedItems: selectedCombos, toggleItem: toggleCombo } = useSelection<Combo>({
    initialSelectedItems: [],
    getItemId: (combo) => combo._id,
    onSelectionChange: (combos) => {
      const tests = combos.flatMap((combo) => combo.tests);
      addTests(tests);
    },
  });

  return (
    <Stack sx={{ width: "50%" }}>
      <TextField
        size="small"
        fullWidth
        name="keyword"
        placeholder="Tìm xét nghiệm, gói xét nghiệm theo tên"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <List disablePadding={true} dense component="div" role="list" sx={{ height: 300, overflow: "auto" }}>
        <ListSubheader>Gói xét nghiệm</ListSubheader>
        {combos?.map((combo) => (
          <ListItemButton key={combo._id} onClick={() => toggleCombo(combo)}>
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

        <ListSubheader>Danh mục xét nghiệm</ListSubheader>
        {tests?.map((test) => (
          <ListItemButton key={test._id} onClick={() => toggleTest(test)}>
            <ListItemIcon>
              <Checkbox
                checked={selectedTests.map((t) => t._id).indexOf(test._id) !== -1}
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
      </List>
    </Stack>
  );
}
