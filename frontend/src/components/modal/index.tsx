import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Task } from "../../pages/main";
import InputComponent from "../input";
import ButtonComponent from "../button";
import styles from "./modal.module.css";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  onSave: (task: Task) => void;
  task?: Task | null;
  type: "update" | "create";
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalComponent({
  open,
  handleClose,
  onSave,
  type,
  task,
}: ModalProps) {
  const [data, setData] = React.useState<Task>({
    id: 0,
    title: "",
    status: 0,
    description: "",
  });

  React.useEffect(() => {
    setData(
      task ? { ...task } : { description: "", id: 0, title: "", status: 0 }
    );
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose} role="dialog">
      <Box sx={style}>
        <Typography variant="h6" component="h2" data-testid="title-modal">
          {type === "update" ? "Editar" : "Adicionar nova"} Tarefa
        </Typography>

        <InputComponent
          label={"Título"}
          value={data?.title}
          onChange={(e) => setData({ ...data, title: e })}
        />

        <InputComponent
          label={"Descrição"}
          value={data?.description}
          multiline
          rows={3}
          onChange={(e) => setData({ ...data, description: e })}
        />

        <div className={styles.buttonsBox}>
          <ButtonComponent label={"Cancelar"} onClick={handleClose} />
          <ButtonComponent label={"Salvar"} onClick={() => onSave(data)} />
        </div>
      </Box>
    </Modal>
  );
}
