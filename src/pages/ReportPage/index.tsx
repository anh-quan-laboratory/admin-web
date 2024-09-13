import { Stack, Typography } from "@mui/material";
import CustomerSelectStep from "./components/CustomerSelectStep";
import TestSelectionStep from "./components/TestSelectionStep";
import { FormProvider, useForm } from "react-hook-form";
import { defaultTestRecordValue, TestRecordInput, TestRecordSchema } from "../../types/records";
import { yupResolver } from "@hookform/resolvers/yup";
import ComboSelectionStep from "./components/ComboSelectionStep";

export default function ReportPage() {
  const methods = useForm<TestRecordInput>({
    defaultValues: defaultTestRecordValue,
    resolver: yupResolver(TestRecordSchema),
  });

  return (
    <Stack direction="column" spacing={3}>
      <Typography variant="h4">Tạo phiếu xét nghiệm</Typography>

      <FormProvider {...methods}>
        <CustomerSelectStep />
        <ComboSelectionStep />
        <TestSelectionStep />
      </FormProvider>
    </Stack>
  );
}
