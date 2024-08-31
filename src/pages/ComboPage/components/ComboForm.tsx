import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, InputAdornment, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { RHFTextField } from "../../../components/RHFTextField";
import { Combo, ComboSchema, comboSchema, defaultCombo } from "../../../types/combo";
import useMutateCombo from "../hooks/useMutateCombo";
import TestSelection, { getTestIds } from "./TestSelection";

type ComboFormProps = {
  combo?: Combo;
  onSubmit?: () => void;
};

export default function ComboForm({ combo, onSubmit }: ComboFormProps) {
  const { mutate, isPending } = useMutateCombo({ comboId: combo?._id, onSuccess: () => onSubmit?.() });

  const methods = useForm<ComboSchema>({
    resolver: zodResolver(comboSchema),
    defaultValues: combo ? { name: combo.name, price: combo.price, tests: getTestIds(combo.tests) } : defaultCombo,
  });

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit((data) => mutate(data))}>
        <Stack direction="row" spacing={1}>
          <RHFTextField<ComboSchema> name="name" fullWidth label="Tên gói xét nghiệm" />
          <RHFTextField<ComboSchema>
            name="price"
            fullWidth
            label="Giá tiền"
            InputProps={{
              endAdornment: <InputAdornment position="end">VND</InputAdornment>,
            }}
          />
        </Stack>

        <TestSelection initialSelectedTest={combo?.tests} />

        <Button disabled={isPending} type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
          {isPending ? "Đang xử lý..." : combo ? "Cập nhật" : "Tạo mới"}
        </Button>
      </Box>
    </FormProvider>
  );
}
