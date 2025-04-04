import { TextField } from "@mui/material";

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  password?: boolean;
  rows?: number;
  dataTestId?: string;
};

export default function InputComponent({
  label,
  value,
  onChange,
  multiline,
  password,
  rows,
  dataTestId,
}: InputProps) {
  return (
    <TextField
      data-testid={dataTestId}
      type={(password && "password") || ""}
      fullWidth
      margin="normal"
      label={label}
      multiline={multiline}
      rows={rows}
      value={value || ""}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
