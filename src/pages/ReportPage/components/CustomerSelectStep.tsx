import CustomDialog, { DialogContext } from "@/components/CustomDialog";
import UserForm from "@/components/Form/UserForm";
import { AddCircle } from "@mui/icons-material";
import { Box, Button, Collapse, Divider, Paper, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useFormContext } from "react-hook-form";
import CustomerSearch from "../../../components/CustomerSearch";
import { Customer, User, UserRole } from "../../../types/user";

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
  const { openDialog, closeDialog } = useContext(DialogContext);
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

      <Stack direction="row" spacing={2}>
        <Box sx={{ flex: 1 }}>
          <CustomerSearch disabled={isCustomerSelected} onSelect={selectCustomer} />
        </Box>
        <Button
          variant="outlined"
          startIcon={<AddCircle />}
          onClick={() => openDialog("create-customer")}
          disabled={!!selectedCustomer}
        >
          Thêm khách hàng
        </Button>
      </Stack>

      <CustomDialog name="create-customer" maxWidth="md">
        <UserForm
          role={UserRole.CUSTOMER}
          onSettled={() => closeDialog("create-customer")}
          onSuccess={selectCustomer as (data: User) => void}
        />
      </CustomDialog>

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
