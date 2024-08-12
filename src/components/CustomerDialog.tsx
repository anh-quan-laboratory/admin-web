import { Box, Button, Card, Dialog, Stack, Typography } from "@mui/material";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { createCustomer, editCustomer } from "../api/customers";
import { User, UserDialogType, UserFormValues, UserRole } from "../types/user";
import { RHFRadioGroup } from "./RHFRadioGroup";
import { RHFTextField } from "./RHFTextField";

interface CustomerDialogProps {
  open: boolean;
  onClose: () => void;
  defaultValues: UserFormValues;
  type: UserDialogType;
}

type FormConfig = {
  title: string;
  submitBtnText: string;
  action: (data: UserFormValues | User) => Promise<any>;
  onSuccess?: (queryClient: QueryClient) => void;
  successMessage: string;
};

function getFormConfigs(type: UserDialogType, role: UserRole) {
  const userRoleLabels = { [UserRole.CUSTOMER]: "khách hàng", [UserRole.DOCTOR]: "bác sĩ" };
  const configs: Record<UserDialogType, FormConfig> = {
    [UserDialogType.CREATE]: {
      title: `Thêm ${userRoleLabels[role]} mới`,
      submitBtnText: `Thêm ${userRoleLabels[role]}`,
      action: createCustomer,
      successMessage: `Thêm thông tin ${userRoleLabels[role]} thành công`,
    },
    [UserDialogType.EDIT]: {
      title: `Chỉnh sửa thông tin ${userRoleLabels[role]}`,
      submitBtnText: "Xác nhận",
      action: (data) => ("_id" in data ? editCustomer(data._id, data) : Promise.resolve()),
      successMessage: `Chỉnh sửa thông tin ${userRoleLabels[role]} thành công`,
    },
  };

  return configs[type];
}

function CustomerDialog({ open, onClose, defaultValues, type }: CustomerDialogProps) {
  const queryClient = useQueryClient();

  console.log(defaultValues);

  const methods = useForm<UserFormValues | User>({
    defaultValues,
  });

  const role = useWatch({ control: methods.control, name: "role" });

  const formConfig = useMemo(() => getFormConfigs(type, role), [type, role]);

  const { isPending, mutate } = useMutation({
    mutationFn: formConfig.action,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      alert(formConfig.successMessage);
      onClose();
    },
  });

  return (
    <Dialog onClose={onClose} open={open} fullWidth={true} maxWidth="md">
      <Card sx={{ px: 2, py: 3 }}>
        <Typography variant="h6" gutterBottom mb={2}>
          {formConfig.title}
        </Typography>
        <Box
          component="form"
          onSubmit={methods.handleSubmit((data) => mutate(data))}
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
            <Button disabled={isPending} type="submit" variant="contained" color="primary">
              {isPending ? "Đang xử lý" : formConfig.submitBtnText}
            </Button>
          </FormProvider>
        </Box>
      </Card>
    </Dialog>
  );
}

export default CustomerDialog;
