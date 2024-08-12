import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

import { TextField, TextFieldProps } from "@mui/material";

export type RHFTextFieldProps = TextFieldProps & {
  name: string;
  rules?: RegisterOptions;
  errorMessage?: string;
};

export function RHFTextField({ name, ...props }: RHFTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={props?.rules}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} {...props} error={!!error} helperText={error?.message} />
      )}
    />
  );
}
