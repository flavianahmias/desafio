import styles from "./main.module.css";
import RobotSvg from "../../assets/robot.svg";

import { TableComponent } from "../../components/table";

import { useEffect, useState } from "react";
import {
  completeTask,
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../../services/task-api.service";

import ModalComponent from "../../components/modal";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: number;
};
export const Main = () => {
  const [data, setData] = useState<Task[]>([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleUpdateOpenModal = (task: Task) => {
    setSelectedTask(task);
    setUpdateModalOpen(true);
  };

  const handleCreateOpenModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setUpdateModalOpen(false);
    setSelectedTask(null);
    setCreateModalOpen(false);
  };

  const fetchData = async (filters: { page: number; pageSize: number }) => {
    try {
      const result = await getAllTasks(filters);
      setData(result.data);
      setTotalCount(result.total);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  useEffect(() => {
    const filters = { page, pageSize };
    fetchData(filters);
  }, []);

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      fetchData({ page, pageSize });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveTask = async (updatedTask: Task) => {
    try {
      await updateTask(updatedTask);
      fetchData({ page, pageSize });
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
  };

  const openAddTaskModal = async (task: Task) => {
    try {
      const result = await createTask(task);
      fetchData({ page, pageSize });
    } catch (error) {
      console.log(error);
    }
    handleCloseModal();
  };

  const handleChangeTablePage = async (newPage: number) => {
    try {
      setPage(newPage);
      const result = await getAllTasks({ pageSize: pageSize, page: newPage });
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageSizeChange = async (newSize: number) => {
    try {
      setPageSize(newSize);
      const result = await getAllTasks({ pageSize: newSize, page: 1 });
      setData(result.data);
      setPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    try {
      await completeTask(taskId);
      fetchData({ page, pageSize });
    } catch (error) {
      console.log(error);
    }
  };
  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  const logout = () => {
    localStorage.removeItem("token");
    routeChange(`/login`);
  };

  return (
    <>
      <div className={styles.bar}>
        <img src={RobotSvg} alt="Robot" />
        <IconButton onClick={() => logout()} className={styles.logout}>
          <LogoutIcon /> Sair
        </IconButton>
      </div>
      <div className={styles.content}>
        <section className={styles.addButon}>
          <IconButton aria-label="edit" onClick={() => handleCreateOpenModal()}>
            <AddIcon /> Adicionar
          </IconButton>
        </section>
        <section className={styles.table}>
          <TableComponent
            data={data}
            totalCount={totalCount}
            onOpenModal={handleUpdateOpenModal}
            onDelete={handleDeleteTask}
            onChangePage={handleChangeTablePage}
            onChangePageSize={handlePageSizeChange}
            page={page}
            pageSize={pageSize}
            onCompleteTask={handleCompleteTask}
          />
          <ModalComponent
            type="update"
            open={updateModalOpen}
            handleClose={handleCloseModal}
            task={selectedTask}
            onSave={handleSaveTask}
          />
        </section>
      </div>
      <ModalComponent
        type="create"
        open={createModalOpen}
        handleClose={handleCloseModal}
        onSave={openAddTaskModal}
      />
    </>
  );
};
