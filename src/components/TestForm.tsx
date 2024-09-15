import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { CreateTestInput, CreateTestSchema, TestCategory } from "../types/test";
import { RHFRadioGroup } from "./Form/RHFRadioGroup";
import { RHFTextField } from "./Form/RHFTextField";

interface TestFormProps {
  defaultValues?: CreateTestInput;
  onSubmit: (data: any) => any;
  SubmitBtn: any;
}

export default function TestForm({ defaultValues, onSubmit, SubmitBtn }: TestFormProps) {
  const methods = useForm({ defaultValues, resolver: zodResolver(CreateTestSchema) });
  const testCategory = useWatch({ control: methods.control, name: "category" });

  return (
    <Stack component="form" onSubmit={methods.handleSubmit(onSubmit)} direction="column" spacing={2}>
      <FormProvider {...methods}>
        <RHFRadioGroup
          name="category"
          row
          defaultValue={defaultValues?.category}
          options={[
            { id: TestCategory.RANGE, label: "Theo khoảng giá trị" },
            { id: TestCategory.BOOLEAN, label: "Âm tính/Dương tính" },
          ]}
          label={"Vai trò"}
        />
        <Stack direction="row" spacing={2}>
          <RHFTextField fullWidth name="name" label="Tên xét nghiệm" />
          <RHFTextField fullWidth name="price" label="Giá tiền (VND)" />
        </Stack>

        <Stack direction="row" spacing={2}>
          {testCategory === TestCategory.RANGE ? (
            <>
              <RHFTextField fullWidth name="min" label="Giá trị tối thiểu" />
              <RHFTextField fullWidth name="max" label="Giá trị tối đa" />
              <RHFTextField fullWidth name="unit" label="Đơn vị" />
            </>
          ) : (
            <>
              <RHFTextField fullWidth name="posibleValues" label="Các giá trị có thể" />
              <RHFTextField fullWidth name="normalValue" label="Giá trị bình thường" />
            </>
          )}
        </Stack>
        {SubmitBtn || <Button type="submit">Submit</Button>}
      </FormProvider>
    </Stack>
  );
}
