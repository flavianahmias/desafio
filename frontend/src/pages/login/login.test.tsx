import { Login } from ".";
import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { login } from "../../services/user-api.service";

vi.mock("../../services/user-api.service", () => ({
  login: vi.fn(() => Promise.resolve({ accessToken: "fake-token" })),
  getAllTasks: vi.fn(() =>
    Promise.resolve([
      {
        id: 1,
        title: "Lavar a louça",
        description: "Tem que ser de manhã",
        status: "1",
      },
    ])
  ),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(() => mockNavigate),
  };
});

describe("Login", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("Exibe o titulo 'Login' na página", async () => {
    expect(screen.getByTestId("login")).toHaveTextContent("Login");
  });

  test("Ao clicar em registrar, redireciona a rota para '/register'", async () => {
    const button = screen.getByTestId("register-button");
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  test("Ao inserir os dados e entrar no sistema, redireciona para a página principal", async () => {
    const userNameInput = screen.getByLabelText("Usuário");
    const passwordInput = screen.getByLabelText("Senha");
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    await userEvent.type(userNameInput, "maria.jose");
    await userEvent.type(passwordInput, "maria123");

    const loginButton = screen.getByTestId("login-button");
    await userEvent.click(loginButton);

    expect(login).toHaveBeenCalledWith({
      username: "maria.jose",
      password: "maria123",
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dash");
    });
  });
});
