import { Stack } from "@mui/material";
import { RHFTextField } from "../../../components/RHFTextField";

export default function UserBaseForm() {
  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={1}>
        <RHFTextField fullWidth name="name" label="Họ và tên" />
        <RHFTextField fullWidth name="address" label="Địa chỉ" />
      </Stack>
      <Stack direction="row" spacing={1}>
        <RHFTextField fullWidth name="phone" label="Số điện thoại" />
        <RHFTextField fullWidth name="dob" label="Ngày sinh" />
      </Stack>
    </Stack>
  );
}
