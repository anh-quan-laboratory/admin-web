import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from "@mui/material";

type RHFToggleButtonGroupProps = ToggleButtonGroupProps & {
  name: Path<FieldValues>;
  options?: { id: string; label: string }[];
};

export function RHFToggleButtonGroup({ name, options, ...props }: RHFToggleButtonGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      {...props}
      render={({ field: { onChange, value, ...restField } }) => (
        <ToggleButtonGroup value={value} {...restField}>
          {options?.map((option) => (
            <ToggleButton onClick={() => onChange(option.id)} value={option.id} key={option.id}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    ></Controller>
  );
}
