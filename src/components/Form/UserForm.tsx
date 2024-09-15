import { createUser, editUser } from "@/api/userApi";
import { defaultUserBaseValues, User, UserBaseSchema, UserRole } from "@/types/user";
import { Box, Card, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import LoadingButton from "../LoadingButton";
import { RHFTextField } from "./RHFTextField";

interface UserFormProps {
  role: UserRole;
  user?: User;
  onSuccess?: (user: User) => void;
  onSettled?: () => void;
}

enum FormAction {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

type UserFormConfig = {
  heading: string;
  successMessage: string;
  alertMessage: string;
  btnText: string;
};

const getUserFormConfig = (role: UserRole, action: FormAction) => {
  const configs: Record<string, UserFormConfig> = {
    [UserRole.CUSTOMER + FormAction.CREATE]: {
      heading: "Thêm khách hàng",
      successMessage: "Thêm khách hàng thành công",
      alertMessage: "Có lỗi xảy ra khi thêm khách hàng",
      btnText: "Tạo mới",
    },
    [UserRole.CUSTOMER + FormAction.EDIT]: {
      heading: "Chỉnh sửa thông tin khách hàng",
      successMessage: "Chỉnh sửa thông tin khách hàng thành công",
      alertMessage: "Có lỗi xảy ra khi chỉnh sửa thông tin khách hàng",
      btnText: "Cập nhật",
    },
    [UserRole.DOCTOR + FormAction.CREATE]: {
      heading: "Thêm bác sĩ",
      successMessage: "Thêm bác sĩ thành công",
      alertMessage: "Có lỗi xảy ra khi thêm bác sĩ",
      btnText: "Tạo mới",
    },
    [UserRole.DOCTOR + FormAction.EDIT]: {
      heading: "Chỉnh sửa thông tin bác sĩ",
      successMessage: "Chỉnh sửa thông tin bác sĩ thành công",
      alertMessage: "Có lỗi xảy ra khi chỉnh sửa thông tin bác sĩ",
      btnText: "Cập nhật",
    },
  };

  return configs[role + action];
};

export default function UserForm({ role, user, onSettled, onSuccess }: UserFormProps) {
  const methods = useForm({ defaultValues: user ? user : defaultUserBaseValues });
  const formAction = user ? FormAction.EDIT : FormAction.CREATE;
  const { heading, successMessage, alertMessage, btnText } = getUserFormConfig(role, formAction);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserBaseSchema) => {
      if (user) {
        return editUser(user._id, { ...data, role });
      }
      return createUser({ ...data, role });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      alert(successMessage);
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      console.error(error);
      alert(alertMessage);
    },
    onSettled: () => {
      onSettled && onSettled();
    },
  });

  const onSubmit = (data: UserBaseSchema) => mutate(data);

  return (
    <Card sx={{ px: 2, py: 3 }}>
      <Typography variant="h6" gutterBottom mb={2}>
        {heading}
      </Typography>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormProvider {...methods}>
          <Stack direction="row" spacing={1}>
            <RHFTextField fullWidth name="name" label="Họ và tên" />
            <RHFTextField fullWidth name="address" label="Địa chỉ" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <RHFTextField fullWidth name="phone" label="Số điện thoại" />
            <RHFTextField fullWidth name="dob" label="Ngày sinh" />
          </Stack>
          <LoadingButton loading={isPending} type="submit" variant="contained">
            {btnText}
          </LoadingButton>
        </FormProvider>
      </Box>
    </Card>
  );
}
