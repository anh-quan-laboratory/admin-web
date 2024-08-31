import { Box, Button, Stack } from "@mui/material";
import { UserFormValues, UserRole } from "../../../types/user";
import { FormProvider, useForm } from "react-hook-form";
import { RHFRadioGroup } from "../../../components/RHFRadioGroup";
import { RHFTextField } from "../../../components/RHFTextField";

interface CustomerFormProps {
  defaultValues: UserFormValues;
  onSubmit: (data: any) => any;
  SubmitBtn: any;
}

export default function CustomerForm({ defaultValues, onSubmit, SubmitBtn }: CustomerFormProps) {
  const methods = useForm({ defaultValues });
  return (
    <Box
      component="form"
      onSubmit={methods.handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <FormProvider {...methods}>
        <RHFRadioGroup
          name="role"
          row
          defaultValue={defaultValues?.role}
          options={[
            { id: UserRole.CUSTOMER, label: "Khách hàng" },
            { id: UserRole.DOCTOR, label: "Bác sĩ" },
          ]}
          label={"Vai trò"}
        />
        <Stack direction="row" spacing={1}>
          <RHFTextField
            fullWidth
            name="name"
            label="Họ và tên"
            defaultValue={defaultValues?.name}
            rules={{ required: true }}
            errorMessage="Vui lòng nhập họ và tên khách hàng"
          />
          <RHFTextField
            fullWidth
            name="address"
            label="Địa chỉ"
            // defaultValue={defaultValues?.address}
            rules={{ required: true }}
            errorMessage="Vui lòng nhập địa chỉ"
          />
        </Stack>
        <Stack direction="row" spacing={1}>
          <RHFTextField
            fullWidth
            name="phone"
            label="Số điện thoại"
            // defaultValue={defaultValues?.phone}
            rules={{ required: true }}
            errorMessage="Vui lòng nhập số điện thoại"
          />
          <RHFTextField
            fullWidth
            name="dob"
            label="Ngày sinh"
            // defaultValue={defaultValues?.dob}
            rules={{ required: true }}
            errorMessage="Vui lòng nhập ngày sinh"
          />
        </Stack>
        {SubmitBtn || <Button type="submit">Submit</Button>}
      </FormProvider>
    </Box>
  );
}
