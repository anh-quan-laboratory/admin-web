import { useCallback } from "react";
import { useImmer } from "use-immer";

type DialogState = {
  [key: string]: {
    isOpen: boolean;
    data?: any;
  };
};

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
      draft[dialogId] = { isOpen: false, data: undefined };
    });
  }, []);

  return {
    dialogs,
    openDialog,
    closeDialog,
  };
};

export default useMultipleDialogs;
