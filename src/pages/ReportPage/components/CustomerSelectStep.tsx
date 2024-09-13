import {
  Box,
  Button,
  Collapse,
  Divider,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { createUser } from "../../../api/customers";
import CustomerSearch from "../../../components/CustomerSearch";
import LoadingButton from "../../../components/LoadingButton";
import { Customer, CustomerSchema, defaultCustomerValues, UserBaseSchema, UserRole } from "../../../types/user";
import UserBaseForm from "./UserBaseForm";

enum CustomerType {
  NEW = "new",
  EXISTING = "existing",
}

type CustomerCreateFormProps = {
  onSuccess?: (data: Customer) => void;
  onError?: (error: Error) => void;
  disabled?: boolean;
};

function CustomerCreateForm({ onSuccess, onError, disabled }: CustomerCreateFormProps) {
  const methods = useForm<CustomerSchema>({
    defaultValues: defaultCustomerValues,
  });

  const { mutate: createCustomer, isPending } = useMutation({
    mutationFn: (data: UserBaseSchema) => createUser({ ...data, role: UserRole.CUSTOMER } as CustomerSchema),
    onSuccess,
    onError,
  });

  const onSubmit = (data: UserBaseSchema) => {
    createCustomer(data);
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <fieldset disabled={disabled ?? false} style={{ border: 0, padding: 0, opacity: disabled ? 0.38 : "unset" }}>
          <UserBaseForm />
          <LoadingButton sx={{ mt: 2 }} fullWidth type="submit" loading={isPending} variant="contained" color="primary">
            Tạo khách hàng
          </LoadingButton>
        </fieldset>
      </Box>
    </FormProvider>
  );
}

type CustomerInfoProps = {
  customer: Customer;
};

function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {customer.name}
      </Typography>
      <Divider />
      <Stack direction="row">
        <Typography sx={{ width: 120 }}>Ngày sinh</Typography>
        <Typography>{customer.dob}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography sx={{ width: 120 }}>Số điện thoại</Typography>
        <Typography>{customer.phone}</Typography>
      </Stack>
      <Stack direction="row">
        <Typography sx={{ width: 120 }}>Địa chỉ</Typography>
        <Typography>{customer.address}</Typography>
      </Stack>
    </Stack>
  );
}

export default function CustomerSelectStep() {
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();
  const isCustomerSelected = !!selectedCustomer;

  const { setValue } = useFormContext();

  const selectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setValue("customerId", customer?._id);
  };

  const deselectCustomer = () => {
    setSelectedCustomer(undefined);
    setValue("customerId", "");
  };

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6">Chọn khách hàng</Typography>

      <ToggleButtonGroup
        exclusive
        value={isNewCustomer ? CustomerType.NEW : CustomerType.EXISTING}
        onChange={(_, value) => setIsNewCustomer(value === CustomerType.NEW)}
        // disabled={isCustomerSelected}
      >
        <ToggleButton value={CustomerType.NEW}>Khách hàng mới</ToggleButton>
        <ToggleButton value={CustomerType.EXISTING}>Khách hàng đã xét nghiệm</ToggleButton>
      </ToggleButtonGroup>
      {isNewCustomer ? (
        <CustomerCreateForm disabled={isCustomerSelected} onSuccess={selectCustomer} />
      ) : (
        <CustomerSearch disabled={isCustomerSelected} onSelect={selectCustomer} />
      )}

      <Collapse in={isCustomerSelected}>
        {selectedCustomer && (
          <Paper sx={{ p: 2, border: 1 }}>
            <CustomerInfo customer={selectedCustomer} />
            <Button color="error" variant="outlined" sx={{ mt: 2 }} onClick={deselectCustomer}>
              Chọn khách hàng khác
            </Button>
          </Paper>
        )}
      </Collapse>
    </Stack>
  );
}
