import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { getAllTests } from "../../../api/tests";
import { RHFTextField } from "../../../components/RHFTextField";
import { Combo } from "../../../types/combo";
import { Test } from "../../../types/test";

type ComboFormProps = {
  combo?: Combo;
};

export default function ComboForm({ combo }: ComboFormProps) {
  const methods = useForm({ defaultValues: combo ? { name: combo.name, price: combo.price, tests: combo.tests } : {} });
  const { data: tests } = useQuery({
    queryKey: ["tests"],
    queryFn: getAllTests,
  });
  const [chosenTests, setChosenTests] = useState<Test[]>(combo?.tests || []);

  const handleToggleTest = (test: Test) => () => {
    const chosenTestIds = chosenTests.map((test) => test._id);
    const isChosen = chosenTestIds.indexOf(test._id) !== -1;

    if (!isChosen) {
      setChosenTests([...chosenTests, test]);
    } else {
      setChosenTests(chosenTests.filter((t) => t._id !== test._id));
    }
  };

  return (
    <Box component="form">
      <FormProvider {...methods}>
        <Stack direction="row" spacing={1}>
          <RHFTextField
            fullWidth
            name="name"
            label="Tên gói xét nghiệm"
            defaultValue={combo?.name}
            rules={{ required: true }}
          />

          <RHFTextField
            fullWidth
            name="price"
            label="Giá tiền"
            defaultValue={combo?.price}
            rules={{ required: true }}
          />
        </Stack>

        <Stack direction="row" spacing={1} mt={2}>
          <Card sx={{ flex: 1 }}>
            <CardHeader
              sx={{ px: 2, py: 1 }}
              title={`Tất cả xét nghiệm (Tổng: ${tests?.length})`}
              titleTypographyProps={{ variant: "subtitle2", fontWeight: "bold" }}
            />
            <Divider />
            <TextField size="small" fullWidth name="keyword" placeholder="Tìm xét nghiệm theo tên" />
            <List dense component="div" role="list" sx={{ height: 300, overflow: "auto" }}>
              {tests?.map((test) => (
                <ListItemButton key={test._id} onClick={handleToggleTest(test)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={chosenTests.map((t) => t._id).indexOf(test._id) !== -1}
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
              title={`Xét nghiệm đã chọn (Tổng: ${chosenTests.length})`}
              titleTypographyProps={{ variant: "subtitle2", fontWeight: "bold" }}
            />
            <Divider />
            <List dense component="div" role="list" sx={{ height: 300, overflow: "auto", flex: 1 }}>
              {chosenTests.map((test) => (
                <ListItemButton key={test._id}>
                  <ListItemText primary={test.name} />
                  <ListItemIcon>
                    <CloseOutlined color="error" />
                  </ListItemIcon>
                </ListItemButton>
              ))}
            </List>
          </Card>
        </Stack>

        <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
          {combo ? "Cập nhật" : "Tạo mới"}
        </Button>
      </FormProvider>
    </Box>
  );
}
