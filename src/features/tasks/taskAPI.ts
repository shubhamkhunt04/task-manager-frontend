import api from "../../utils/api";

export const fetchTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTask = async (taskData: {
  title: string;
  description: string;
  status: string;
}) => {
  const response = await api.post("/tasks", {
    ...taskData,
    status: taskData.status.toUpperCase(),
  });
  return response.data;
};

export const updateTask = async (
  id: string,
  taskData: { title?: string; description?: string; status?: string }
) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
