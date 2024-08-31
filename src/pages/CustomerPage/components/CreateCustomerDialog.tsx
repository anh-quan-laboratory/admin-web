import { Button, Card, Dialog, Typography } from "@mui/material";
import useCreateUser from "../hooks/useCreateUser";
import CustomerForm from "./CustomerForm";

interface CreateCustomerDialog {
  isOpen: boolean;
  handleClose: () => void;
  defaultData: any;
}

export default function CreateCustomerDialog({ isOpen, handleClose, defaultData }: CreateCustomerDialog) {
  const { mutate: createUser, isPending } = useCreateUser({ handleSucess: handleClose });

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="md">
      <Card sx={{ px: 2, py: 3 }}>
        <Typography variant="h6" gutterBottom mb={2}>
          Thêm khách hàng/bác sĩ
        </Typography>
        <CustomerForm
          defaultValues={defaultData}
          onSubmit={createUser}
          SubmitBtn={
            <Button disabled={isPending} type="submit" variant="contained" color="primary">
              {isPending ? "Đang xử lý" : "Thêm khách hàng/bác sĩ"}
            </Button>
          }
        />
      </Card>
    </Dialog>
  );
}
