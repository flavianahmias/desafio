import RobotSvg from "../../assets/robot.svg";

import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../components/input";
import ButtonComponent from "../../components/button";
import { useState } from "react";
import SnackbarComponent from "../../components/snackbar";
import { createUser } from "../../services/user-api.service";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [snackbar, setSnackbar] = useState({
    status: false,
    message: "",
    type: "",
  });

  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  const handleRegisterUser = async () => {
    try {
      if (password === confirmPassword) {
        await createUser({ username, password });
        routeChange(`/login`);
      } else {
        setSnackbar({
          status: true,
          type: "error",
          message: "Senhas diferentes!",
        });
      }
    } catch (error) {
      if (error) {
        setSnackbar({
          status: true,
          type: "error",
          message: "Usuário já existe.",
        });
      }
    }
  };

  return (
    <section className={styles.container}>
      <img src={RobotSvg} alt="Robot" className={styles.logo} />
      <SnackbarComponent props={snackbar} />
      <div className={styles.register}>
        <h1 className={styles.pageTitle} data-testid="register">
          Registrar
        </h1>
        <InputComponent
          label="Usuário"
          value={username}
          dataTestId="username"
          onChange={(e) => setUsername(e)}
        />
        <InputComponent
          label="Senha"
          dataTestId="password"
          password={true}
          value={password}
          onChange={(e) => setPassword(e)}
        />
        <InputComponent
          label="Confirmar senha"
          dataTestId="confirm-password"
          password={true}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e)}
        />
        <ButtonComponent
          label={"Registrar"}
          dataTestId="register-button"
          onClick={handleRegisterUser}
        />

        <ButtonComponent
          label={"Voltar"}
          onClick={() => routeChange(`/login`)}
        />
      </div>
    </section>
  );
};
