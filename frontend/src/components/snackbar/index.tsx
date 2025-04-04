import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

interface SnackProps {
  props: {
    status: boolean;
    type: string;
    message: string;
  };
}

export default function SnackbarComponent({ props }: SnackProps) {
  const vertical = "top";
  const horizontal = "center";

  return (
    <Snackbar
      open={props.status}
      key={vertical + horizontal}
      autoHideDuration={6000}
      message=""
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        severity={props.type === "error" ? "error" : "success"}
        variant="outlined"
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}
