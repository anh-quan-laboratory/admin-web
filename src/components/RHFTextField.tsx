import { Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";

import { TextField, TextFieldProps } from "@mui/material";

export type RHFTextFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
} & TextFieldProps;

export function RHFTextField<T extends FieldValues>({ name, ...props }: RHFTextFieldProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} {...props} error={!!error} helperText={error?.message} />
      )}
    />
  );
}
