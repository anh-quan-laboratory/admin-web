import DialogContextProvider from "./DialogContext";
import { DialogContext } from "@/components/CustomDialog/DialogContext";
import { Dialog, DialogProps } from "@mui/material";
import { useContext } from "react";
import useMultipleDialogs from "./useMultipleDialogs";

type CustomDialogProps = Omit<DialogProps, "open"> & {
  name: string;
  children: React.ReactNode;
};

export default function CustomDialog({ name, children, ...props }: CustomDialogProps) {
  const { closeDialog, isDialogOpen } = useContext(DialogContext);

  return (
    <Dialog fullWidth={true} open={isDialogOpen(name)} onClose={() => closeDialog(name)} {...props}>
      {children}
    </Dialog>
  );
}

export { DialogContext, useMultipleDialogs, DialogContextProvider };
