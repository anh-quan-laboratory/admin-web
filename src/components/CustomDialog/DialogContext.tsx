import useMultipleDialogs from "@/components/CustomDialog/useMultipleDialogs";
import { createContext } from "react";

export type DialogState = {
  [key: string]: {
    isOpen: boolean;
    data?: any;
  };
};

export type DialogContextType = {
  dialogs: DialogState;
  openDialog: (dialogId: string, data?: any) => void;
  closeDialog: (dialogId: string) => void;
  isDialogOpen: (dialogId: string) => boolean;
  getDialogData: (dialogId: string) => any;
};

export const DialogContext = createContext({
  dialogs: {},
  openDialog: () => {},
  closeDialog: () => {},
  isDialogOpen: () => false,
  getDialogData: () => {},
} as DialogContextType);

export default function DialogContextProvider({ children }: { children: React.ReactNode }) {
  const { dialogs, openDialog, closeDialog, isDialogOpen, getDialogData } = useMultipleDialogs({});

  return (
    <DialogContext.Provider value={{ dialogs, openDialog, closeDialog, isDialogOpen, getDialogData }}>
      {children}
    </DialogContext.Provider>
  );
}
