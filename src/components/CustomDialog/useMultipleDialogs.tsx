import { useCallback } from "react";
import { useImmer } from "use-immer";
import { DialogState } from "./DialogContext";

const useMultipleDialogs = (defaultState: DialogState = {}) => {
  const [dialogs, setDialogs] = useImmer<DialogState>(defaultState);

  const openDialog = useCallback((dialogId: string, data?: any) => {
    setDialogs((draft) => {
      if (!data) data = draft[dialogId]?.data;
      draft[dialogId] = { isOpen: true, data };
    });
  }, []);

  const closeDialog = useCallback((dialogId: string) => {
    setDialogs((draft) => {
      const prevState = draft[dialogId];
      draft[dialogId] = { ...prevState, isOpen: false };
    });
  }, []);

  const isDialogOpen = useCallback((dialogId: string) => dialogs[dialogId]?.isOpen ?? false, [dialogs]);

  const getDialogData = useCallback((dialogId: string) => dialogs[dialogId]?.data, [dialogs]);

  return {
    dialogs,
    openDialog,
    closeDialog,
    isDialogOpen,
    getDialogData,
  };
};

export default useMultipleDialogs;
