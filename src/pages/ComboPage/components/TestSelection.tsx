import { CloseOutlined } from "@mui/icons-material";
import {
  Stack,
  Card,
  CardHeader,
  Divider,
  TextField,
  List,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItem,
  IconButton,
} from "@mui/material";
import { Test } from "../../../types/test";
import useFetchTests from "../hooks/useFetchTests";
import { useSelection } from "../hooks/useSelection";
import { useFormContext } from "react-hook-form";

type TestSelectionProps = {
  initialSelectedTest?: Test[];
};

export const getTestId = (test: Test) => test._id;
export const getTestIds = (tests: Test[]) => tests.map(getTestId);

export default function TestSelection({ initialSelectedTest = [] }: TestSelectionProps) {
  const { tests, filteredTests, keyword, setKeyword } = useFetchTests();
  const { setValue } = useFormContext();

  const {
    selectedItems: selectedTests,
    removeItem: removeTest,
    toggleItem: toggleTest,
  } = useSelection<Test>({
    initialSelectedItems: initialSelectedTest,
    getItemId: getTestId,
    onSelectionChange: (tests) => setValue("tests", getTestIds(tests)),
  });

  return (
    <Stack direction="row" spacing={1} mt={2}>
      <Card sx={{ flex: 1 }}>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          title={`Tất cả xét nghiệm (Tổng: ${tests?.length})`}
          titleTypographyProps={{ variant: "subtitle2", fontWeight: "bold" }}
        />
        <Divider />
        <TextField
          size="small"
          fullWidth
          name="keyword"
          placeholder="Tìm xét nghiệm theo tên"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <List dense component="div" role="list" sx={{ height: 300, overflow: "auto" }}>
          {filteredTests?.map((test) => (
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
      </Card>
      <Card sx={{ flex: 1 }}>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          title={`Xét nghiệm đã chọn (Tổng: ${selectedTests.length})`}
          titleTypographyProps={{ variant: "subtitle2", fontWeight: "bold" }}
        />
        <Divider />
        <List dense component="div" role="list" sx={{ height: 300, overflow: "auto", flex: 1 }}>
          {selectedTests.map((test) => (
            <ListItem key={test._id}>
              <ListItemText primary={test.name} />
              <IconButton color="error" onClick={() => removeTest(test._id)}>
                <CloseOutlined />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Card>
    </Stack>
  );
}
