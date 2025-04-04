import { Button } from "@mui/material";

type ButtonProps = {
  label: string;
  onClick: () => void;
  dataTestId?: string;
};

export default function ButtonComponent({
  label,
  onClick,
  dataTestId,
}: ButtonProps) {
  return (
    <Button
      variant="text"
      onClick={onClick}
      color="success"
      data-testid={dataTestId}
    >
      {label}
    </Button>
  );
}
