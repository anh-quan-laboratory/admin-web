import useFetchUsers from "@/hooks/useFetchUsers";
import { Autocomplete, TextField } from "@mui/material";
import { Customer, UserRole } from "../types/user";

type CustomerSearchProps = {
  onSelect?: (customer: Customer) => void;
  disabled?: boolean;
};

export default function CustomerSearch({ onSelect, disabled }: CustomerSearchProps) {
  const { isPending, data: customers } = useFetchUsers({ role: UserRole.CUSTOMER });

  return (
    <Autocomplete
      disablePortal
      options={customers ?? []}
      getOptionLabel={(option) => `${option.name} - ${option.phone}`}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      renderInput={(params) => <TextField {...params} label="Tìm khách hàng theo tên/số điện thoại" />}
      loading={isPending}
      onChange={(_, customer) => customer && onSelect && onSelect(customer as Customer)}
      disabled={disabled ?? false}
    />
  );
}
