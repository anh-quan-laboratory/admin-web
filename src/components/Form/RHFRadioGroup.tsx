import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, RadioGroupProps } from "@mui/material";

type Option = { id: string; label: string };

type RHFRadioGroupProps = RadioGroupProps & {
  name: Path<FieldValues>;
  options: Option[];
  label: string;
};

export function RHFRadioGroup({ name, options, label, ...props }: RHFRadioGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormControl>
          <FormLabel>{label}</FormLabel>
          <RadioGroup value={value ?? props.defaultValue} onChange={onChange} {...props}>
            {options?.map((option) => (
              <FormControlLabel value={option.id} control={<Radio />} label={option.label} key={option.id} />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    ></Controller>
  );
}
