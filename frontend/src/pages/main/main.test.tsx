import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TableComponent } from "../../components/table";

describe("Main", () => {
  test("Testa renderização da tabela", async () => {
    render(
      <BrowserRouter>
        <TableComponent
          data={[
            { id: 1, title: "Estudar", description: "De tarde", status: 1 },
          ]}
          onDelete={function (): void {}}
          onOpenModal={function (): void {}}
          totalCount={0}
          page={0}
          pageSize={0}
          onChangePage={function (): void {}}
          onChangePageSize={function (): void {}}
          onCompleteTask={function (): void {}}
        />
      </BrowserRouter>
    );

    expect(screen.getAllByTestId("table-row").length).toBe(1);
    expect(screen.getAllByTestId("table-row")[0]).toHaveTextContent("Estudar");
  });

  test("Testa se abre modal", async () => {
    const handleClick = vi.fn();

    render(
      <BrowserRouter>
        <TableComponent
          data={[
            { id: 1, title: "Estudar", description: "De tarde", status: 0 },
          ]}
          onDelete={function (): void {}}
          onOpenModal={handleClick}
          totalCount={0}
          page={0}
          pageSize={0}
          onChangePage={function (): void {}}
          onChangePageSize={function (): void {}}
          onCompleteTask={function (): void {}}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId("edit-button"));

    await waitFor(() => expect(handleClick).toHaveBeenCalledOnce());
  });

  test("Testa renderização da tabela", async () => {
    render(
      <BrowserRouter>
        <TableComponent
          data={[
            { id: 1, title: "Estudar", description: "De tarde", status: 1 },
          ]}
          onDelete={function (): void {}}
          onOpenModal={function (): void {}}
          totalCount={0}
          page={0}
          pageSize={0}
          onChangePage={function (): void {}}
          onChangePageSize={function (): void {}}
          onCompleteTask={function (): void {}}
        />
      </BrowserRouter>
    );

    expect(screen.getAllByTestId("table-row").length).toBe(1);
    expect(screen.getAllByTestId("table-row")[0]).toHaveTextContent("Estudar");
  });

  test("Testa click onPageChange", async () => {
    const handleClick = vi.fn();

    render(
      <BrowserRouter>
        <TableComponent
          data={[
            { id: 1, title: "Estudar", description: "De tarde", status: 1 },
          ]}
          onDelete={function (): void {}}
          onOpenModal={function (): void {}}
          totalCount={0}
          page={0}
          pageSize={0}
          onChangePage={handleClick}
          onChangePageSize={function (): void {}}
          onCompleteTask={function (): void {}}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId("next-page"));

    expect(handleClick).toHaveBeenCalledOnce();
  });
});
