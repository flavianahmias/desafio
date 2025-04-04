import RobotSvg from "../../assets/robot.svg";
import styles from "./login.module.css";
import InputComponent from "../../components/input";
import { useState } from "react";
import ButtonComponent from "../../components/button";
import { login } from "../../services/user-api.service";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  const handleLogin = async () => {
    try {
      if (username && password) {
        const result = await login({ username, password });
        localStorage.setItem("token", result.accessToken);

        routeChange(`/dash`);
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <section className={styles.container}>
      <img src={RobotSvg} alt="Robot" className={styles.logo} />
      <div className={styles.login}>
        <h1 className={styles.pageTitle} data-testid="login">
          Login
        </h1>
        <InputComponent
          label="Usuário"
          value={username}
          onChange={(e) => setUsername(e)}
        />

        <InputComponent
          label="Senha"
          password={true}
          value={password}
          onChange={(e) => setPassword(e)}
        />
        <ButtonComponent
          dataTestId="login-button"
          label={"Entrar"}
          onClick={handleLogin}
          data-testid="login-button"
        />
        <ButtonComponent
          dataTestId="register-button"
          label={"Registrar"}
          onClick={() => routeChange(`/register`)}
        />
      </div>
    </section>
  );
};
