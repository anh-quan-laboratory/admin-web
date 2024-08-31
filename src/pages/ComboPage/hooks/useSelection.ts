import { useState, useCallback } from "react";

interface UseSelectionProps<T> {
  initialSelectedItems?: T[];
  getItemId: (item: T) => string;
  onSelectionChange?: (selectedItems: T[]) => void;
}

export function useSelection<T>({ initialSelectedItems = [], getItemId, onSelectionChange }: UseSelectionProps<T>) {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialSelectedItems);

  const updateSelectedItems = (updatedItems: T[]) => {
    setSelectedItems(updatedItems);
    onSelectionChange && onSelectionChange(updatedItems);
  };

  const addItem = (item: T) => {
    const updatedItems = [...selectedItems, item];
    updateSelectedItems(updatedItems);
  };

  const removeItem = (itemId: string) => {
    const updatedItems = selectedItems.filter((item) => getItemId(item) !== itemId);
    updateSelectedItems(updatedItems);
  };

  const toggleItem = useCallback(
    (item: T) => {
      const itemId = getItemId(item);
      const isItemSelected = selectedItems.some((selectedItem) => getItemId(selectedItem) === itemId);

      if (isItemSelected) {
        removeItem(itemId);
      } else {
        addItem(item);
      }
    },
    [selectedItems]
  );

  return {
    selectedItems,
    addItem,
    removeItem,
    toggleItem,
  };
}
