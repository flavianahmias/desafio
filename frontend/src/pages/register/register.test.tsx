import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Register } from ".";

vi.mock("../../services/user-api.service", () => ({
  createUser: vi.fn(() => Promise.resolve({ username: "maria.jose", id: 1 })),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(() => mockNavigate),
  };
});

describe("Register", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("Exibe o titulo 'Registrar' na página", async () => {
    expect(screen.getByTestId("register")).toHaveTextContent("Registrar");
  });

  test("Ao clicar em 'Registrar', redireciona a rota para '/login'", async () => {
    const button = screen.getByTestId("register-button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
