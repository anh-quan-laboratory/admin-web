import { Autocomplete, TextField } from "@mui/material";
import useGetAllCustomers from "../hooks/useGetAllCustomers";
import { Customer } from "../types/user";

type CustomerSearchProps = {
  onSelect?: (customer: Customer) => void;
  disabled?: boolean;
};

export default function CustomerSearch({ onSelect, disabled }: CustomerSearchProps) {
  const { isPending, data: customers } = useGetAllCustomers();

  return (
    <Autocomplete
      disablePortal
      options={customers ?? []}
      getOptionLabel={(option) => `${option.name} - ${option.phone}`}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      renderInput={(params) => <TextField {...params} label="Tìm khách hàng theo tên/sđt" />}
      loading={isPending}
      onChange={(_, customer) => customer && onSelect && onSelect(customer)}
      disabled={disabled ?? false}
    />
  );
}
